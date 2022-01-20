from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_review,
    update_review,
    get_review,
    delete_review
)

from server.models import (
    ReviewModel,
    UpdateReviewModel,
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()


@router.get("/{id}", response_description="Review retrieved")
async def get_review_data(id: str):
    review = await get_review(id)
    if review:
        response = ResponseModel(review, "Review returned")
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "Review with ID: {} does not exist".format(id)
        )
    return response.json()


@router.post("/", response_description="Review data added into the database")
async def add_review_data(review_data: ReviewModel = Body(...)):
    review = jsonable_encoder(review_data)
    new_review = await add_review(review)
    response = ResponseModel(new_review, "Review added successfully")
    return response.json()


@router.put("/{id}", response_description="Review data updated")
async def update_comapny_data(id: str, review_data: UpdateReviewModel = Body(...)):
    req = {x: y for x, y in review_data.dict().items() if y is not None}
    updated_review = await update_review(id, req)
    if updated_review:
        response = ResponseModel(
            "Review with ID: {} updated successfully".format(id),
            "Review updated successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occured",
            404,
            "There was an error updating the review data"
        )
    return response.json()


@router.delete("/{id}", response_description="Review deleted from database")
async def delete_review_data(id: str):
    deleted_review = await delete_review(id)
    if deleted_review:
        response = ResponseModel(
            "Review with ID: {} deleted successfully".format(id),
            "Review deleted successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occured",
            404,
            "Review with ID: {} does not exist".format(id)
        )
    return response.json()
