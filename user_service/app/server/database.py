import motor.motor_asyncio
from bson import ObjectId

MONGO_URL = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client.ras

user_collection = database.get_collection("users")


def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "surname": user["surname"],
        "email": user["email"],
        "password": user["password"]
    }


async def list_users():
    users = []
    async for user in user_collection.find():
        users.append(user)
    return users


async def get_user(id: str) -> dict:
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)


async def add_user(data: dict) -> dict:
    user = await user_collection.insert_one(data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


async def update_user(id: str, data: dict):
    if len(data) < 1:
        return False
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user:
        updated_user = await user_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        if updated_user:
            return True
    return False


async def delete_user(id: str):
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        await user_collection.delete_one({"_id": ObjectId(id)})
        return True
    return False
