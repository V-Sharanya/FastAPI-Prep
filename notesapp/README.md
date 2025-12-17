STEP 1 - Understand what we are we building (Clear Goal)
A Notes Application where:
- Users can create notes
- View all notes
- View a single note
- Update a note
- Delete a note

Tech stack:
Backend: FastAPI
Schema / Validation: Pydantic
Database: SQLite
ORM: SQLAlchemy
Frontend: Simple HTML + JavaScript (Fetch API)

Step 2 - Our Project Structure
notes_app/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│
├── requirements.txt

Step 3- Virtual Environment Steup
- Firstly: Create virtual environment
    python -m venv .venv
  Activate it:
    .venv\Scripts\activate
- Then: Install dependencies
    pip install fastapi uvicorn sqlalchemy pydantic
- Lastly: Create clean requirement.txt
    pip freeze > requirements.txt

Step 4 - Write code and logic
