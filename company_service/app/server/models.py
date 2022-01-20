from typing import Optional, List
from pydantic import BaseModel, Field


class CompanyModel(BaseModel):
    name: str = Field(...)
    ownerId: str = ""
    workerIds: List[str] = []

    class Config:
        schema_extra = {}


class UpdateCompanyModel(BaseModel):
    name: Optional[str]
    ownerId: Optional[str]
    workerIds: Optional[List[str]]

    class Config:
        schema_extra = {}


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
