from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId, DBRef

MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
database = client.ras

survey_collection = database.get_collection("surveys")
section_collection = database.get_collection("sections")
question_collection = database.get_collection("questions")
answer_collection = database.get_collection("answers")

survey_statistics_collection = database.get_collection("survey_statistics")
answer_statistics_collection = database.get_collection("answer_statistics")


async def survey_helper(survey: dict) -> dict:
    sections = []
    for s in survey["sections"]:
        sections_doc = await database.dereference(s)
        sections.append(await section_helper(sections_doc))

    return {
        "id": str(survey["_id"]),
        "company_id": survey["company_id"],
        "name": survey["name"],
        "description": survey["description"],
        "sections": sections,
        "active": survey["active"]
    }


async def section_helper(section: dict) -> dict:
    questions = []
    for q in section["questions"]:
        question_doc = await database.dereference(q)
        questions.append(await question_helper(question_doc))

    return {
        "id": str(section["_id"]),
        "name": section["name"],
        "description": section["description"],
        "questions": questions
    }


async def question_helper(question) -> dict:
    answers = []
    for a in question["answers"]:
        answer_doc = await database.dereference(a)
        answers.append(answer_helper(answer_doc))

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


async def add_answers(answer_data: dict) -> list[dict]:
    new_answers = []
    for a in answer_data:
        answer = await answer_collection.insert_one(a)
        saved_answer = await answer_collection.find_one({"_id": answer.inserted_id})
        await add_answer_statistic(str(saved_answer["_id"]))
        new_answers.append(saved_answer)

    return new_answers


async def update_answer():
    pass


async def delete_answer():
    pass


async def add_questions(question_data: dict) -> list[dict]:
    new_questions = []
    for q in question_data:
        answer_refs = []
        answers = await add_answers(q["answers"])
        for a in answers:
            answer_refs.append(DBRef("answers", id=ObjectId(str(a["_id"]))))

        q["answers"] = answer_refs

        question = await question_collection.insert_one(q)
        saved_question = await question_collection.find_one({"_id": question.inserted_id})
        new_questions.append(saved_question)

    return new_questions


async def update_question():
    pass


async def delete_question():
    pass


async def add_sections(section_data: dict) -> list[dict]:
    new_sections = []
    for s in section_data:
        question_refs = []
        questions = await add_questions(s["questions"])
        for q in questions:
            question_refs.append(DBRef(collection="questions", id=ObjectId(str(q["_id"]))))

        s["questions"] = question_refs

        section = await section_collection.insert_one(s)
        saved_section = await section_collection.find_one({"_id": section.inserted_id})
        new_sections.append(saved_section)

    return new_sections


async def update_section(section_data: dict):
    pass


async def delete_section():
    pass


async def list_surveys():
    surveys = []
    async for survey in survey_collection.find():
        surveys.append(await survey_helper(survey))
    return surveys


async def get_survey(survey_id: str) -> dict:
    survey = await survey_collection.find_one({"_id": ObjectId(survey_id)})
    if survey:
        return await survey_helper(survey)


async def add_survey(survey_data: dict) -> dict:
    sections = await add_sections(survey_data["sections"])
    section_refs = []
    for s in sections:
        section_refs.append(DBRef(collection="sections", id=ObjectId(str(s["_id"]))))

    survey_data["sections"] = section_refs
    survey_with_refs = survey_data
    survey_with_refs["sections"] = section_refs

    survey = await survey_collection.insert_one(survey_with_refs)
    new_survey = await survey_collection.find_one({"_id": survey.inserted_id})
    await add_survey_statistic(str(new_survey["_id"]))
    return await survey_helper(new_survey)


async def update_survey(survey_id: str, data: dict) -> bool:
    if len(data) < 1:
        return False
    survey = survey_collection.find_one({"_id": ObjectId(survey_id)})
    if survey:
        updated_survey = await survey_collection.update_one(
            {"_id": ObjectId(survey_id)},
            {"$set": data}
        )
        if updated_survey:
            return True
    return False


async def delete_survey(survey_id: str):
    survey = await survey_collection.find_one({"_id": ObjectId(survey_id)})
    if survey:
        await survey_collection.delete_one({"_id": ObjectId(survey_id)})
        return True
    return False


async def add_survey_statistic(survey_id: str):
    statistic = {
        "survey_id": survey_id,
        "submitted": 0
    }
    await survey_statistics_collection.insert_one(statistic)


async def update_survey_statistic(survey_id: str) -> bool:
    statistic = await survey_statistics_collection.find_one({"survey_id": survey_id})
    statistic["submitted"] += 1
    updated_statistic = await survey_statistics_collection.update_one(
        {"survey_id": survey_id},
        {"$set": statistic}
    )
    if updated_statistic:
        return True
    return False


async def get_survey_statistic(survey_id: str) -> dict:
    statistic = await survey_statistics_collection.find_one({"survey_id": survey_id})
    return {
        "survey_id": statistic["survey_id"],
        "submitted": statistic["submitted"]
    }


async def add_answer_statistic(answer_id: str):
    statistic = {
        "answer_id": answer_id,
        "submitted": 0
    }
    await answer_statistics_collection.insert_one(statistic)


async def update_answer_statistic(answer_id: str) -> bool:
    statistic = await answer_statistics_collection.find_one({"answer_id": answer_id})
    statistic["submitted"] += 1
    updated_statistic = await answer_statistics_collection.update_one(
        {"answer_id": answer_id},
        {"$set": statistic}
    )
    if updated_statistic:
        return True
    return False


async def get_answer_statistic(answer_id: str) -> dict:
    statistic = await answer_statistics_collection.find_one({"answer_id": answer_id})
    return {
        "answer_id": statistic["answer_id"],
        "submitted": statistic["submitted"]
    }
