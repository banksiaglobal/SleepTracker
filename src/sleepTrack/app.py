from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .settings import settings as set 

from . import api

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# для теста, можно удалить!
@app.get("/")
def root():
    return {'message':"Hello world!"}



app = FastAPI(
    title='SleepTracker',
    version='1.0.0',
    # openapi_tags=tags_metadata,
)

app.include_router(api.router)

