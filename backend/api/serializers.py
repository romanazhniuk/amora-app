from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class EmailAwareTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Accept either `username`+`password` (legacy) or `email`+`password` for JWT."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'] = serializers.EmailField(required=False, allow_blank=True)

    def validate(self, attrs):
        email = (self.initial_data.get('email') or '').strip()
        if email:
            user = get_user_model().objects.filter(email__iexact=email).first()
            # Use a non-existing username so authenticate() fails like a wrong password (same error text).
            attrs['username'] = user.username if user else '__no_such_user__'
        elif not (attrs.get('username') or self.initial_data.get('username')):
            raise serializers.ValidationError(
                {'email': ['This field is required when username is not provided.']},
            )
        return super().validate(attrs)
