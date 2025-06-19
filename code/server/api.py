import base64
from datetime import datetime
import time
from fastapi import FastAPI, Depends, HTTPException, Request, Response, APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
from databse import AsyncDatabase
from hashlib import sha256
import secrets
from pydantic import BaseModel

router = APIRouter()

db = AsyncDatabase("database", "username", "password", "localhost", "5432")

date_format = "%Y-%m-%d"
pepper = "123"
SECRET_KEY = secrets.token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class EventCreate(BaseModel):
    event_title: str
    event_date: str
    event_organizer: str
    event_description: str
    event_scale: str
    event_type: str
    tags: list[str]
    event_image: str

async def generate_session_token() -> str:
    while True:
        token = secrets.token_urlsafe(32)
        exists = await db.exists("sessions", "token = $1", token)
        if not exists:
            print(token)
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
    try:
        with open(f"../avatars/{user_id}.png", "rb") as image_file:
            base64_string = base64.b64encode(image_file.read()).decode('utf-8')
    except:
        base64_string = ""
    data = {**dict(student_data), **dict(user_data), **{"avatar": base64_string}}
    return data

@router.post("/login")
async def user(form_data: dict) -> JSONResponse:
    await db.connect()
    data = await db.fetch_one(
        "SELECT user_id, email, password_hash, salt FROM users WHERE email = $1",
        form_data['email']
    )
    if data and hash_password(form_data['password'], data['salt']) == data['password_hash']:
        user_id = data['user_id']
        token = await generate_session_token()
        await db.insert("sessions", {
            "user_id": user_id,
            "token": token,
        })
        response = JSONResponse(content={"message": "Login successful"}, status_code=200)
        response.set_cookie(
            key="session_token",
            value=token,
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            secure=True,
            httponly=True,
            samesite="lax"
        )
        return response
    else:
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
            token = await generate_session_token()
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
        print("Checking authentication")
        await db.connect()
        token = request.cookies.get("session_token")
        print("Token from cookies:", token)
        if not token:
            return {"isAuthenticated": False}
        data = await db.fetch_one(
            "SELECT user_id FROM sessions WHERE token = $1",
            token
        )
        print("Data fetched:", data)
        if data:
            user_id = data['user_id']
            return {"isAuthenticated": True, "user": {"user_id": user_id}}
        else:
            return {"isAuthenticated": False}
    except Exception as e:
        print("Error during authentication check:", e)
        return {"isAuthenticated": False}

@router.post("/update_user_info")
async def update_user_info(request: Request, form_data: dict):
    try:
        await db.connect()
        data = await db.fetch_one(f"SELECT user_id FROM sessions WHERE token = '{request.cookies.get("session_token")}'")
        user_id = data["user_id"]
        if form_data["avatar"].startswith("data:image"):
            header, encoded_image = form_data["avatar"].split(",", 1)
            with open(f"../avatars/{user_id}.png", "wb") as file:
                file.write(base64.b64decode(encoded_image))
        elif form_data["avatar"].startswith("https"):
            pass
        else:
            return JSONResponse(status_code=400, content={"message": "Некорректный формат изображения"})
        form_data.pop("avatar")
        update_data = form_data.copy()
        update_data.pop("email")
        update_data.pop("password")
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

@router.get("/events")
async def get_events():
    await db.connect()
    events = await db.get_events()
    return events


@router.post("/create_event")
async def create_event(event: EventCreate, request: Request):
    print("Creating event:", event)

    # Парсинг даты и времени из строки ISO 8601
    try:
        dt = datetime.fromisoformat(event.event_date)
    except ValueError:
        return {"error": "Неверный формат даты. Используйте формат ISO 8601, например '2000-12-30T12:12'"}, 400

    # Разделяем на date и time
    event_date_only = dt.date()
    event_time_only = dt.time()

    await db.connect()

    token = request.cookies.get("session_token")
    user_id_record = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id_record:
        return {"error": "Пользователь не найден"}, 404
    user_id = user_id_record["user_id"]

    # Формируем данные для вставки
    event_data = event.dict()
    event_data.pop("event_date")
    event_data["event_date"] = event_date_only
    event_data["event_time"] = event_time_only
    event_data["owner_id"] = user_id
    print("Creating event:", event_data)
    result = await db.insert("events", event_data)
    if not result:
        return {"error": "Ошибка при добавлении события"}, 500

    # Получаем ID нового события
    event_id = await db.fetch_val("SELECT id FROM events ORDER BY id DESC LIMIT 1")

    # Связываем организатора с событием
    await db.add_organized_event(user_id, event_id)

    return {"message": "Мероприятие успешно создано"}


@router.get("/organized_events")
async def get_organized_events(request: Request):
    await db.connect()
    token = request.cookies.get("session_token")
    if not token:
        raise HTTPException(status_code=401, detail="Не авторизован")
    user_id = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Неверный токен сессии")
    user_id = user_id["user_id"]
    events = await db.get_organized_events(user_id)
    return events