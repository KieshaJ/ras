from typing import Optional
from pydantic import BaseModel, EmailStr, Field
import enum


class Role(enum.Enum):
    OWNER = 1
    WORKER = 2


class UserModel(BaseModel):
    name: str = Field(...)
    surname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: Role = Field(...)
    company: dict = None

    class Config:
        schema_extra = {
            "example": {
                "name": "Jane",
                "surname": "Doe",
                "email": "jane@doe.com",
                "password": "JDoe123",
                "role": "OWNER",
                "company": {}
            }
        }


class UpdateUserModel(BaseModel):
    name: Optional[str]
    surname: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]
    role: Optional[Role]

    class Config:
        schema_extra = {
            "example": {
                "name": "Jane",
                "surname": "Doe",
                "email": "jane@doe.com",
                "password": "JDoe123",
                "role": "WORKER"
            }
        }


class LoginModel(BaseModel):
    email: str = Field(...)
    password: str = Field(...)


class TokenData:
    user_id: str
    name: str
    surname: str
    email: str
    role: int

    def __init__(self, user_id, name, surname, email, role):
        self.user_id = user_id
        self.name = name
        self.surname = surname
        self.email = email
        self.role = role


class Token:
    token: str
    user: TokenData

    def __init__(self, token, token_data):
        self.token = token
        self.user = token_data


class ResponseModel:
    def __init__(self, data, message):
        self.data = data
        self.code = 200
        self.message = message

    def json(self):
        return {
            "data": self.data,
            "code": self.code,
            "message": self.message
        }


class ErrorResponseModel:
    def __init__(self, error, code, message):
        self.error = error
        self.code = code
        self.message = message

    def json(self):
        return {
            "error": self.error,
            "code": self.code,
            "message": self.message
        }
