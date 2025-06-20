import asyncpg
from asyncpg import Connection, Record
from typing import Optional, List, Dict, Any, Union

class AsyncDatabase:
    def __init__(self, dbname: str, user: str, password: str, host: str = '0.0.0.0', port: int = 5432):
        self.connection: Optional[Connection] = None
        self.dbname = dbname
        self.user = user
        self.password = password
        self.host = host
        self.port = port

    async def connect(self) -> None:
        try:
            self.connection = await asyncpg.connect(
                database=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port
            )
            print("Асинхронное подключение к базе данных успешно установлено.")
        except Exception as e:
            print(f"Ошибка при подключении к базе данных: {e}")
            raise

    async def disconnect(self) -> None:
        if self.connection:
            await self.connection.close()
            print("Асинхронное подключение к базе данных закрыто.")

    async def execute_query(self, query: str, *args) -> None:
        try:
            await self.connection.execute(query, *args)
            print("Запрос выполнен успешно.")
        except Exception as e:
            print(f"Ошибка при выполнении запроса: {e}")
            raise

    async def fetch_one(self, query: str, *args) -> Optional[Record]:
        try:
            return await self.connection.fetchrow(query, *args)
        except Exception as e:
            print(f"Ошибка при получении данных: {e}")
            raise

    async def fetch_all(self, query: str, *args) -> List[Record]:
        try:
            return await self.connection.fetch(query, *args)
        except Exception as e:
            print(f"Ошибка при получении данных: {e}")
            raise

    async def insert(self, table: str, data: Dict[str, Any]) -> None:
        columns = ', '.join(data.keys())
        values = list(data.values())
        placeholders = ', '.join([f'${i+1}' for i in range(len(values))])
        query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        await self.execute_query(query, *values)

    async def delete(self, table: str, condition: str, *args) -> None:
        query = f"DELETE FROM {table} WHERE {condition}"
        await self.execute_query(query, *args)

    async def exists(self, table: str, condition: str, *args) -> bool:
        query = f"SELECT EXISTS(SELECT 1 FROM {table} WHERE {condition})"
        try:
            result = await self.fetch_one(query, *args)
            return result[0] if result else False
        except:
            return False

    async def update(self, table: str, data: Dict[str, Any], condition: str, *args) -> None:
        set_clause = ', '.join([f"{k} = ${i+1}" for i, k in enumerate(data.keys())])
        values = list(data.values())
        condition_placeholders = ', '.join([f"${i+len(values)+1}" for i in range(len(args))])
        condition = condition.replace('?', '{}').format(*[f"${i+len(values)+1}" for i in range(len(args))])
        query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
        await self.execute_query(query, *(values + list(args)))

    async def get_events(self) -> List[Record]:
        query = "SELECT * FROM events"
        return await self.fetch_all(query)

    async def add_organized_event(self, user_id: int, event_id: int) -> None:
        await self.insert("organized_events", {"user_id": user_id, "event_id": event_id})

    async def get_organized_events(self, user_id: int) -> List[Record]:
        query = """
        SELECT * FROM events
        WHERE owner_id = $1
        """
        return await self.fetch_all(query, user_id)

    async def get_student_data(self, user_id: int) -> Optional[Record]:
        exists = await self.exists("students", "user_id = $1", user_id)
        
        if not exists:
            await self.insert("students", {
                "user_id": user_id,
                "full_name": "",
                "birth_date": None,
                "institute": "",
                "study_group": "",
                "gender": ""
            })
        
        query = "SELECT full_name, birth_date, institute, study_group, gender FROM students WHERE user_id = $1"
        return await self.fetch_one(query, user_id)

    async def get_event_report(self, event_id: int) -> Optional[Record]:
        query = """
        SELECT 
            id, event_id, male_count, female_count, total_participants,
            under_18_male, under_18_female, age_17_19_male, age_17_19_female,
            age_20_22_male, age_20_22_female, age_23_25_male, age_23_25_female,
            age_26_28_male, age_26_28_female, over_28_male, over_28_female,
            course_1_male, course_1_female, course_2_male, course_2_female,
            course_3_male, course_3_female, course_4_male, course_4_female,
            course_5_male, course_5_female, no_course_male, no_course_female,
            direction_09_percent, direction_02_percent, direction_27_percent,
            direction_52_percent, direction_11_percent, no_direction_percent,
            registered, attended, tg_channel_count, vk_group_count, email_count,
            invited_count, eventify_count, voted_count, average_rating, created_at
        FROM event_reports
        WHERE event_id = $1
        """
        record = await self.fetch_one(query, event_id)
        
        if record is None:
            insert_query = """
            INSERT INTO event_reports (
                event_id, male_count, female_count, total_participants,
                under_18_male, under_18_female, age_17_19_male, age_17_19_female,
                age_20_22_male, age_20_22_female, age_23_25_male, age_23_25_female,
                age_26_28_male, age_26_28_female, over_28_male, over_28_female,
                course_1_male, course_1_female, course_2_male, course_2_female,
                course_3_male, course_3_female, course_4_male, course_4_female,
                course_5_male, course_5_female, no_course_male, no_course_female,
                direction_09_percent, direction_02_percent, direction_27_percent,
                direction_52_percent, direction_11_percent, no_direction_percent,
                registered, attended, tg_channel_count, vk_group_count, email_count,
                invited_count, eventify_count, voted_count, average_rating, created_at
            ) VALUES (
                $1, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0.0, 0.0, 0.0,
                0.0, 0.0, 0.0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0.0, NOW()
            ) RETURNING *
            """
            record = await self.fetch_one(insert_query, event_id)
        
        return record

    async def delete_event(self, event_id: int) -> None:
        """
        Deletes an event and its related data from event_reports and organized_events tables.
        """
        try:
            # Start a transaction to ensure atomicity
            async with self.connection.transaction():
                # Delete from event_reports
                await self.delete("event_reports", "event_id = $1", event_id)
                # Delete from organized_events
                await self.delete("organized_events", "event_id = $1", event_id)
                # Delete from events
                await self.delete("events", "event_id = $1", event_id)
            print(f"Событие с ID {event_id} и связанные данные успешно удалены.")
        except Exception as e:
            print(f"Ошибка при удалении события: {e}")
            raise
    
