from pydantic import BaseModel

class UserLoginConfiguration(BaseModel):

    mail_id: str

    password: str

class UserLoginResponse(BaseModel):
    
    user_found: bool


class UserCreationResponse(BaseModel):
    
    user_created: bool