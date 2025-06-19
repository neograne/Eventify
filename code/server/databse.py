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
        print(await self.fetch_all(query))
        return await self.fetch_all(query)

    async def add_organized_event(self, user_id: int, event_id: int) -> None:
        await self.insert("organized_events", {"user_id": user_id, "event_id": event_id})

    async def get_organized_events(self, user_id: int) -> List[Record]:
        query = """
        SELECT * FROM events
        WHERE owner_id = $1
        """
        return await self.fetch_all(query, user_id)