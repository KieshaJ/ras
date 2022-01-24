from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse

from server.database import (
    list_surveys,
    get_survey,
    add_survey,
    update_survey,
    delete_survey,
    update_survey_statistic,
    update_answer_statistic
)

from server.models import (
    SurveyModel,
    UpdateSurveyModel,
    SurveySubmitModel,
    ResponseModel,
    ErrorResponseModel
)

from server.statistics_utils import (
    create_pdf
)

router = APIRouter()


@router.get("/download/{survey_id}", response_description="Survey report generated")
async def download_survey_report(survey_id: str):
    survey = await get_survey(survey_id)
    await create_pdf(survey)
    # response = ResponseModel(True, "Survey report returned")
    # return response.json()
    return FileResponse(
        path="reports/test.pdf",
        media_type="application/octet-stream",
        filename="test.pdf"
    )


@router.get("/", response_description="Surveys retrieved")
async def list_survey_data():
    surveys = await list_surveys()
    if surveys:
        response = ResponseModel(surveys, "Survey list returned")
    else:
        response = ResponseModel(surveys, "Empty user list returned")
    return response.json()


@router.get("/{id}", response_description="Survey retrieved")
async def get_survey_data(id: str):
    survey = await get_survey(id)
    if survey:
        response = ResponseModel(survey, "Survey returned")
    else:
        response = ErrorResponseModel(
            "An error occurred",
            404,
            "Survey with ID: {} does not exist".format(id)
        )
    return response.json()


@router.post("/", response_description="Survey data added into the database")
async def add_survey_data(survey_data: SurveyModel = Body(...)):
    survey = jsonable_encoder(survey_data)
    new_survey = await add_survey(survey)
    response = ResponseModel(new_survey, "Survey added successfully")
    return response.json()


@router.put("/{id}", response_description="Survey data updated")
async def update_survey_data(id: str, req: UpdateSurveyModel = Body(...)):
    req = {x: y for x, y in req.dict().items() if y is not None}
    updated_survey = await update_survey(id, req)
    if updated_survey:
        response = ResponseModel(
            "Survey with ID: {} updated successfully".format(id),
            "Survey updated successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occured",
            404,
            "There was an error updating the survey data"
        )
    return response.json()


@router.delete("/{id}", response_description="Survey deleted from database")
async def delete_survey_data(id: str):
    deleted_survey = await delete_survey(id)
    if deleted_survey:
        response = ResponseModel(
            "Survey with ID: {} deleted successfully".format(id),
            "Survey deleted successfully"
        )
    else:
        response = ErrorResponseModel(
            "An error occured",
            404,
            "Survey with ID: {} does not exist".format(id)
        )
    return response.json()


@router.post("/submit/{survey_id}", response_description="Survey submitted")
async def submit_survey(survey_id: str, data: SurveySubmitModel = Body(...)):
    await update_survey_statistic(survey_id)
    for a in data.answer_ids:
        await update_answer_statistic(a)
    response = ResponseModel(
        "Survey with ID: {} submitted successfully".format(survey_id),
        "Survey submitted successfully"
    )
    return response.json()

