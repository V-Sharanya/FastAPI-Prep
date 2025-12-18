from sqlalchemy.orm import Session
from models import TodoItem
from schemas import TodoItemCreate

def create_todo_item(db: Session, todo_item: TodoItemCreate) -> TodoItem:
    db_todo_item = TodoItem(
        title=todo_item.title,
        completed=todo_item.completed,
        due_date=todo_item.due_date,
        priority=todo_item.priority
    )
    db.add(db_todo_item)
    db.commit()
    db.refresh(db_todo_item)
    return db_todo_item


def get_todo_item(db: Session, item_id: int) -> TodoItem | None:
    return db.query(TodoItem).filter(TodoItem.id == item_id).first()

def get_todo_items(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(TodoItem)
        .filter(TodoItem.is_deleted == False)
        .offset(skip)
        .limit(limit)
        .all()
    )


def delete_todo_item(db: Session, item_id: int) -> None:
    db_todo_item = db.query(TodoItem).filter(TodoItem.id == item_id).first()
    if db_todo_item:
        db_todo_item.is_deleted = True
        db.commit()

def update_todo_item(db: Session, item_id: int, todo_item: TodoItemCreate) -> TodoItem | None:
    db_todo_item = db.query(TodoItem).filter(TodoItem.id == item_id).first()
    if not db_todo_item:
        return None

    db_todo_item.title = todo_item.title
    db_todo_item.completed = todo_item.completed
    db_todo_item.due_date = todo_item.due_date
    db_todo_item.priority = todo_item.priority

    db.commit()
    db.refresh(db_todo_item)
    return db_todo_item
