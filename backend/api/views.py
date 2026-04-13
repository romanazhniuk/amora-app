import json

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import DatabaseError, IntegrityError, transaction
from django.db.utils import ProgrammingError
from django.utils.dateparse import parse_date, parse_datetime
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import UserProfile
from .serializers import EmailOnlyTokenObtainPairSerializer


def _drf_validation_from_django_password_error(exc: DjangoValidationError) -> ValidationError:
    """DRF JSON must get plain str messages (lazy proxies can break rendering)."""
    msgs: list[str] = []
    if getattr(exc, 'error_list', None):
        msgs = [str(e) for e in exc.error_list]
    elif getattr(exc, 'messages', None) is not None:
        msgs = [str(m) for m in exc.messages]
    if not msgs:
        msgs = [str(exc)]
    return ValidationError({'password': msgs})


def _db_unavailable_response():
    return Response(
        {
            'detail': (
                'Database is unavailable or schema is not migrated. '
                'On the server run: python manage.py migrate'
            ),
        },
        status=status.HTTP_503_SERVICE_UNAVAILABLE,
    )


def _username_from_email(email: str) -> str:
    """Stable Django username for auth; derived from email (unique)."""
    base = email.strip().lower()[:150]
    if not base:
        return ''
    if not User.objects.filter(username=base).exists():
        return base
    n = 1
    while True:
        suffix = f'+{n}'
        candidate = f'{base[: 150 - len(suffix)]}{suffix}'
        if not User.objects.filter(username=candidate).exists():
            return candidate
        n += 1


class PublicTokenObtainPairView(TokenObtainPairView):
    """Obtain JWT; ignore invalid Bearer on this route (global axios interceptor)."""

    authentication_classes = []
    serializer_class = EmailOnlyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except (ProgrammingError, DatabaseError):
            return _db_unavailable_response()


class PublicTokenRefreshView(TokenRefreshView):
    authentication_classes = []


class HealthView(APIView):
    """Public endpoint so the SPA can verify Django is reachable (dev proxy or CORS)."""

    # Skip JWT parsing: a stale/invalid Bearer token would fail before AllowAny is checked.
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'status': 'ok'})


class RootView(APIView):
    """Landing for `/` so browsers and uptime checks are not a generic 404."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            'service': 'amora-backend',
            'docs': 'Use /api/… endpoints (no HTML at /).',
            'health': '/api/health/',
            'login': '/api/auth/login/',
            'login_jwt': '/api/auth/token/',
            'register': '/api/auth/register/',
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            u = request.user
            profile, _ = UserProfile.objects.get_or_create(user=u)
            return Response(
                {
                    'id': u.id,
                    'username': u.username,
                    'email': u.email,
                    'fullName': profile.full_name or '',
                    'lastName': u.last_name or '',
                    'birthDate': profile.birth_date.isoformat() if profile.birth_date else None,
                    'gender': profile.gender or '',
                    'hobbies': profile.hobbies or '',
                },
            )
        except (ProgrammingError, DatabaseError):
            return _db_unavailable_response()


class RegisterView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    @staticmethod
    def _parse_birth_date(raw):
        if raw in (None, ''):
            return None
        if isinstance(raw, str):
            d = parse_date(raw[:10] if len(raw) >= 10 else raw)
            if d:
                return d
            dt = parse_datetime(raw)
            if dt:
                return dt.date()
        return None

    @staticmethod
    def _hobbies_to_text(raw):
        if raw in (None, ''):
            return ''
        if isinstance(raw, list):
            return json.dumps(raw, ensure_ascii=False)
        return str(raw)

    def post(self, request):
        try:
            password = request.data.get('password') or ''
            email = (request.data.get('email') or '').strip()
            raw_username = (request.data.get('username') or '').strip()

            if not email:
                raise ValidationError({'email': ['This field is required.']})

            if not password:
                raise ValidationError({'password': ['This field is required.']})
            if len(password) < 8:
                raise ValidationError({'password': ['Password must be at least 8 characters long.']})

            if User.objects.filter(email__iexact=email).exists():
                raise ValidationError(
                    {'detail': 'A user with this email is already registered.'},
                )

            full_name = (request.data.get('fullName') or request.data.get('full_name') or '').strip()[:255]
            first_name_in = (request.data.get('firstName') or request.data.get('firstname') or '').strip()[:150]
            last_name = (
                request.data.get('lastName') or request.data.get('lastname') or ''
            ).strip()[:150]
            if not full_name and first_name_in and last_name:
                full_name = f'{first_name_in} {last_name}'.strip()[:255]
            elif not full_name and first_name_in:
                full_name = first_name_in[:255]
            elif not full_name and last_name:
                full_name = last_name[:255]
            elif not full_name and raw_username and '@' not in raw_username:
                full_name = raw_username[:255]
            birth_date = self._parse_birth_date(request.data.get('birthDate'))
            if request.data.get('birthDate') not in (None, '') and birth_date is None:
                raise ValidationError({'birthDate': ['Invalid date. Use YYYY-MM-DD or ISO-8601.']})

            gender = (request.data.get('gender') or '').strip()[:64]
            hobbies = self._hobbies_to_text(request.data.get('hobbies'))[:4000]

            uname = _username_from_email(email)
            if not uname:
                raise ValidationError({'email': ['Invalid email.']})

            provisional = User(
                username=uname,
                email=email,
                last_name=last_name or '',
            )
            try:
                validate_password(password, user=provisional)
            except DjangoValidationError as exc:
                raise _drf_validation_from_django_password_error(exc) from exc

            try:
                with transaction.atomic():
                    user = User.objects.create_user(
                        username=uname,
                        password=password,
                        email=email,
                        last_name=last_name or '',
                    )
                    UserProfile.objects.create(
                        user=user,
                        birth_date=birth_date,
                        full_name=full_name,
                        gender=gender,
                        hobbies=hobbies,
                    )
            except DjangoValidationError as exc:
                raise _drf_validation_from_django_password_error(exc) from exc
            except IntegrityError:
                raise ValidationError(
                    {'detail': 'Registration failed: email is already in use.'},
                ) from None

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'fullName': full_name,
                        'lastName': user.last_name,
                        'birthDate': birth_date.isoformat() if birth_date else None,
                        'gender': gender,
                        'hobbies': hobbies,
                    },
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        except (ProgrammingError, DatabaseError):
            return _db_unavailable_response()
