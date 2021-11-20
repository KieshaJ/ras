from fastapi import FastAPI
from server.routes import router as UserRouter

app = FastAPI()

app.include_router(UserRouter, tags=["Users"], prefix="/users")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
