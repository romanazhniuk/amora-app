from django.conf import settings
from django.db import migrations, models


def forwards(apps, schema_editor):
    User = apps.get_model(*settings.AUTH_USER_MODEL.split('.'))
    UserProfile = apps.get_model('api', 'UserProfile')

    for user in User.objects.all().iterator():
        profile, _ = UserProfile.objects.get_or_create(user=user)
        uname = (user.username or '').strip()
        if '@' not in uname and uname and not profile.full_name:
            profile.full_name = uname[:255]
            profile.save(update_fields=['full_name'])

        email = (user.email or '').strip().lower()[:150]
        if not email:
            continue
        candidate = email
        if User.objects.filter(username=candidate).exclude(pk=user.pk).exists():
            n = 1
            while True:
                suffix = f'+{n}'
                candidate = f'{email[: 150 - len(suffix)]}{suffix}'
                if not User.objects.filter(username=candidate).exclude(pk=user.pk).exists():
                    break
                n += 1
        if user.username != candidate:
            user.username = candidate
            user.save(update_fields=['username'])


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_backfill_user_profiles'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='full_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.RunPython(forwards, migrations.RunPython.noop),
    ]
