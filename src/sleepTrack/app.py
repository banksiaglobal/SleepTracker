from fastapi import FastAPI
from . import api
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title='Sheep’s Galaxy',
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
    return {'message': 'Sheep’s Galaxy'}
