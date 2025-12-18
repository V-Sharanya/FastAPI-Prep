from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Date, DATETIME
from database import Base

class TodoItem(Base):
    __tablename__ = "todo_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
    due_date = Column(Date, nullable=True)
    priority = Column(Integer, default=1)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DATETIME, default=datetime.utcnow)