To-Do List API — Project Blueprint
1. Project Goal 
Build a RESTful To-Do API where a user can:
- Add a task
- Mark task as completed / not completed
- Delete a task (soft delete)
- (Extension) Add due date
- (Extension) Add priority

2. Tech Stack 
Use exactly this stack:
Backend - FastAPI – API framework
Pydantic v2 – data validation
SQLAlchemy – ORM
SQLite – database (local)
Uvicorn – ASGI server
Frontend - HTML + Vanilla JavaScript

3. Folder Structure 
Create a new folder inside fastapiprep:
fastapiprep/
│
├── todo-app/
│   ├── backend/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │
│   ├── frontend/
│   │   ├── index.html
│   │   ├── script.js
│   │
│   ├── requirements.txt
│   ├── .gitignore
│   └── README.md

