from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import api
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI()


origins = ["*"]
app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI(
    title='SleepTracker',
    version='1.0.0',
)

app.include_router(api.router)
