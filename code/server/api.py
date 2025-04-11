from fastapi import APIRouter
from fastapi.responses import JSONResponse
from databse import AsyncDatabase
from hashlib import sha256
import string
import random

router = APIRouter()

db = AsyncDatabase("database", "username", "password", "db", "5432")
db.connect()


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
    return sha256((salt + password).encode('utf-8')).hexdigest()


@router.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}


@router.get("/user")
async def user(email: str = "none", username: str = "none"):
    print(username)
    return {"message": username}


@router.post("/login")
async def user(form_data: dict):
    user_exists = db.exists(
        "users",
        f"email = '{form_data['email']}'"
    )

    if user_exists:
        data = db.fetch_one(f"SELECT email, password_hash, salt FROM users WHERE email = '{form_data['email']}'")

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


@router.post("/add_user")
async def add_user(form_data: dict):
    user_exists = db.exists(
        "users",
        f"email = '{form_data['email']}' OR username = '{form_data['username']}'"
    )

    if not user_exists:
        try:
            print(form_data)
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
        except:
            return JSONResponse(
                content={"message": "ошибка"},
                status_code=500,
                headers={"X-Header": "Value"}
            )
    else:
        return JSONResponse(
            content={"message": "Эта почта уже зарегана"},
            status_code=409,
            headers={"X-Header": "Value"}
        )