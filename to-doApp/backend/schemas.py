from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TodoItemCreate(BaseModel):
    title: str = Field(..., example="Buy groceries")
    completed: bool = Field(default=False)
    due_date: Optional[datetime] = None
    priority: int = Field(default=1)


class TodoItem(TodoItemCreate):
    id: int
    created_at: datetime
    is_deleted: bool

    class Config:
        from_attributes = True
