from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    list_users,
    get_user,
    add_user,
    update_user,
    delete_user
)

from server.models import (
    UserModel,
    UpdateUserModel,
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()


@router.get("/", response_description="Users retrieved")
async def list_users_data():
    users = await list_users()
    if users:
        return ResponseModel(users, "Users list returned")
    return ResponseModel(users, "Empty user list returned")


@router.get("/{id}", response_description="User retrieved")
async def get_user_data(id: str):
    user = await get_user(id)
    if user:
        return ResponseModel(user, "User returned")
    return ErrorResponseModel("An error occurred", 404, "User does not exist")


@router.post("/", response_description="User data added into the database")
async def add_user_data(user_data: UserModel = Body(...)):
    user = jsonable_encoder(user_data)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully")


@router.put("/{id}", response_description="User data updated")
async def update_user_data(id: str, req: UpdateUserModel = Body(...)):
    req = {x: y for x, y in req.dict().items() if y is not None}
    updated_user = await update_user(id, req)
    if updated_user:
        return ResponseModel(
            "User with ID: {} updated successfully".format(id),
            "User updated successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data"
    )


@router.delete("/{id}", response_description="User deleted from database")
async def delete_user_data(id: str):
    deleted_user = await delete_user(id)
    if deleted_user:
        return ResponseModel(
            "User with ID: {} deleted successfully".format(id),
            "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occured",
        404,
        "User with ID: {} does not exist".format(id)
    )

