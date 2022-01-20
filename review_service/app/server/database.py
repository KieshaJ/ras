from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
database = client.ras

review_collection = database.get_collection("reviews")


async def review_helper(review: dict) -> dict:
    return {
        "id": str(review["_id"]),
        "companyId": review["companyId"],
        "content": review["content"],
        "rating": review["rating"]
    }


async def get_review(review_id: str) -> dict:
    review = await review_collection.find_one({"_id": ObjectId(review_id)})
    if review:
        return await review_helper(review)


async def add_review(review_data: dict) -> dict:
    review = await review_collection.insert_one(review_data)
    new_review = await review_collection.find_one({"_id": review.inserted_id})
    return await review_helper(new_review)


async def update_review(review_id: str, review_data: dict):
    if len(review_data) < 1:
        return False
    review = await review_collection.find_one({"_id": ObjectId(review_id)})
    if review:
        updated_review = await review_collection.update_one(
            {"_id": ObjectId(review_id)},
            {"$set": review_data}
        )
        if updated_review:
            return True
    return False


async def delete_review(review_id: str):
    review = await review_collection.find_one({"_id": ObjectId(review_id)})
    if review:
        await review_collection.delete_one({"_id": ObjectId(review_id)})
        return True
    return False
