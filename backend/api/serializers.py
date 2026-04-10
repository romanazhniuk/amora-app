from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Accept JWT login with `username`, `email`, or a single `username` value that looks like an email."""

    email = serializers.EmailField(required=False, allow_blank=True)

    def validate(self, attrs):
        body_email = (attrs.pop('email', None) or '').strip()
        raw = (attrs.get('username') or '').strip()
        if body_email:
            raw = body_email

        if not raw:
            raise serializers.ValidationError(
                {'username': 'Username or email is required.'},
            )

        if '@' in raw:
            user = User.objects.filter(email__iexact=raw).first()
            if user is None:
                raise serializers.ValidationError(
                    {'detail': 'No active account found with the given credentials.'},
                )
            attrs['username'] = user.get_username()
        else:
            attrs['username'] = raw

        return super().validate(attrs)
