from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models
import crud, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)
def get_db():   
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Todo List API is running"}

@app.post("/todo_items/", response_model=schemas.TodoItem)
def create_todo_item(todo_item: schemas.TodoItemCreate, db: Session = Depends(get_db)):
    return crud.create_todo_item(db=db, todo_item=todo_item)

@app.get("/todo_items/{item_id}", response_model=schemas.TodoItem)
def read_todo_item(item_id: int, db: Session = Depends(get_db)):
    db_todo_item = crud.get_todo_item(db, item_id=item_id)
    if db_todo_item is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return db_todo_item

@app.get("/todo_items/", response_model=list[schemas.TodoItem])
def read_todo_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todo_items = crud.get_todo_items(db, skip=skip, limit=limit)
    return todo_items

@app.delete("/todo_items/{item_id}")
def delete_todo_item(item_id: int, db: Session = Depends(get_db)):
    crud.delete_todo_item(db, item_id=item_id)
    return {"detail": "Todo item deleted"}

@app.put("/todo_items/{item_id}", response_model=schemas.TodoItem)
def update_todo_item(item_id: int, todo_item: schemas.TodoItemCreate, db: Session = Depends(get_db)):
    db_todo_item = crud.update_todo_item(db, item_id=item_id, todo_item=todo_item)
    if db_todo_item is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return db_todo_item

