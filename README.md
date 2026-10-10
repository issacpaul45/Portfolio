# Issac Paul — developer portfolio

A full-stack portfolio built with React and Vite, a Django REST API, and PostgreSQL. The initial database migration seeds the experience and project entries from the resume. The contact section links directly to email, GitHub, and LinkedIn.

The supplied resume PDF is available as a download from the site navigation and About section.

## Run locally with Docker

1. Copy `.env.example` to `.env` and change the Django secret and database password for any shared deployment.
2. Start the services:

   ```sh
   docker compose up --build
   ```

3. Open [http://localhost:5173](http://localhost:5173). The API is at [http://localhost:8000/api/portfolio/](http://localhost:8000/api/portfolio/).

The first backend start applies migrations and creates the seeded portfolio content. Django admin is at `/admin/`; create an administrator with `docker compose exec backend python manage.py createsuperuser` to manage content and read submitted messages.

## Run without Docker

Start PostgreSQL and export the variables shown in `.env.example` with `POSTGRES_HOST=localhost`. Then run the API and UI in separate terminals:

```sh
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

```sh
cd frontend
npm install
npm run dev
```

Vite forwards `/api` requests to `http://localhost:8000` by default. Set `VITE_API_PROXY_TARGET` to change the target.

## API

- `GET /api/portfolio/` — profile, projects, experience, and skill groups
- `POST /api/contact/` — optional API endpoint that validates and stores `{ "name", "email", "message" }`; it is not used by the portfolio interface

The interface includes fallback project and experience content so it still renders while the API is unavailable.
