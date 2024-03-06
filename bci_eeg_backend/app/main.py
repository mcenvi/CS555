from fastapi import FastAPI, HTTPException
from app.api.endpoints.v1.routes import eeg_backend_router
import uvicorn

app = FastAPI()

# Include routers from each API module
app.include_router(eeg_backend_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=82)
