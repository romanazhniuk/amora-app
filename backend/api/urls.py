from django.urls import path

from .views import (
    HealthView,
    MeView,
    PublicTokenObtainPairView,
    PublicTokenRefreshView,
    RegisterView,
)

urlpatterns = [
    path('health/', HealthView.as_view(), name='health'),
    path('health', HealthView.as_view(), name='health_noslash'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    # No trailing slash: avoids 301 on POST/OPTIONS so CORS preflight still sees ACAO headers.
    path('auth/register', RegisterView.as_view(), name='register_noslash'),
    # Alias for frontend expecting /auth/login/ (same as SimpleJWT token obtain).
    path('auth/login/', PublicTokenObtainPairView.as_view(), name='token_login'),
    path('auth/login', PublicTokenObtainPairView.as_view(), name='token_login_noslash'),
    path('auth/token/', PublicTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token', PublicTokenObtainPairView.as_view(), name='token_obtain_pair_noslash'),
    path('auth/token/refresh/', PublicTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/refresh', PublicTokenRefreshView.as_view(), name='token_refresh_noslash'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('auth/me', MeView.as_view(), name='me_noslash'),
]
