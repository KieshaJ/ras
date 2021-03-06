from typing import Optional
from pydantic import BaseModel, Field


class ReviewModel(BaseModel):
    company_id: str = Field(...)
    content: str = Field(...)
    rating: int

    class Config:
        schema_extra = {}


class UpdateReviewModel(BaseModel):
    company: Optional[str]
    content: Optional[str]
    rating: Optional[int]

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
