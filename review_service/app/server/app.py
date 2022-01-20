from fastapi import FastAPI
from server.routes import router as ReviewRouter

app = FastAPI()

app.include_router(ReviewRouter, tags=["Companies"], prefix="/api/reviews")
