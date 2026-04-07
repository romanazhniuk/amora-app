from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class HealthView(APIView):
    """Public endpoint so the SPA can verify Django is reachable (dev proxy or CORS)."""

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'status': 'ok'})


class RootView(APIView):
    """Landing for `/` so browsers and uptime checks are not a generic 404."""

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            'service': 'amora-backend',
            'docs': 'Use /api/… endpoints (no HTML at /).',
            'health': '/api/health/',
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        })


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = (request.data.get('username') or '').strip()
        password = request.data.get('password') or ''
        email = (request.data.get('email') or '').strip()

        if not username:
            raise ValidationError({'username': ['This field is required.']})
        if not password:
            raise ValidationError({'password': ['This field is required.']})
        if len(password) < 8:
            raise ValidationError({'password': ['Password must be at least 8 characters long.']})
        if User.objects.filter(username=username).exists():
            raise ValidationError({'username': ['A user with that username already exists.']})

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
        )
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )
