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


answer_schema_example = {
    "survey_id": str(ObjectId()),
    "section_id": str(ObjectId()),
    "question_id": str(ObjectId()),
    "title": "Test answer"
}


questions_schema_example = {
    "survey_id": str(ObjectId()),
    "section_id": str(ObjectId()),
    "title": "Test question",
    "description": "First question of the survey",
    "question_type": "SINGLE_CHOICE",
    "answers": [
        answer_schema_example,
        answer_schema_example
    ]
}


section_schema_example = {
    "survey_id": str(ObjectId()),
    "name": "Test section",
    "description": "First section of the survey",
    "questions": [
        questions_schema_example
    ]
}


survey_schema_example = {
    "example": {
        "name": "Survey",
        "description": "Example survey",
        "sections": [
            section_schema_example
        ]
    }
}


class AnswerModel(BaseModel):
    survey_id: str = ""
    section_id: str = ""
    question_id: str = ""
    title: str = Field(...)

    class Config:
        schema_extra = answer_schema_example


class QuestionModel(BaseModel):
    survey_id: str = ""
    section_id: str = ""
    title: str = Field(...)
    description: Optional[str]
    question_type: QuestionType = Field(...)
    answers: List[AnswerModel] = []

    class Config:
        schema_extra = questions_schema_example


class SectionModel(BaseModel):
    survey_id: str = ""
    name: str = Field(...)
    description: Optional[str]
    questions: List[QuestionModel] = []

    class Config:
        schema_extra = section_schema_example


class SurveyModel(BaseModel):
    name: str = Field(...)
    description: Optional[str]
    sections: List[SectionModel] = []

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
