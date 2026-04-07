# amora-app
A personalized mental health support platform providing advice, breathing exercises, curated books and music, and a map of psychological help centers.

## Deploy on Render

This repository is now prepared for Render using `render.yaml`:

- `amora-backend` (Django web service)
- `amora-frontend` (static site)
- `amora-db` (PostgreSQL)

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
4. Render will detect `render.yaml` and propose 3 resources.
5. Click **Apply**.

### 3) Set real production URLs in Render env vars

After first creation, update values in **amora-backend**:

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
