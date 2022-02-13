from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from .database import (
    list_companies,
    add_company,
    update_company,
    get_company,
    get_company_by_user,
    delete_company
)

from .models import (
    CompanyModel,
    UpdateCompanyModel,
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()


@router.get("/", response_description="Company list retrieved")
async def get_company_data_list():
    company_list = await list_companies()
    response = ResponseModel(company_list, "Company list returned")
    return response.json()


@router.get("/{company_id}", response_description="Company retrieved")
async def get_company_data(company_id: str):
    company = await get_company(company_id)
    if company:
        response = ResponseModel(company, "Company returned")
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "Company with ID: {} does not exist".format(company_id)
        )
    return response.json()


@router.get("/user/{user_id}", response_description="Company retrieved")
async def get_company_data_by_user(user_id: str):
    company = await get_company_by_user(user_id)
    if company:
        response = ResponseModel(company, "Company returned")
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "User not associated with any company"
        )
    return response.json()


@router.post("/", response_description="Company data added into the database")
async def add_company_data(company_data: CompanyModel = Body(...)):
    company = jsonable_encoder(company_data)
    new_company = await add_company(company)
    response = ResponseModel(new_company, "Company added successfully")
    return response.json()


@router.put("/{company_id}", response_description="Company data updated")
async def update_company_data(company_id: str, company_data: UpdateCompanyModel = Body(...)):
    req = {x: y for x, y in company_data.dict().items() if y is not None}
    updated_company = await update_company(company_id, req)
    if updated_company:
        response = ResponseModel(
            "Company with ID: {} updated successfully".format(company_id),
            "Company updated successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "There was an error updating the company data"
        )
    return response.json()


@router.delete("/{company_id}", response_description="Company deleted from database")
async def delete_company_data(company_id: str):
    deleted_company = await delete_company(company_id)
    if deleted_company:
        response = ResponseModel(
            "Company with ID: {} deleted successfully".format(company_id),
            "Company deleted successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "Company with ID: {} does not exist".format(id)
        )
    return response.json()
