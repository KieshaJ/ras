from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
import requests

from .database import (
    list_users,
    get_user,
    get_user_by_email,
    verify_password,
    create_token,
    add_user,
    update_user,
    delete_user
)

from .models import (
    UserModel,
    UpdateUserModel,
    LoginModel,
    TokenData,
    Token,
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()
company_service_url = "http://localhost:8020/api/companies"


@router.post("/register", response_description="User registered")
async def register(user_data: UserModel = Body(...)):
    user = jsonable_encoder(user_data)

    email = user["email"]
    role = user["role"]
    company_data = None

    if user["company"]:
        company_data = user["company"]

    del user["company"]

    existing_user = await get_user_by_email(email)

    if not existing_user:
        new_user = await add_user(user)
        if role == 1:
            company_data["ownerId"] = str(new_user["id"])
            requests.post(company_service_url, json=company_data)

        return ResponseModel(new_user, "User added successfully")
    else:
        return ErrorResponseModel(
            "An error occurred",
            403,
            "User with such email already exists"
        )


@router.post("/login", response_description="User logged in")
async def login(login_data: LoginModel = Body(...)):
    user = await get_user_by_email(login_data.email)
    if user and verify_password(login_data.password, user["password"]):
        user_data = TokenData(
            user["id"],
            user["name"],
            user["surname"],
            user["email"],
            user["role"],
        )
        token = Token(
            create_token(user),
            user_data
        )
        response = ResponseModel(
            token,
            "Logged in successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occurred",
            401,
            "Invalid email or password"
        )
    return response.json()


@router.get("/", response_description="Users retrieved")
async def list_users_data():
    users = await list_users()
    if users:
        return ResponseModel(users, "Users list returned")
    return ResponseModel(users, "Empty user list returned")


@router.get("/{id}", response_description="User retrieved")
async def get_user_data(user_id: str):
    user = await get_user(user_id)
    if user:
        return ResponseModel(user, "User returned")
    return ErrorResponseModel("An error occurred", 404, "User does not exist")


# @router.post("/", response_description="User data added into the database")
# async def add_user_data(user_data: UserModel = Body(...)):
#     user = jsonable_encoder(user_data)
#     new_user = await add_user(user)
#     return ResponseModel(new_user, "User added successfully")


@router.put("/{id}", response_description="User data updated")
async def update_user_data(user_id: str, req: UpdateUserModel = Body(...)):
    req = {x: y for x, y in req.dict().items() if y is not None}
    updated_user = await update_user(user_id, req)
    if updated_user:
        return ResponseModel(
            "User with ID: {} updated successfully".format(user_id),
            "User updated successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data"
    )


@router.delete("/{id}", response_description="User deleted from database")
async def delete_user_data(user_id: str):
    deleted_user = await delete_user(user_id)
    if deleted_user:
        return ResponseModel(
            "User with ID: {} deleted successfully".format(user_id),
            "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "User with ID: {} does not exist".format(user_id)
    )
