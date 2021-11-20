from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
database = client.ras

survey_collection = database.get_collection("surveys")
question_collection = database.get_collection("questions")
answer_collection = database.get_collection("answers")


def survey_helper(survey) -> dict:
    return {}


def question_helper(question) -> dict:
    return {}


def answer_helper(answer) -> dict:
    return {}


async def add_answer():
    pass


async def update_answer():
    pass


async def delete_answer():
    pass


async def add_question():
    pass


async def update_question():
    pass


async def delete_question():
    pass


async def list_surveys():
    surveys = []
    async for survey in survey_collection.find():
        surveys.append(survey)
    return surveys


async def get_survey(id: str) -> dict:
    survey = await survey_collection.find_one({"_id": ObjectId(id)})
    if survey:
        return survey_helper(survey)


async def add_survey(data: dict) -> dict:
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

