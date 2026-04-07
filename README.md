# amora-app
A personalized mental health support platform providing advice, breathing exercises, curated books and music, and a map of psychological help centers.

## Deploy on Render

This repository is prepared for Render using `render.yaml`:

- `amora-backend` (Django web service)
- `amora-frontend` (static site)

**PostgreSQL:** Render allows **only one active free Postgres database per account**. This Blueprint does **not** create a database so you avoid the error *“cannot have more than one active free tier database”*. Use either:

- **Reuse** an existing free Postgres: copy **Internal Database URL** from the Render dashboard and set it as `DATABASE_URL` when the Blueprint asks (or later under **Environment**), or  
- **Delete** an unused free Postgres in the dashboard, then you may create a new DB manually and paste its URL into `DATABASE_URL`.

### 1) Push latest code

```bash
git add .
git commit -m "chore: prepare Render deployment"
git push origin backend
```

### 2) Create services from Blueprint

1. Open [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repo and select this repository/branch.
4. Render will detect `render.yaml` and propose the **backend** and **frontend** services.
5. When prompted, set **`DATABASE_URL`** to your Postgres **Internal Database URL** (and **`VITE_API_URL`** to your backend `https://…onrender.com` origin).
6. Click **Apply**.

### 3) Set real production URLs and database

After first creation, update values in **amora-backend**:

- `DATABASE_URL` -> **Internal Database URL** from your Render Postgres (required for migrations on deploy)

- `ALLOWED_HOSTS` -> your backend hostname(s), comma-separated
- `CORS_ALLOWED_ORIGINS` -> your frontend Render URL
- `CSRF_TRUSTED_ORIGINS` -> backend + frontend HTTPS URLs

In **amora-frontend**:

- `VITE_API_URL` -> your backend URL (example: `https://amora-backend.onrender.com`)

### 4) Redeploy

- Trigger manual redeploy for both frontend and backend after env vars are set.
- Verify:
  - `https://<backend-domain>/api/health/`
  - frontend loads and API status check succeeds

### Notes

- Django uses PostgreSQL automatically when `DATABASE_URL` is present.
- In production (`DEBUG=False`), CORS is restricted by `CORS_ALLOWED_ORIGINS`.
- Static files are served by WhiteNoise.
