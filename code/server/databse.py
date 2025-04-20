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
        """Асинхронное подключение к базе данных."""
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
        """Асинхронное отключение от базы данных."""
        if self.connection:
            await self.connection.close()
            print("Асинхронное подключение к базе данных закрыто.")

    async def execute_query(self, query: str, *args) -> None:
        """Асинхронное выполнение SQL-запроса."""
        try:
            await self.connection.execute(query, *args)
            print("Запрос выполнен успешно.")
        except Exception as e:
            print(f"Ошибка при выполнении запроса: {e}")
            raise

    async def fetch_one(self, query: str, *args) -> Optional[Record]:
        """Асинхронное получение одной строки результата."""
        try:
            return await self.connection.fetchrow(query, *args)
        except Exception as e:
            print(f"Ошибка при получении данных: {e}")
            raise

    async def fetch_all(self, query: str, *args) -> List[Record]:
        """Асинхронное получение всех строк результата."""
        try:
            return await self.connection.fetch(query, *args)
        except Exception as e:
            print(f"Ошибка при получении данных: {e}")
            raise

    async def insert(self, table: str, data: Dict[str, Any]) -> None:
        """Асинхронное добавление записи в таблицу."""
        columns = ', '.join(data.keys())
        values = list(data.values())
        placeholders = ', '.join([f'${i+1}' for i in range(len(values))])
        
        query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        await self.execute_query(query, *values)

    async def delete(self, table: str, condition: str, *args) -> None:
        """Асинхронное удаление записи из таблицы."""
        query = f"DELETE FROM {table} WHERE {condition}"
        await self.execute_query(query, *args)

    async def exists(self, table: str, condition: str, *args) -> bool:
        """Асинхронная проверка существования записи в таблице."""
        query = f"SELECT EXISTS(SELECT 1 FROM {table} WHERE {condition})"
        try:
            result = await self.fetch_one(query, *args)
            return result[0] if result else False
        except:
            return False

    async def update(self, table: str, data: Dict[str, Any], condition: str, *args) -> None:
        """Асинхронное обновление записи в таблице."""
        set_clause = ', '.join([f"{k} = ${i+1}" for i, k in enumerate(data.keys())])
        values = list(data.values())
        
        # Смещаем номера placeholder'ов для условия
        condition_placeholders = ', '.join([f"${i+len(values)+1}" for i in range(len(args))])
        condition = condition.replace('?', '{}').format(*[f"${i+len(values)+1}" for i in range(len(args))])
        
        query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
        await self.execute_query(query, *(values + list(args)))


class Users:
    def __init__(self, connection: AsyncDatabase):
        self.connection = connection

    def exists():
        ...
    
    def get_by_id():
        ...
    
    def get_by_session():
        ...
    
    def add():
        ...
    
    def delete():
        ...
    
    def update():
        ...
    
    def check_password():
        ...

    def get_user_salt():
        ...

    def is_session_token_active():
        ...

    def set_session_token():
        ...
    
    def add_to_event():
        ...
    
    def _():
        ...
    
    def _():
        ...
    
    def _():
        ...
    
    def _():
        ...


class Events:
    def __init__(self, connection: AsyncDatabase):
        self.connection = connection

    def exists():
        ...
    
    def get_by_id():
        ...
    
    def get_by_owner_id():
        ...
    
    def add():
        ...
    
    def delete():
        ...
    
    def update():
        ...

