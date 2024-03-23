from app.services.schemas import *
from app.services.dao import LoginDao
from motor.motor_asyncio import AsyncIOMotorClient


class LoginService:

    def __init__(self, db_async_client: AsyncIOMotorClient = None) -> None: # type: ignore
        
        self.login_dao = LoginDao(db_async_client=db_async_client)
    
    async def create_user(self, user_obj: UserLoginConfiguration) -> bool:

        new_user_created = await self.login_dao.insert_user(user_obj=user_obj)

        return True if new_user_created else False

    async def is_valid_user(self, user_obj:UserLoginConfiguration) -> bool:

        user_db_record = await self.login_dao.get_user_details(user_obj=user_obj)

        return True if user_db_record else False