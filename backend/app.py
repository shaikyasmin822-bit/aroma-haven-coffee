
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime, timezone

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True

CORS(
    app,
    origins=["https://aroma-haven-coffee-1.onrender.com"],
    supports_credentials=True
)

# MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI is missing from backend/.env")

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=10000
)

db = client["aroma_coffee"]

orders_collection = db["orders"]
reviews_collection = db["reviews"]


# Coffee menu and prices
menu = {
    "Espresso": 120,
    "Cappuccino": 170,
    "Café Latte": 180,
    "Cold Brew": 190,
    "Mocha": 220,
    "Chocolate Brownie": 160
}


@app.route("/")
def home():
    return jsonify({
        "message": "Aroma Coffee Backend is Running!"
    })


# Test MongoDB connection
@app.route("/test-db")
def test_db():
    try:
        client.admin.command("ping")

        return jsonify({
            "message": "MongoDB Connected Successfully!"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Receive customer orders
@app.route("/api/orders", methods=["POST"])
def place_order():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid order data"}), 400

        name = data.get("name", "").strip()
        phone = data.get("phone", "").strip()
        product = data.get("product", "").strip()
        quantity = data.get("quantity")

        if not name or not phone or not product or quantity is None:
            return jsonify({"error": "Please fill all fields"}), 400

        if not phone.isdigit() or len(phone) != 10:
            return jsonify({"error": "Enter a valid 10-digit phone number"}), 400

        if product not in menu:
            return jsonify({"error": "Invalid coffee product"}), 400

        if (
            isinstance(quantity, bool)
            or not isinstance(quantity, int)
            or quantity < 1
            or quantity > 20
        ):
            return jsonify({"error": "Quantity must be between 1 and 20"}), 400

        price = menu[product]
        total = price * quantity

        order = {
            "name": name,
            "phone": phone,
            "product": product,
            "price": price,
            "quantity": quantity,
            "total": total,
            "created_at": datetime.now(timezone.utc)
        }

        result = orders_collection.insert_one(order)

        return jsonify({
            "message": "Your order was placed successfully!",
            "order_id": str(result.inserted_id),
            "total": total
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Customer reviews API
@app.route("/api/reviews", methods=["POST"])
def add_review():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid review data"}), 400

        name = data.get("name", "").strip()
        emoji = data.get("emoji", "").strip()
        review = data.get("review", "").strip()
        rating = data.get("rating")

        if not name or not review or rating is None:
            return jsonify({"error": "Please fill all required fields"}), 400

        try:
            rating = int(rating)
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid rating"}), 400

        if rating < 1 or rating > 5:
            return jsonify({"error": "Rating must be between 1 and 5"}), 400

        review_data = {
            "name": name,
            "emoji": emoji,
            "rating": rating,
            "review": review,
            "created_at": datetime.now(timezone.utc)
        }

        reviews_collection.insert_one(review_data)

        return jsonify({
            "message": "Thank you! Your review was submitted successfully."
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Admin dashboard - fetch orders
@app.route("/api/orders", methods=["GET"])
def get_orders():

    if not session.get("admin_logged_in"):
        return jsonify({"error": "Admin login required"}), 401

    try:
        orders = list(
            orders_collection.find().sort("created_at", -1)
        )

        for order in orders:
            order["_id"] = str(order["_id"])

            if "created_at" in order:
                order["created_at"] = order["created_at"].isoformat()

        return jsonify(orders)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Admin dashboard - fetch reviews
@app.route("/api/reviews", methods=["GET"])
def get_reviews():

    if not session.get("admin_logged_in"):
        return jsonify({"error": "Admin login required"}), 401

    try:
        reviews = list(
            reviews_collection.find().sort("created_at", -1)
        )

        for review in reviews:
            review["_id"] = str(review["_id"])

            if "created_at" in review:
                review["created_at"] = review["created_at"].isoformat()

        return jsonify(reviews)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Admin login
@app.route("/api/admin/login", methods=["POST"])
def admin_login():

    data = request.get_json() or {}

    username = data.get("username", "")
    password = data.get("password", "")

    if (
        username == os.getenv("ADMIN_USERNAME")
        and password == os.getenv("ADMIN_PASSWORD")
    ):
        session["admin_logged_in"] = True

        return jsonify({"message": "Login successful!"})

    return jsonify({"error": "Invalid username or password"}), 401


# Check admin session
@app.route("/api/admin/check", methods=["GET"])
def check_admin():

    if session.get("admin_logged_in"):
        return jsonify({"logged_in": True})

    return jsonify({"logged_in": False}), 401


# Admin logout
@app.route("/api/admin/logout", methods=["POST"])
def admin_logout():

    session.clear()

    return jsonify({"message": "Logged out successfully"})


if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)
