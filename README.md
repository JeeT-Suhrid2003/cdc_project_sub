# CDC Project — Track 1 & 2 (Frontend & Backend)

Submission Requirements:

§  Upload your project to GitHub (make it public) & Share the same via email to:

vasudharini.s@prou.com.au & pavithra.mannar@prou.com.au

§  Include a README.md with:

- Setup steps
- Tech stack used
- Screenshots or short screen recording (attach files or links)
- Any assumptions or bonus features implemented

---

## Project overview

This repository is a small full-stack demo that implements frontend and backend development (Track 1 & 2). It provides a responsive React frontend (Next.js) and RESTful API routes backed by Prisma and a database. The app manages Employees and Tasks and demonstrates CRUD operations with a real database.

## Tech stack

- Frontend: Next.js (React)
- Backend: Next.js API Routes (Node.js)
- ORM: Prisma
- Database (local dev): SQLite (or Postgres in production)

## Setup steps (local)

1. Clone the repo and change to the project directory

```bash
git clone <your-repo-url>
cd <repo-directory>
```

2. Install dependencies

```bash
npm install
```

3. Configure the database

Option A — use Postgres (your current `prisma/.env` targets Postgres):

```bash
# copy prisma/.env to project root so Prisma loads DATABASE_URL
cp prisma/.env .env
# ensure the database exists (example for local postgres)
createdb mydb || true
```

Option B — use SQLite (quick local dev):

Edit `prisma/schema.prisma` datasource to:

```text
datasource db {
	provider = "sqlite"
	url      = "file:./dev.db"
}
```
or set `DATABASE_URL="file:./dev.db"` in a root `.env` file.

4. Generate Prisma client and apply schema

Quick (no migration files):

```bash
npx prisma generate
npx prisma db push
```

Or create migrations (recommended if using Postgres):

```bash
npx prisma migrate dev --name init
```

5. Seed the database

```bash
node prisma/seed.js
```

6. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the frontend. API routes are under `/api/employees` and `/api/tasks`.

## API endpoints

- GET /api/employees
- POST /api/employees { name, email, role }
- GET /api/employees/:id
- PUT /api/employees/:id
- DELETE /api/employees/:id

- GET /api/tasks
- POST /api/tasks { title, description, status, employeeId }
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

Example curl to create an employee:

```bash
curl -X POST http://localhost:3000/api/employees \
	-H "Content-Type: application/json" \
	-d '{"name":"Test User","email":"test@example.com","role":"Developer"}'
```

Example curl to create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
	-H "Content-Type: application/json" \
	-d '{"title":"New Task","description":"Do this","status":"todo","employeeId":1}'
```

## Screenshots / Recording

Include screenshots or a short screen recording demonstrating:

- The frontend listing employees and tasks
- Creating an employee and a task
- API responses (examples)

Place screenshots or a link to a short recording in this repository (e.g., `assets/` or `recordings/`) and reference them here.

Example screenshot (replace with your real image):

![App screenshot](assets/image.png)

To replace the placeholder with your own screenshot, add `assets/your-screenshot.png` (or .jpg/.svg) and update the image path above.

## Assumptions

- This demo uses Prisma so the same schema works with SQLite locally and Postgres in production.
- By default `prisma/.env` points to Postgres at `postgresql://postgres:newpass123@localhost:5432/mydb?schema=public`. Update `DATABASE_URL` for your environment.
- Deleting an employee requires handling or removing related tasks first (referential integrity).

## Bonus features implemented / suggestions

- Input validation and friendly error responses for API endpoints (duplicate email -> 409, invalid employeeId -> 400).
- Seed script (`prisma/seed.js`) to create initial employees and tasks.
- Suggested bonuses to implement: authentication (NextAuth), inline create/edit forms on the frontend, pagination/filtering, unit tests for API routes.

## Evaluation Criteria (for reviewers)

§  Code readability and structure

§  Design and usability (for frontend)

§  API and data model design (for backend)

§  Documentation and presentation

§  Completion of bonus challenges

## Timeline

- Complete and submit within 3 days from assignment date.
- Late submissions may not be evaluated unless pre-approved.
- Do not copy code from public sources – originality will be checked.

## Deploying to Vercel

Notes:
- For persistent production storage use a hosted Postgres (Supabase, Railway, Neon, PlanetScale). Vercel serverless filesystem is ephemeral — do not rely on a local SQLite file for production.
- Set `DATABASE_URL` in Vercel Environment Variables before deploying.
- Run Prisma migrations against the production/Postgres database:

```bash
npx prisma migrate deploy
```

---

If you want, I can now add interactive create/edit/delete forms to the frontend and a small Docker Compose to bring up Postgres for local testing. Reply with which you'd like next.
