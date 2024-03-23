from datetime import datetime
from typing import List, Optional, Union, Tuple, Any
import json
from app.services.schemas import *

class LoginDao:

    def __init__(self, db_async_client=None):

        self.db_async_client = db_async_client

    async def insert_user(self, user_obj: UserLoginConfiguration) -> bool:
        
        try:
            # Check if the user with the given mail_id already exists
            existing_user = await self.db_async_client.users.find_one({"mail_id": user_obj.mail_id})
            if existing_user:
                print(f"User with mail_id {user_obj.mail_id} already exists.")
                return False
            
            # Insert the new user since mail_id does not exist
            result = await self.db_async_client.users.insert_one(user_obj.model_dump())
            return True if result.inserted_id else False

        except Exception as e:
            print(f"Error inserting user: {e}")
            return False

    async def get_user_details(self, user_obj:UserLoginConfiguration):

        try:
            user = await self.db_async_client.users.find_one({
                "mail_id": user_obj.mail_id,
                "password": user_obj.password 
                })
            
            if user:
                user["_id"] = str(user["_id"])
                return user
            else:
                return None
        except Exception as e:
            print(f"Expcetion occured while fetching user details. {e}")
