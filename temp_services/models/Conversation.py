from supabase import create_client, Client
# from decouple import config
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize the Supabase client
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class Conversation:
    def __init__(self):
        self.table_name = "conversations"

    def create_table(self):
        # Creating the table if it doesn't exist
        query = f"""
        CREATE TABLE IF NOT EXISTS {self.table_name} (
            id SERIAL PRIMARY KEY,
            sender VARCHAR(255),
            message TEXT,
            response TEXT
        );
        """
        supabase.postgres.execute(query)

    def insert_conversation(self, sender, message, response):
        data = {
            "sender": sender,
            "message": message,
            "response": response
        }
        response = supabase.table(self.table_name).insert(data).execute()
        return response.data

    def fetch_conversations(self):
        response = supabase.table(self.table_name).select("*").execute()
        return response.data

    def update_conversation(self, id, sender=None, message=None, response=None):
        data = {}
        if sender:
            data["sender"] = sender
        if message:
            data["message"] = message
        if response:
            data["response"] = response
        response = supabase.table(self.table_name).update(data).eq('id', id).execute()
        return response.data

    def delete_conversation(self, id):
        response = supabase.table(self.table_name).delete().eq('id', id).execute()
        return response.data
