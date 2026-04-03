from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    """Public endpoint so the SPA can verify Django is reachable (dev proxy or CORS)."""

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'status': 'ok'})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        })
