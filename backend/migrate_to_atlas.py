
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(override=True)

# Connect to both databases
local = MongoClient("mongodb://localhost:27017/")
atlas = MongoClient(os.getenv("MONGO_URI"))

local_db = local["aroma_coffee"]
atlas_db = atlas["aroma_coffee"]

# Read existing records
orders = list(local_db["orders"].find())
reviews = list(local_db["reviews"].find())

# Check Atlas before copying
if atlas_db["orders"].count_documents({}) != 0:
    print("Atlas orders are not empty. Stopping safely.")
elif atlas_db["reviews"].count_documents({}) != 0:
    print("Atlas reviews are not empty. Stopping safely.")
else:
    if orders:
        atlas_db["orders"].insert_many(orders)

    if reviews:
        atlas_db["reviews"].insert_many(reviews)

    print("Migration completed!")
    print("Orders copied:", len(orders))
    print("Reviews copied:", len(reviews))

local.close()
atlas.close()
