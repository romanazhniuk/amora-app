#!/usr/bin/env bash
# Run migrations on every start so schema matches code (Postgres persists data; SQLite is dev-only).
set -o errexit
python manage.py migrate --noinput
exec gunicorn --bind "0.0.0.0:${PORT}" amora_backend.wsgi:application
