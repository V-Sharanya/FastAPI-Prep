from sqlalchemy.orm import Session
from models import Note
from schemas import NoteCreate

def create_note(db: Session, note: NoteCreate):
    db_note = Note(
        title=note.title,
        content=note.content
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_notes(db: Session):
    return db.query(Note).all()

def get_note(db: Session, note_id: int):
    return db.query(Note).filter(Note.id == note_id).first()

def delete_note(db: Session, note_id: int):
    note = get_note(db, note_id)
    if note:
        db.delete(note)
        db.commit()
    return note
