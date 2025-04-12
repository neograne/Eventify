from fastapi import APIRouter
from fastapi.responses import JSONResponse
from databse import AsyncDatabase
from hashlib import sha256
import secrets

router = APIRouter()

db = AsyncDatabase("database", "username", "password", "db", "5432")
db.connect()

pepper = ""


def generate_session_token() -> str:
    token = ""
    return token


def hash_password(password: str, salt: str) -> str:
    return sha256((salt + pepper + password).encode('utf-8')).hexdigest()


@router.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}


@router.get("/user")
async def user(email: str = "none", username: str = "none"):
    return {"message": username}


@router.post("/login")
async def user(form_data: dict) -> JSONResponse:
    user_exists = db.exists(
        "users",
        f"email = '{form_data['email']}'"
    )

    if user_exists:
        data = db.fetch_one(f"SELECT email, password_hash, salt FROM users WHERE email = '{form_data['email']}'")

        if hash_password(form_data['password'], data[2]) == data[1]:
            response = JSONResponse(status_code=200)
            response.set_cookie(
                key="session_token",
                value="",
                max_age=1,
                secure=True,
                httponly=True,
                samesite="lax"
            )
            return 

    return JSONResponse(content={"message": "Неверные учетные данные"}, status_code=401)


@router.post("/add_user")
async def add_user(form_data: dict) -> JSONResponse:
    user_exists = db.exists(
        "users",
        f"email = '{form_data['email']}' OR username = '{form_data['username']}'"
    )

    if not user_exists:
        try:
            salt = secrets.token_urlsafe(8)
            db.insert("users", {
                "email": form_data["email"],
                "username": form_data["username"],
                "password_hash": hash_password(form_data["password"], salt),
                "salt": salt,
            })
            return JSONResponse(status_code=200)
        except:
            return JSONResponse(content={"message": "ошибка"}, status_code=500)
    else:
        return JSONResponse(content={"message": "Ползователь уже зарегестрирован"}, status_code=409)