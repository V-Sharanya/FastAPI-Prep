import string
import random

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from database import get_db
from models import URL
from schemas import URLRequest, URLResponse



def generate_short_code(length: int = 6):
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))

app = FastAPI(title="URL Shortener API")

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.post("/shorten", response_model=URLResponse)
def create_short_url(
    url_request: URLRequest,
    db: Session = Depends(get_db)
):
    original_url = str(url_request.original_url)

    existing = db.query(URL).filter(URL.original_url == original_url).first()
    if existing:
        return {
            "original_url": existing.original_url,
            "short_code": existing.short_code,
            "short_url": f"http://localhost:8000/{existing.short_code}",
        }

    short_code = generate_short_code()
    while db.query(URL).filter(URL.short_code == short_code).first():
        short_code = generate_short_code()

    new_url = URL(
        original_url=original_url,
        short_code=short_code
    )

    db.add(new_url)
    db.commit()
    db.refresh(new_url)

    return {
        "original_url": new_url.original_url,
        "short_code": new_url.short_code,
        "short_url": f"http://localhost:8000/{new_url.short_code}",
    }

@app.get("/all", response_model=list[URLResponse])
def get_all_urls(db: Session = Depends(get_db)):
    urls = db.query(URL).all()

    return [
        {
            "original_url": url.original_url,
            "short_code": url.short_code,
            "short_url": f"http://localhost:8000/{url.short_code}",
        }
        for url in urls
    ]

@app.get("/{short_code}")
def redirect_to_original(short_code: str, db: Session = Depends(get_db)):
    url_entry = db.query(URL).filter(URL.short_code == short_code).first()

    if not url_entry:
        raise HTTPException(status_code=404, detail="Short URL not found")

    return RedirectResponse(url=url_entry.original_url)

@app.delete("/{short_code}")
def delete_short_url(short_code: str, db: Session = Depends(get_db)):
    url_entry = db.query(URL).filter(URL.short_code == short_code).first()

    if not url_entry:
        raise HTTPException(status_code=404, detail="URL not found")

    db.delete(url_entry)
    db.commit()

    return {"detail": "URL deleted successfully"}
