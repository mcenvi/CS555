from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from typing import Generator
import os

# MongoDB connection string {make user name and pwd are variables}
MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017/")

async def get_db_async():
    client = AsyncIOMotorClient(MONGO_DETAILS)
    try:
        db = client["CS555"]
        yield db
    finally:
        client.close()
