from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient


from app.core.db.db_utils import get_db_async
from app.services.services import LoginService
from app.services.schemas import UserLoginConfiguration, UserLoginResponse, UserCreationResponse

eeg_backend_router = APIRouter(tags=['Backend'])

class EEGBackend:
    
    def __init__(self):
        pass

    @eeg_backend_router.post('/v1/hello', response_model=None)
    async def check_api() -> JSONResponse:
        try:
            return JSONResponse(content={"message":'Authentication Successful'}, status_code=200)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unable to reach to server {str(e)}"
            )
        
    @eeg_backend_router.post('/v1/create_user', response_model=UserCreationResponse)
    async def create_user(user_details_obj: UserLoginConfiguration,
                          client: AsyncIOMotorClient = Depends(get_db_async)) -> UserCreationResponse:
        try:
            login_service = LoginService(db_async_client=client)

            if await login_service.create_user(user_obj=user_details_obj):
                return UserCreationResponse(user_created=True)
            else:
                return UserCreationResponse(user_created=False)
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to create new user or user already existing : {str(e)}"
            )
    
    @eeg_backend_router.post('/v1/login', response_model=UserLoginResponse)
    async def user_login(user_details_obj: UserLoginConfiguration,
                         client: AsyncIOMotorClient = Depends(get_db_async)) -> UserLoginResponse:
        try:
            login_service = LoginService(db_async_client=client)

            if await login_service.is_valid_user(user_obj=user_details_obj):
                return UserLoginResponse(user_found=True)
            else:
                return UserLoginResponse(user_found=False)
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to login at this moment. Details are: {str(e)}"
            )
