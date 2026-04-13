from django.core.management.base import BaseCommand
from django.db import connection, transaction


class Command(BaseCommand):
    help = (
        "Repair inconsistent migration history when auth tables are missing but "
        "django_migrations already contains auth/api records."
    )

    _APPS_TO_REWIND = ("contenttypes", "auth", "admin", "sessions", "api")
    _REQUIRED_TABLES = ("auth_user", "auth_group", "auth_permission", "django_content_type")

    def handle(self, *args, **options):
        tables = set(connection.introspection.table_names())
        if "django_migrations" not in tables:
            self.stdout.write(self.style.WARNING("No django_migrations table; skipping repair."))
            return

        missing = [t for t in self._REQUIRED_TABLES if t not in tables]
        if not missing:
            self.stdout.write(self.style.SUCCESS("Migration state looks healthy; no repair needed."))
            return

        self.stdout.write(
            self.style.WARNING(
                "Detected missing auth/contenttypes tables while migration history exists. "
                "Rewinding core migration records."
            ),
        )

        with transaction.atomic():
            with connection.cursor() as cursor:
                # Remove migration history for apps that depend on auth/contenttypes.
                for app in self._APPS_TO_REWIND:
                    cursor.execute("DELETE FROM django_migrations WHERE app = %s", [app])

                # Drop API profile table if it exists to avoid partial-schema conflicts.
                if "api_userprofile" in tables:
                    cursor.execute(f"DROP TABLE IF EXISTS {connection.ops.quote_name('api_userprofile')}")

        self.stdout.write(
            self.style.SUCCESS(
                "Repair complete. Run `python manage.py migrate --noinput` to recreate schema cleanly.",
            ),
        )
