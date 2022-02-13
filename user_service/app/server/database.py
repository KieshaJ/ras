from datetime import timedelta, datetime

import motor.motor_asyncio
from bson import ObjectId
from jose import jwt
from passlib.context import CryptContext

MONGO_URL = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client.ras

user_collection = database.get_collection("users")


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_context.hash(password)


def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"expires_at": expire.isoformat()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "surname": user["surname"],
        "email": user["email"],
        "password": user["password"],
        "role": user["role"]
    }


async def list_users():
    users = []
    async for user in user_collection.find():
        users.append(user)
    return users


async def get_user(user_id: str) -> dict:
    user = await user_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return user_helper(user)


async def get_user_by_email(email: str) -> dict:
    user = await user_collection.find_one({"email": email})
    if user:
        return user_helper(user)


async def add_user(data: dict) -> dict:
    hashed_password = get_password_hash(data["password"])
    data["password"] = hashed_password

    user = await user_collection.insert_one(data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


async def update_user(user_id: str, user_data: dict):
    if len(user_data) < 1:
        return False
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        updated_user = await user_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": user_data}
        )
        if updated_user:
            return True
    return False


async def delete_user(user_id: str):
    user = await user_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        await user_collection.delete_one({"_id": ObjectId(user_id)})
        return True
    return False
