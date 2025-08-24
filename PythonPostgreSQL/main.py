import psycopg2
from psycopg2 import errors
import datetime


DATABASE_HOST = "localhost"
DATABASE_NAME = "SummerProjectDB"
DATABASE_USER = "postgres"
DATABASE_PASSWORD = "Qwerty123" 
DATABASE_PORT = 5432

def connectToDatabase():
    try:
        connection = psycopg2.connect(
            host=DATABASE_HOST,
            dbname=DATABASE_NAME,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            port=DATABASE_PORT
        )
        print(f"Connected to database at {datetime.datetime.now()}")
        return connection
    except errors.ConnectionException as error:
        print("Could not connect to database. Verify connection information is correct and try again.")
        print(f"Connection Error: {error}")
        return None
    except errors.OperationalError as error:
        print(f"Operational error: {error}")
        return None
    except Exception as error:
        print(f"An unexpected error occurred: {error}")
        return None

def closeConnectionToDatabase(connection):
    try:
        if connection:
            connection.close()
            print("Connection closed.")
    except Exception as error:
        print(f"Unexpected error occurred: {error}")

def checkConnection(connection):
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                print("Connection is active.")
    except psycopg2.OperationalError as error:
        print(f"Connection is broken: {error}")
    except Exception as error:
        print(f"Connection not established: {error}")

def createTable(connection):
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS SomeTable (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        age INTEGER,
                        city VARCHAR(100),
                        is_active BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                connection.commit()
                print("Table successfully created!")
                cursor.execute("SELECT * FROM SomeTable")
                cursor.fetchall()
    except errors.DuplicateTable as error:
        print(f"Table already exists: {error}")
    except errors.OperationalError as error:
        print(f"Operational error: {error}")
    except Exception as error:
        print(f"An unexpected error occurred: {error}")

def userLookup(connection, user_input):
    try:
        with connection:
            with connection.cursor() as cursor:
                query = f"SELECT * FROM SomeTable WHERE name = '{user_input}'"
                cursor.execute(query)
                results = cursor.fetchall()
                return results
    except Exception as error:
        print(f"Database error: {error}")
        return None

def login(connection, username, password):

    try:
        with connection:
            with connection.cursor() as cursor:
                query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
                cursor.execute(query)
                user = cursor.fetchone()
                if user:
                    print("Login successful!")
                    return True
                else:
                    print("Invalid credentials")
                    return False
    except Exception as error:
        print(f"Login error: {error}")
        return False

def main():
    connection = None

    print("Welcome to Python PostgreSQL setup")
    while True:
        print("Menu Options:")
        print("1. Connect DB")
        print("2. Check DB Connection")
        print("3. Close DB Connection")
        print("4. Create new Table")
        print("0. Exit Program")
        choice = input("Choose an option: ")

        try:
            match choice:
                case "1":
                    if connection:
                        print("Closing previous connection before opening a new one.")
                        closeConnectionToDatabase(connection)
                        connection = None
                    connection = connectToDatabase()
                case "2":
                    if connection:
                        checkConnection(connection)
                    else:
                        print("Not connected to database.")
                case "3":
                    if connection:
                        closeConnectionToDatabase(connection)
                        connection = None
                    else:
                        print("Not connected to database.")
                case "4":
                    if connection:
                        createTable(connection)
                    else:
                        print("Not connected to database.")
                case "0":
                    print("Exiting Program...")
                    if connection:
                        closeConnectionToDatabase(connection)
                    break
                case _:
                    print("Invalid option. Choose from provided list:")
        except Exception as error:
            print(f"An unexpected error has occurred: {error}")

if __name__ == "__main__": main()