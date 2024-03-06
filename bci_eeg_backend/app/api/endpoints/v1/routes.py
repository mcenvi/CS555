from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

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
