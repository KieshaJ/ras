from typing import List, Optional, Literal

from bson import ObjectId
from pydantic import BaseModel, Field


QuestionType = Literal[
    "SINGLE_CHOICE",
    "MULTI_CHOICE",
    "BOOLEAN",
    "NUMBER",
    "PERCENTAGE",
    "TEXT"
]

survey_schema_example = {
    "example": {
        "name": "Survey 1",
        "description": "Example survey",
        "questions": [
            {
                "survey_id": str(ObjectId()),
                "title": "Test question 1",
                "description": "First question of the survey",
                "question_type": "SINGLE_CHOICE",
                "answers": [
                    {
                        "survey_id": str(ObjectId()),
                        "question_id": str(ObjectId()),
                        "title": "Test answer 1"
                    },
                    {
                        "survey_id": str(ObjectId()),
                        "question_id": str(ObjectId()),
                        "title": "Test answer 2"
                    }
                ]
            }
        ]
    }
}


class AnswerModel(BaseModel):
    survey_id: str
    question_id: str
    title: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "survey_id": str(ObjectId()),
                "question_id": str(ObjectId()),
                "title": "Test answer 1"
            }
        }


class QuestionModel(BaseModel):
    survey_id: str
    title: str = Field(...)
    description: Optional[str]
    question_type: QuestionType = Field(...)
    answers: List[AnswerModel] = []

    class Config:
        schema_extra = {
            "example": {
                "survey_id": str(ObjectId()),
                "title": "Test question 1",
                "description": "First question of the survey",
                "question_type": "SINGLE_CHOICE",
                "answers": [
                    {
                        "survey_id": str(ObjectId()),
                        "question_id": str(ObjectId()),
                        "title": "Test answer 1"
                    },
                    {
                        "survey_id": str(ObjectId()),
                        "question_id": str(ObjectId()),
                        "title": "Test answer 2"
                    }
                ]
            }
        }


class SurveyModel(BaseModel):
    name: str = Field(...)
    description: Optional[str]
    questions: List[QuestionModel] = []

    class Config:
        odm_mode = True
        arbitrary_types_allowed = True
        allow_population_by_field_name = True
        schema_extra = survey_schema_example


class UpdateSurveyModel(BaseModel):
    name: Optional[str]
    description: Optional[str]
    questions: Optional[List[QuestionModel]]

    class Config:
        schema_extra = survey_schema_example


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
