from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("sqlite:///./todo.db")
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine)
Base = declarative_base()