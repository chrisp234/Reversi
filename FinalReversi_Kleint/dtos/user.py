from fastapi import FastAPI
from pydantic import BaseModel

class UserCredentials(BaseModel):
    username: str
    password: str

class RecipientPerson(BaseModel):
    username: str

