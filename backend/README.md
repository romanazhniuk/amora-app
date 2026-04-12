# Amora backend (Django + DRF)

## Quickstart

1. Create and activate virtualenv
2. Install deps: `pip install -r requirements.txt`
3. Copy envs: `cp .env.example .env`
4. Run migrations: `python manage.py migrate`
5. Start server: `python manage.py runserver`

## Auth endpoints

- `POST /api/auth/token/` and `POST /api/auth/login/` — body: **`email`** + **`password`** (legacy: `username` may be sent instead of `email` if it looks like an email)
- `POST /api/auth/token/refresh/`
- `GET /api/auth/me/`

## Production (Render)

- The Blueprint in `render.yaml` provisions **Render Postgres** and wires **`DATABASE_URL`** automatically.
- The API **must** use Postgres on Render: ephemeral disk + SQLite loses users after restarts/deploys (you will see `id` reset to 1).
- Migrations run on **each deploy/start** via `start.sh`.
- If you already use a manually created database, remove the `databases:` block from `render.yaml` and set **`DATABASE_URL`** to that database’s Internal URL in the dashboard.

### If deploy fails with `DATABASE_URL is required on Render`

That means **at runtime** the web service has **no** `DATABASE_URL` (build can still succeed because `collectstatic` skips this check).

1. **Render Dashboard** → your **PostgreSQL** instance → **Connect** → copy **Internal Database URL**.
2. **Web service** (`amora-backend`) → **Environment** → add **`DATABASE_URL`** = paste that URL (or use **Link database** if available).
3. **Start Command** must be **`bash start.sh`** (see repo `render.yaml`). If you see only `gunicorn ...` in logs, the dashboard is overriding the Blueprint: open **Settings** → **Start Command** and set `bash start.sh` (with `rootDir` = `backend`, this runs `backend/start.sh`).
4. If Blueprint sync fails with “only one free database”, keep one Postgres, remove the `databases:` block from `render.yaml`, and set `DATABASE_URL` manually as in step 2.

### “We don’t have access to your repo”

Render still clones public repos; that line is a generic notice. If deploys fail to pull, check **Settings → Build & Deploy** connected repository and branch (`backend`).
