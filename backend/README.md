# Amora backend (Django + DRF)

## Quickstart

1. Create and activate virtualenv
2. Install deps: `pip install -r requirements.txt`
3. Copy envs: `cp .env.example .env`
4. Run migrations: `python manage.py migrate`
5. Start server: `python manage.py runserver`

## Auth endpoints

- `POST /api/auth/token/` (body: `email` + `password`, or `username` + `password`)
- `POST /api/auth/token/refresh/`
- `GET /api/auth/me/`

## Production (Render)

- The Blueprint in `render.yaml` provisions **Render Postgres** and wires **`DATABASE_URL`** automatically.
- The API **must** use Postgres on Render: ephemeral disk + SQLite loses users after restarts/deploys (you will see `id` reset to 1).
- Migrations run on **each deploy/start** via `start.sh`.
- If you already use a manually created database, remove the `databases:` block from `render.yaml` and set **`DATABASE_URL`** to that database’s Internal URL in the dashboard.
