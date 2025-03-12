import psycopg2
from psycopg2 import sql

class PostgreSQLManager:
    def __init__(self, dbname, user, password, host='localhost', port=5432):
        self.connection = None
        self.cursor = None
        self.dbname = dbname
        self.user = user
        self.password = password
        self.host = host
        self.port = port

    def connect(self):
        """Подключение к базе данных."""
        try:
            self.connection = psycopg2.connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port
            )
            self.cursor = self.connection.cursor()
            print("Подключение к базе данных успешно установлено.")
        except Exception as e:
            print(f"Ошибка при подключении к базе данных: {e}")

    def disconnect(self):
        """Отключение от базы данных."""
        if self.connection:
            self.cursor.close()
            self.connection.close()
            print("Подключение к базе данных закрыто.")

    def execute_query(self, query, params=None):
        """Выполнение SQL-запроса."""
        try:
            self.cursor.execute(query, params or ())
            self.connection.commit()
            print("Запрос выполнен успешно.")
        except Exception as e:
            print(f"Ошибка при выполнении запроса: {e}")

    def fetch_one(self, query, params=None):
        """Получение одной строки результата."""
        try:
            self.cursor.execute(query, params or ())
            return self.cursor.fetchone()
        except Exception as e:
            print(f"Ошибка при получении данных: {e}")
            return None

    def fetch_all(self, query, params=None):
        """Получение всех строк результата."""
        try:
            self.cursor.execute(query, params or ())
            return self.cursor.fetchall()
        except Exception as e:
            print(f"Ошибка при получении данных: {e}")
            return None

    def insert(self, table, data):
        """Добавление записи в таблицу."""
        columns = data.keys()
        values = [data[column] for column in columns]
        query = sql.SQL("INSERT INTO {} ({}) VALUES ({})").format(
            sql.Identifier(table),
            sql.SQL(', ').join(map(sql.Identifier, columns)),
            sql.SQL(', ').join(sql.Placeholder() * len(values))
        )
        self.execute_query(query, values)

    def delete(self, table, condition):
        """Удаление записи из таблицы."""
        query = sql.SQL("DELETE FROM {} WHERE {}").format(
            sql.Identifier(table),
            sql.SQL(condition)
        )
        self.execute_query(query)

    def exists(self, table, condition):
        """Проверка существования записи в таблице."""
        query = sql.SQL("SELECT EXISTS(SELECT 1 FROM {} WHERE {})").format(
            sql.Identifier(table),
            sql.SQL(condition)
        )
        result = self.fetch_one(query)
        return result[0] if result else False

    def update(self, table, data, condition):
        """Обновление записи в таблице."""
        set_clause = sql.SQL(', ').join(
            sql.SQL("{} = {}").format(sql.Identifier(k), sql.Placeholder())
            for k in data.keys()
        )
        query = sql.SQL("UPDATE {} SET {} WHERE {}").format(
            sql.Identifier(table),
            set_clause,
            sql.SQL(condition)
        )
        self.execute_query(query, list(data.values()))
