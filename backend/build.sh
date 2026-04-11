#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
# Migrations run at container start (start.sh) so the DB is always reachable with DATABASE_URL.
