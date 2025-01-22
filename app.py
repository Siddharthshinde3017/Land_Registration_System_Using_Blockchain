from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/land_management"
mongo = PyMongo(app)

# JWT Authentication Configuration
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# -------------------- USER AUTHENTICATION --------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if not data.get("username") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "All fields are required!"}), 400

    existing_user = mongo.db.users.find_one({"username": data["username"]})
    if existing_user:
        return jsonify({"message": "Username already exists"}), 409

    user = {
        "username": data["username"],
        "password": data["password"],  # In production, store hashed password
        "role": data["role"]
    }
    mongo.db.users.insert_one(user)
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = mongo.db.users.find_one({"username": data["username"]})

    if user and user["password"] == data["password"]:  # In production, use hashed passwords
        token = create_access_token(identity={"username": user["username"], "role": user["role"]})
        return jsonify({"token": token, "role": user["role"]}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# -------------------- LAND REGISTRATION --------------------

@app.route("/add_land", methods=["POST"])
@jwt_required()
def add_land():
    current_user = get_jwt_identity()
    if current_user["role"] != "seller":
        return jsonify({"message": "Only sellers can register lands"}), 403

    data = request.json
    land = {
        "owner": current_user["username"],
        "location": data["location"],
        "size": data["size"],
        "status": "Pending",
        "documents": data.get("documents", [])
    }
    mongo.db.lands.insert_one(land)
    return jsonify({"message": "Land registered successfully"}), 201

@app.route("/get_lands", methods=["GET"])
def get_lands():
    lands = list(mongo.db.lands.find({}, {"_id": 0}))
    return jsonify(lands), 200

# -------------------- LAND TRANSACTIONS --------------------

@app.route("/buy_land", methods=["POST"])
@jwt_required()
def buy_land():
    current_user = get_jwt_identity()
    if current_user["role"] != "buyer":
        return jsonify({"message": "Only buyers can purchase lands"}), 403

    data = request.json
    land = mongo.db.lands.find_one({"location": data["location"]})
    
    if not land:
        return jsonify({"message": "Land not found"}), 404

    mongo.db.transactions.insert_one({
        "buyer": current_user["username"],
        "seller": land["owner"],
        "land_id": land["location"],
        "status": "Completed"
    })

    mongo.db.lands.update_one({"location": data["location"]}, {"$set": {"owner": current_user["username"], "status": "Sold"}})

    return jsonify({"message": "Land purchased successfully"}), 200

# -------------------- DISPUTE MANAGEMENT --------------------

@app.route("/raise_dispute", methods=["POST"])
@jwt_required()
def raise_dispute():
    current_user = get_jwt_identity()
    data = request.json

    dispute = {
        "land_id": data["land_id"],
        "issue": data["issue"],
        "description": data["description"],
        "status": "Pending",
        "raised_by": current_user["username"]
    }

    mongo.db.disputes.insert_one(dispute)
    return jsonify({"message": "Dispute submitted"}), 201

@app.route("/resolve_dispute", methods=["POST"])
@jwt_required()
def resolve_dispute():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Only admins can resolve disputes"}), 403

    data = request.json
    mongo.db.disputes.update_one({"land_id": data["land_id"]}, {"$set": {"status": data["status"]}})
    return jsonify({"message": "Dispute status updated"}), 200

# -------------------- ADMIN FUNCTIONS --------------------

@app.route("/admin/approve_land", methods=["POST"])
@jwt_required()
def approve_land():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Only admins can approve lands"}), 403

    data = request.json
    mongo.db.lands.update_one({"location": data["location"]}, {"$set": {"status": "Approved"}})
    return jsonify({"message": "Land approved successfully"}), 200

# -------------------- START FLASK APP --------------------

if __name__ == "__main__":
    app.run(debug=True)
