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
    event_format: str
    event_direction: str
    tags: list[str]
    event_image: str

# event_title: '',
# event_image: '',
# event_date: '',
# event_organizer: '',
# event_description: '',
# event_scale: 'Университетский',
# event_direction: 'Развлекательное',
# event_format: 'Лекция',
# tags: [],
# newTag: ''

async def generate_session_token() -> str:
    while True:
        token = secrets.token_urlsafe(32)
        exists = await db.exists("sessions", "token = $1", token)
        if not exists:
            #print(token)
            return token

def hash_password(password: str, salt: str) -> str:
    return sha256((salt + pepper + password).encode('utf-8')).hexdigest()

@router.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}

@router.get("/get_user_info")
async def user(request: Request):
    await db.connect()
    user_id = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", request.cookies.get("session_token"))
    if not user_id:
        raise HTTPException(status_code=401, detail="Неверный токен сессии")
    user_id = user_id["user_id"]
    user_data = await db.fetch_one("SELECT email FROM users WHERE user_id = $1", user_id)
    student_data = await db.get_student_data(user_id)

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
        "email = $1 OR username = $2",
        form_data['email'],
        form_data['username']
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
            data = await db.fetch_one("SELECT user_id FROM users WHERE email = $1", form_data["email"])
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
            #print(e)
            return JSONResponse(content={"message": "ошибка"}, status_code=500)
    else:
        return JSONResponse(content={"message": "Пользователь уже зарегистрирован"}, status_code=409)

@router.get("/check_auth")
async def check_auth(request: Request):
    try:
        #print("Checking authentication")
        await db.connect()
        token = request.cookies.get("session_token")
        #print("Token from cookies:", token)
        if not token:
            return {"isAuthenticated": False}
        data = await db.fetch_one(
            "SELECT user_id FROM sessions WHERE token = $1",
            token
        )
        #print("Data fetched:", data)
        if data:
            user_id = data['user_id']
            return {"isAuthenticated": True, "user": {"user_id": user_id}}
        else:
            return {"isAuthenticated": False}
    except Exception as e:
        #print("Error during authentication check:", e)
        return {"isAuthenticated": False}

@router.post("/update_user_info")
async def update_user_info(request: Request, form_data: dict):
    try:
        await db.connect()
        data = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", request.cookies.get("session_token"))
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
        update_data["birth_date"] = datetime.strptime(update_data["birth_date"], date_format).date()
        if not await db.exists("students", "user_id = $1", user_id):
            update_data["user_id"] = user_id
            await db.insert(
                table="students",
                data=update_data,
            )
        else:
            await db.update(
                table="students",
                data=update_data,
                condition="user_id = $1",
                user_id=user_id
            )
        await db.update(
            table="users",
            data={"email": form_data['email']},
            condition="user_id = $1",
            user_id=user_id
        )

        #print("User info updated:", update_data)
        return JSONResponse(status_code=200, content={"message": "Данные обновлены"})
    except Exception as ex:
        #print("Error updating user info:", ex)
        return JSONResponse(status_code=500, content={"message": "Ошибка при обновлении данных"})

@router.get("/events")
async def get_events():
    await db.connect()
    events = await db.get_events()
    return events

@router.get("/event/{event_id}")
async def get_events(event_id: int):
    await db.connect()
    event = await db.fetch_one("SELECT * FROM events WHERE event_id = $1", event_id)
    return event

@router.post("/delete_event/{event_id}")
async def delete_event(event_id: int):
    await db.connect()
    await db.delete_event(event_id)
    return {"message": "Мероприятие успешно удалено"}

@router.post("/create_event")
async def create_event(event: EventCreate, request: Request):
    #print("Creating event:", event)
    try:
        dt = datetime.fromisoformat(event.event_date)
    except ValueError:
        return {"error": "Неверный формат даты. Используйте формат ISO 8601, например '2000-12-30T12:12'"}, 400
    event_date_only = dt.date()
    event_time_only = dt.time()
    await db.connect()
    token = request.cookies.get("session_token")
    user_id_record = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id_record:
        return {"error": "Пользователь не найден"}, 404
    user_id = user_id_record["user_id"]
    event_data = event.dict()
    event_data.pop("event_date")
    event_data["event_date"] = event_date_only
    event_data["event_time"] = event_time_only
    event_data["owner_id"] = user_id
    #print("Creating event:", event_data)
    await db.insert("events", event_data)
    event_id = await db.fetch_one("SELECT event_id FROM events ORDER BY event_id DESC LIMIT 1")
    await db.add_organized_event(user_id, event_id["event_id"])
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



@router.get("/get_event_report/{event_id}")
async def get_event_report(request: Request, event_id: int):
    print(event_id)
    await db.connect()
    token = request.cookies.get("session_token")
    print("Token from cookies:", token)
    if not token:
        raise HTTPException(status_code=401, detail="Не авторизован")
    user_id = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Неверный токен сессии")
    user_id = user_id["user_id"]

    # Check if the user is the owner of the event
    event_owner = await db.fetch_one("SELECT owner_id FROM events WHERE event_id = $1", event_id)
    if not event_owner or event_owner["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Доступ запрещен")

    report = await db.get_event_report(event_id)
    if not report:
        raise HTTPException(status_code=404, detail="Отчет не найден")
    print("Report fetched:", report)
    return {
        "id": report["id"],
        "event_id": report["event_id"],
        "gender": {
            "male_count": report["male_count"],
            "female_count": report["female_count"],
            "total_participants": report["total_participants"]
        },
        "age": {
            "under_18_male": report["under_18_male"],
            "under_18_female": report["under_18_female"],
            "age_17_19_male": report["age_17_19_male"],
            "age_17_19_female": report["age_17_19_female"],
            "age_20_22_male": report["age_20_22_male"],
            "age_20_22_female": report["age_20_22_female"],
            "age_23_25_male": report["age_23_25_male"],
            "age_23_25_female": report["age_23_25_female"],
            "age_26_28_male": report["age_26_28_male"],
            "age_26_28_female": report["age_26_28_female"],
            "over_28_male": report["over_28_male"],
            "over_28_female": report["over_28_female"]
        },
        "course": {
            "course_1_male": report["course_1_male"],
            "course_1_female": report["course_1_female"],
            "course_2_male": report["course_2_male"],
            "course_2_female": report["course_2_female"],
            "course_3_male": report["course_3_male"],
            "course_3_female": report["course_3_female"],
            "course_4_male": report["course_4_male"],
            "course_4_female": report["course_4_female"],
            "course_5_male": report["course_5_male"],
            "course_5_female": report["course_5_female"],
            "no_course_male": report["no_course_male"],
            "no_course_female": report["no_course_female"]
        },
        "direction": {
            "direction_09_percent": float(report["direction_09_percent"]),
            "direction_02_percent": float(report["direction_02_percent"]),
            "direction_27_percent": float(report["direction_27_percent"]),
            "direction_52_percent": float(report["direction_52_percent"]),
            "direction_11_percent": float(report["direction_11_percent"]),
            "no_direction_percent": float(report["no_direction_percent"])
        },
        "attendance": {
            "registered": report["registered"],
            "attended": report["attended"]
        },
        "how_learned": {
            "tg_channel_count": report["tg_channel_count"],
            "vk_group_count": report["vk_group_count"],
            "email_count": report["email_count"],
            "invited_count": report["invited_count"],
            "eventify_count": report["eventify_count"]
        },
        "rating": {
            "voted_count": report["voted_count"],
            "average_rating": float(report["average_rating"])
        },
        "created_at": report["created_at"].isoformat()
    }

@router.get("/event_participants/{event_id}")
async def get_event_participants(request: Request, event_id: int):
    await db.connect()
    token = request.cookies.get("session_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid session token")
    user_id = user_id["user_id"]

    event_owner = await db.fetch_one("SELECT owner_id FROM events WHERE event_id = $1", event_id)
    if not event_owner or event_owner["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")

    participants = await db.fetch_all(
        """
        SELECT s.student_id, s.full_name, s.birth_date, s.institute, s.study_group, s.gender
        FROM events e
        JOIN students s ON s.user_id = ANY(e.participants)
        WHERE e.event_id = $1
        """,
        event_id
    )
    print("Participants fetched:", participants)
    return [dict(participant) for participant in participants]


@router.post("/join_event/{event_id}")
async def join_event(request: Request, event_id: int):
    await db.connect()
    token = request.cookies.get("session_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid session token")
    user_id = user_id["user_id"]

    # Check if user is already a participant
    event = await db.fetch_one("SELECT participants FROM events WHERE event_id = $1", event_id)

    if not event or user_id in event["participants"]:
        raise HTTPException(status_code=400, detail="Already registered or event not found")

    # Add user to participants array
    updated_participants = event["participants"] + [user_id]
    await db.update(
        table="events",
        data={"participants": updated_participants},
        condition=f"event_id ={event_id}",
    )


    
    # Add event to visited_events in students table
    student = await db.fetch_one("SELECT visited_events FROM students WHERE user_id = $1", user_id)
    visited_events = student["visited_events"] if student and student["visited_events"] else []
    if event_id not in visited_events:
        updated_visited = visited_events + [event_id]
        await db.update(
            table="students",
            data={"visited_events": updated_visited},
            condition=f"user_id = {user_id}",
        )


    return {"message": "Successfully joined event"}


@router.get("/visited_events")
async def get_visited_events(request: Request):
    await db.connect()
    token = request.cookies.get("session_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = await db.fetch_one("SELECT user_id FROM sessions WHERE token = $1", token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid session token")
    user_id = user_id["user_id"]

    student = await db.fetch_one("SELECT visited_events FROM students WHERE user_id = $1", user_id)
    visited_events = student["visited_events"] if student and student["visited_events"] else []

    events = await db.fetch_all(
        "SELECT event_id, event_title, event_date, event_time, event_organizer FROM events WHERE event_id = ANY($1)",
        visited_events
    )
    return [dict(event) for event in events]