import base64
from datetime import datetime
import time
from fastapi import FastAPI, Depends, HTTPException, Request, Response, APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
from databse import AsyncDatabase
from hashlib import sha256
import secrets

router = APIRouter()

db = AsyncDatabase("database", "username", "password", "localhost", "5432")

date_format = "%Y-%m-%d"
pepper = "123"
SECRET_KEY = secrets.token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


#TODO: Сделать проверку куки в бд
def generate_session_token() -> str:
    while 1:
        token = secrets.token_urlsafe(32)
        if 1:
            return token


def hash_password(password: str, salt: str) -> str:
    return sha256((salt + pepper + password).encode('utf-8')).hexdigest()


@router.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}


@router.get("/get_user_info")
async def user(request: Request):
    await db.connect()
    user_id = await db.fetch_one(f"SELECT user_id FROM sessions WHERE token = '{request.cookies.get("session_token")}'")
    user_id = user_id["user_id"]

    user_data = await db.fetch_one(f"SELECT email FROM users WHERE user_id = '{user_id}'")
    student_data = await db.fetch_one(f"SELECT full_name, birth_date, institute, study_group FROM students WHERE user_id = '{user_id}'")

    with open(f"../avatars/{user_id}.png", "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')

    data = {**dict(student_data), **dict(user_data), **{"avatar": base64_string}}

    
    return data


@router.post("/login")
async def user(form_data: dict) -> JSONResponse:
    await db.connect()
    user_exists = db.exists(
        "users",
        f"email = '{form_data['email']}'"
    )

    if user_exists:
        data = await db.fetch_one(f"SELECT email, password_hash, salt FROM users WHERE email = '{form_data['email']}'")

        if hash_password(form_data['password'], data[2]) == data[1]:
            response = JSONResponse(status_code=200)
            response.set_cookie(
                key="session_token",
                value=generate_session_token(),
                max_age=1,
                secure=True,
                httponly=True,
                samesite="lax"
            )
            return response

    return JSONResponse(content={"message": "Неверные учетные данные"}, status_code=401)


@router.post("/add_user")
async def add_user(form_data: dict) -> JSONResponse:
    await db.connect()
    user_exists = await db.exists(
        "users",
        f"email = '{form_data['email']}' OR username = '{form_data['username']}'"
    )
    
    if not user_exists:
        try:
            salt = secrets.token_urlsafe(8)
            token = generate_session_token()
            await db.insert("users", {
                "email": form_data["email"],
                "username": form_data["username"],
                "password_hash": hash_password(form_data["password"], salt),
                "salt": salt,
            })
            
            data = await db.fetch_one(f"SELECT user_id FROM users WHERE email = '{form_data['email']}'")
            
            await db.insert("sessions", {
                "user_id": data["user_id"],
                "token": token,
            })

            response = JSONResponse(content={"message": "nice"}, status_code=200)

            response.set_cookie( 
                key="session_token",
                value=token,
                max_age=100000000000000000,
                secure=True,
                httponly=True,
                samesite="lax"
            )
            return response
        except Exception as e:
            print(e)
            return JSONResponse(content={"message": "ошибка"}, status_code=500)
    else:
        return JSONResponse(content={"message": "Ползователь уже зарегестрирован"}, status_code=409)


@router.get("/check_auth")
async def check_auth(request: Request):
    try:
        await db.connect()
        data = await db.fetch_one(f"SELECT user_id FROM sessions WHERE token = '{request.cookies.get("session_token")}'")
        user_id = data["user_id"]
        
        return {"isAuthenticated": True, "user": {"username": user_id}}
    except HTTPException:
        return {"isAuthenticated": FastAPI}


@router.post("/update_user_info")
async def update_user_info(request: Request, form_data: dict):
    try:
        await db.connect()
        data = await db.fetch_one(f"SELECT user_id FROM sessions WHERE token = '{request.cookies.get("session_token")}'")
        user_id = data["user_id"]
        print(1)
        if form_data["avatar"].startswith("data:image"):
            header, encoded_image = form_data["avatar"].split(",", 1)
            with open(f"../avatars/{user_id}.png", "wb") as file:
                file.write(base64.b64decode(encoded_image))
        elif form_data["avatar"].startswith("https"):
            pass
        else:
            return JSONResponse(status_code=400, content={"message": "Некорректный формат изображения"})
        
        form_data.pop("avatar")
        print(form_data)
        update_data = form_data.copy()
        update_data.pop("email")
        update_data.pop("password")
        print(3)
        update_data["birth_date"] = datetime.strptime(update_data["birth_date"], date_format).date()
        if not await db.exists("students", f"user_id = '{user_id}'"):
            update_data["user_id"] = user_id
            await db.insert(
                table="students",
                data=update_data,
            )
        else:
            await db.update(
                table="students",
                data=update_data,
                condition=f"user_id = '{user_id}'",
            )
            
        
        await db.update(
            table="users",
            data={"email": form_data['email']},
            condition=f"user_id = '{user_id}'",
        )

        return JSONResponse(status_code=200, content={"message": "Данные обновлены"})
    except Exception as ex:
        print(ex)
