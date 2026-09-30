# Todo App

A simple Todo web app. You can create, view, edit, delete, complete and search todos.

**Tech stack:** Django + Django REST Framework, PostgreSQL, Next.js (App Router) + Tailwind CSS

```
todo-app/
├── backend/    # Django REST API
└── frontend/   # Next.js app
```

## Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL 15+

## 1. Database

Create an empty database:

```bash
createdb todo_db
```

## 2. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Open `backend/.env` and fill in:

- `SECRET_KEY`: generate one with
  ```bash
  python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```
- `DB_USER` / `DB_PASSWORD`: your PostgreSQL user and password
  (Homebrew on macOS: `DB_USER` is your macOS username and `DB_PASSWORD` is empty)

Then create the tables and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

The API runs at http://localhost:8000/api/todos/

## 3. Frontend

In a new terminal:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

## API

| Method | URL | Description |
|---|---|---|
| GET | `/api/todos/` | List todos |
| GET | `/api/todos/?search=milk` | Search by title or description |
| POST | `/api/todos/` | Create a todo |
| GET | `/api/todos/<id>/` | Get one todo |
| PATCH | `/api/todos/<id>/` | Update some fields |
| PUT | `/api/todos/<id>/` | Replace a todo |
| DELETE | `/api/todos/<id>/` | Delete a todo |

Example todo:

```json
{
  "id": 1,
  "title": "Buy milk",
  "description": "",
  "completed": false,
  "created_at": "2026-09-30T10:00:00Z",
  "updated_at": "2026-09-30T10:00:00Z"
}
```

## Optional

**Admin panel:** create an admin user, then open http://localhost:8000/admin

```bash
python manage.py createsuperuser
```

**Linting and formatting (backend):**

```bash
pip install -r requirements-dev.txt
ruff check .
ruff format .
```
