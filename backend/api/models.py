from django.conf import settings
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
    )
    birth_date = models.DateField(null=True, blank=True)
    full_name = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=64, blank=True)
    hobbies = models.TextField(blank=True)

    def __str__(self) -> str:
        return f'Profile({self.user_id})'
