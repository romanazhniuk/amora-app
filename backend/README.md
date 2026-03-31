# Amora backend (Django + DRF)

## Quickstart

1. Create and activate virtualenv
2. Install deps: `pip install -r requirements.txt`
3. Copy envs: `cp .env.example .env`
4. Run migrations: `python manage.py migrate`
5. Start server: `python manage.py runserver`

## Auth endpoints

- `POST /api/auth/token/`
- `POST /api/auth/token/refresh/`
- `GET /api/auth/me/`
