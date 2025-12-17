from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    title: str
    content: str

class NoteResponse(NoteCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
