from hashlib import sha256
import string
import random
#from jose import JWTError, jwt
#from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from databse import database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

db = database("database", "username", "password")
db.connect()
app = FastAPI()


# Конфиг
SECRET_KEY = "your-secret-key"  # На продакшене используйте .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30  # Срок жизни токена


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


def create_salt() -> str:
    uppercase = string.ascii_uppercase
    lowercase = string.ascii_lowercase
    digits = string.digits
    symbols = '!@#$%^&*_+-=,./?;:'

    salt = [
        random.choice(uppercase),
        random.choice(lowercase),
        random.choice(digits),
        random.choice(symbols),
    ]

    all_chars = uppercase + lowercase + digits + symbols
    salt.extend(random.choice(all_chars) for _ in range(4))

    return "".join(salt)


def hash_password(password: str, salt: str) -> str:
    return sha256((password + salt).encode('utf-8')).hexdigest()


# Генерация токена
# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}


# TODO: Проверка сущ юзера
@app.get("/user")
async def user(email: str="none", username: str="none"): 
    print(username)
    return {"message": username}


# TODO: Проверка пароля юзера
@app.post("/login")
async def user(form_data: dict):
    user_exists = db.exists(
            "users",
            f"email = '{form_data['email']}'"
        )
    
    if user_exists:
        data = db.fetch_one(f"SELECT email, password_hash, salt FROM users WHERE email = '{form_data['email']}'")
        print(data)
        print()

        if hash_password(form_data['password'], data[2]) == data[1]:
            return JSONResponse(
                content={"message": "Все супер!"},
                status_code=200,
                headers={"X-Header": "Value"}
                )
    
    return JSONResponse(
        content={"message": "Не получилось("},
        status_code=409,
        headers={"X-Header": "Value"}
        )


@app.post("/add_user")
async def add_user(form_data: dict):
    user_exists = db.exists(
            "users",
            f"email = '{form_data['email']}' OR username = '{form_data['username']}'"
        )
    
    if not user_exists:
        salt = create_salt()
        db.insert("users", {
            "email": form_data["email"],
            "username": form_data["username"],
            "password_hash": hash_password(form_data["password"], salt),
            "salt": salt,
        })
        return JSONResponse(
            content={"message": "Все супер!"},
            status_code=200,
            headers={"X-Header": "Value"}
            )
    else:
        return JSONResponse(
            content={"message": "Эта почта уже зарегана"},
            status_code=409,
            headers={"X-Header": "Value"}
            )
    
