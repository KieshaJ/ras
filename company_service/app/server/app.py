from fastapi import FastAPI
from server.routes import router as CompanyRouter

app = FastAPI()

app.include_router(CompanyRouter, tags=["Companies"], prefix="/api/companies")