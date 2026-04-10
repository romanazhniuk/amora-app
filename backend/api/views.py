import json

from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models import Q
from django.utils.dateparse import parse_date, parse_datetime
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import UserProfile


class PublicTokenObtainPairView(TokenObtainPairView):
    """Obtain JWT; ignore invalid Bearer on this route (global axios interceptor)."""

    authentication_classes = []


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
        u = request.user
        profile, _ = UserProfile.objects.get_or_create(user=u)
        return Response(
            {
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'lastName': u.last_name or '',
                'birthDate': profile.birth_date.isoformat() if profile.birth_date else None,
                'gender': profile.gender or '',
                'hobbies': profile.hobbies or '',
            },
        )


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
        password = request.data.get('password') or ''
        email = (request.data.get('email') or '').strip()
        username = (request.data.get('username') or '').strip()

        # Email is the canonical identifier; username defaults to email so clients need not duplicate.
        if not email:
            raise ValidationError({'email': ['This field is required.']})
        if not username:
            username = email

        if not password:
            raise ValidationError({'password': ['This field is required.']})
        if len(password) < 8:
            raise ValidationError({'password': ['Password must be at least 8 characters long.']})

        if User.objects.filter(Q(username=username) | Q(email__iexact=email)).exists():
            raise ValidationError(
                {'detail': 'A user with this email or username is already registered.'},
            )

        last_name = (request.data.get('lastName') or '').strip()[:150]
        birth_date = self._parse_birth_date(request.data.get('birthDate'))
        if request.data.get('birthDate') not in (None, '') and birth_date is None:
            raise ValidationError({'birthDate': ['Invalid date. Use YYYY-MM-DD or ISO-8601.']})

        gender = (request.data.get('gender') or '').strip()[:64]
        hobbies = self._hobbies_to_text(request.data.get('hobbies'))[:4000]

        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                last_name=last_name or '',
            )
        except IntegrityError:
            raise ValidationError(
                {'detail': 'Registration failed: username or email is already in use.'},
            ) from None

        UserProfile.objects.create(
            user=user,
            birth_date=birth_date,
            gender=gender,
            hobbies=hobbies,
        )
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
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
