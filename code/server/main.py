from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(
    title="Пример API",
    description="Простое API на FastAPI",
    version="1.0.0"
)


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None


@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}

