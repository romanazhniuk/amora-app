from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class EmailOnlyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    JWT login with `email` + `password` only (no `username` field in the API).

    Legacy: if the client still sends `username` containing `@`, it is treated as email.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop(self.username_field, None)
        self.fields['email'] = serializers.EmailField(required=False, write_only=True)

    def validate(self, attrs):
        User = get_user_model()
        email = attrs.pop('email', None)
        if email is not None:
            email = str(email).strip().lower()
        if not email:
            legacy = self.initial_data.get('username')
            if legacy and '@' in str(legacy):
                email = str(legacy).strip().lower()
        if not email:
            raise serializers.ValidationError(
                {'email': ['This field is required.']},
            )

        user = User.objects.filter(email__iexact=email).first()
        attrs[self.username_field] = user.username if user else '__no_such_user__'
        return super().validate(attrs)
