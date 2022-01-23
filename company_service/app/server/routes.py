from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    list_companies,
    add_company,
    update_company,
    get_company,
    delete_company
)

from server.models import (
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


@router.get("/{id}", response_description="Company retrieved")
async def get_company_data(id: str):
    company = await get_company(id)
    if company:
        response = ResponseModel(company, "Company returned")
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "Company with ID: {} does not exist".format(id)
        )
    return response.json()


@router.post("/", response_description="Company data added into the database")
async def add_company_data(company_data: CompanyModel = Body(...)):
    company = jsonable_encoder(company_data)
    new_company = await add_company(company)
    response = ResponseModel(new_company, "Company added successfully")
    return response.json()


@router.put("/{id}", response_description="Company data updated")
async def update_comapny_data(id: str, company_data: UpdateCompanyModel = Body(...)):
    req = {x: y for x, y in company_data.dict().items() if y is not None}
    updated_company = await update_company(id, req)
    if updated_company:
        response = ResponseModel(
            "Company with ID: {} updated successfully".format(id),
            "Company updated successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occured",
            404,
            "There was an error updating the company data"
        )
    return response.json()


@router.delete("/{id}", response_description="Company deleted from database")
async def delete_company_data(id: str):
    deleted_company = await delete_company(id)
    if deleted_company:
        response = ResponseModel(
            "Company with ID: {} deleted successfully".format(id),
            "Company deleted successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occured",
            404,
            "Company with ID: {} does not exist".format(id)
        )
    return response.json()
