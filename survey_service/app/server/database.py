import logging

from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId, DBRef

MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
database = client.ras

survey_collection = database.get_collection("surveys")
question_collection = database.get_collection("questions")
answer_collection = database.get_collection("answers")


def survey_helper(survey) -> dict:
    questions = []
    for q in survey["questions"]:
        questions.append(question_helper(q))

    return {
        "id": str(survey["_id"]),
        "name": str(survey["name"]),
        "description": str(survey["description"]),
        "questions": questions
    }


def question_helper(question) -> dict:
    answers = []
    for a in question["answers"]:
        answers.append(answer_helper(a))

    return {
        "id": str(question["_id"]),
        "survey_id": question["survey_id"],
        "title": question["title"],
        "description": question["description"],
        "question_type": question["question_type"],
        "answers": answers
    }


def answer_helper(answer) -> dict:
    return {
        "id": str(answer["_id"]),
        "survey_id": answer["survey_id"],
        "question_id": answer["question_id"],
        "title": answer["title"]
    }


async def add_answers(data: dict) -> list[dict]:
    new_answers = []
    for a in data:
        answer = await answer_collection.insert_one(a)
        saved_answer = await answer_collection.find_one({"_id": answer.inserted_id})
        new_answers.append(answer_helper(saved_answer))

    return new_answers


async def update_answer():
    pass


async def delete_answer():
    pass


async def add_questions(data: dict) -> list[dict]:
    new_questions = []
    for q in data:
        answers = await add_answers(q["answers"])
        answer_refs = []
        for a in answers:
            answer_refs.append(DBRef(collection="answers", id=ObjectId(str(a["id"]))))

        # data["answers"] = answer_refs

        question = await question_collection.insert_one(q)
        saved_question = await question_collection.find_one({"_id": question.inserted_id})
        new_questions.append(question_helper(saved_question))

    return new_questions


async def update_question():
    pass


async def delete_question():
    pass


async def list_surveys():
    surveys = []
    async for survey in survey_collection.find():
        surveys.append(survey_helper(survey))
    return surveys


async def get_survey(id: str) -> dict:
    survey = await survey_collection.find_one({"_id": ObjectId(id)})
    if survey:
        return survey_helper(survey)


async def add_survey(data: dict) -> dict:
    questions = await add_questions(data["questions"])
    question_refs = []
    for q in questions:
        question_refs.append(DBRef(collection="questions", id=ObjectId(str(q["id"]))))

    # data["questions"] = question_refs

    survey = await survey_collection.insert_one(data)
    new_survey = await survey_collection.find_one({"_id": survey.inserted_id})
    return survey_helper(new_survey)


async def update_survey(id: str, data: dict):
    if len(data) < 1:
        return False
    survey = survey_collection.find_one({"_id": ObjectId(id)})
    if survey:
        updated_survey = await survey_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        if updated_survey:
            return True
    return False


async def delete_survey(id: str):
    survey = await survey_collection.find_one({"_id": ObjectId(id)})
    if survey:
        await survey_collection.delete_one({"_id": ObjectId(id)})
        return True
    return False
