from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserModel(BaseModel):
    name: str = Field(...)
    surname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "name": "Jane",
                "surname": "Doe",
                "email": "jane@doe.com",
                "password": "JDoe123"
            }
        }


class UpdateUserModel(BaseModel):
    name: Optional[str]
    surname: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "name": "Jane",
                "surname": "Doe",
                "email": "jane@doe.com",
                "password": "JDoe123"
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message
    }


def ErrorResponseModel(error, code, message):
    return {
        "error": error,
        "code": code,
        "message": message
    }
