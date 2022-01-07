from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
database = client.ras

company_collection = database.get_collection("companies")


async def company_helper(company: dict) -> dict:
    return {
        "id": str(company["_id"]),
        "name": company["name"],
        "ownerId": company["ownerId"],
        "workerIds": company["workerIds"]
    }


async def get_company(company_id: str) -> dict:
    company = await company_collection.find_one({"_id": ObjectId(company_id)})
    if company:
        return await company_helper(company)


async def add_company(company_data: dict) -> dict:
    company = await company_collection.insert_one(company_data)
    new_company = await company_collection.find_one({"_id": company.inserted_id})
    return await company_helper(new_company)


async def update_company(company_id: str, company_data: dict):
    if len(company_data) < 1:
        return False
    company = await company_collection.find_one({"_id": ObjectId(company_id)})
    if company:
        updated_company = await company_collection.update_one(
            {"_id": ObjectId(company_id)},
            {"$set": company_data}
        )
        if updated_company:
            return True
    return False


async def delete_company(company_id: str):
    company = await company_collection.find_one({"_id": ObjectId(company_id)})
    if company:
        await company_collection.delete_one({"_id": ObjectId(company_id)})
        return True
    return False
