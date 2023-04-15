from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware  не работает
from . import api
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.cors import CORSMiddleware
app = FastAPI(
    title='SleepTracker',
    version='1.0.0'
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api.router)

@app.get("/")
def root():
    return {'message':'Hello sleep'}

