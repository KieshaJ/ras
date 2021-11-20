from typing import List, Optional, Literal
from pydantic import BaseModel, Field


QuestionType = Literal[
    "SINGLE_CHOICE",
    "MULTI_CHOICE",
    "BOOLEAN",
    "NUMBER",
    "PERCENTAGE",
    "TEXT"
]


class AnswerModel(BaseModel):
    title: str = Field(...)
    description: Optional[str]

    class Config:
        schema_extra = {
            "example": {}
        }


class QuestionModel(BaseModel):
    title: str = Field(...)
    description: Optional[str]
    question_type: QuestionType = Field(...)
    answers: List[AnswerModel] = []

    class Config:
        schema_extra = {
            "example": {}
        }


class SurveyModel(BaseModel):
    name: str = Field(...)
    description: Optional[str]
    questions: List[QuestionModel] = []

    class Config:
        schema_extra = {
            "example": {}
        }


class ResponseModel:
    def __init__(self, data, message):
        self.data = [data]
        self.code = 200
        self.message = message

    def json(self):
        return {
            "data": [self.data],
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