from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/land_management"
mongo = PyMongo(app)

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# -------------------- USER LOGIN & REGISTRATION --------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if not data.get("username") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "All fields are required!"}), 400

    existing_user = mongo.db.users.find_one({"username": data["username"]})
    if existing_user:
        return jsonify({"message": "Username already exists"}), 409

    hashed_password = generate_password_hash(data["password"])  # Hash the password
    user = {
        "username": data["username"],
        "password": hashed_password,
        "email": data.get("email", ""),
        "phone": data.get("phone", ""),
        "role": data["role"],
        "joined_date": data.get("joined_date", "2024-01-01")
    }
    mongo.db.users.insert_one(user)
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = mongo.db.users.find_one({"username": data["username"]})

    if user and check_password_hash(user["password"], data["password"]):  
        token = create_access_token(identity={"username": user["username"], "role": user["role"]})
        return jsonify({"token": token, "role": user["role"]}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# -------------------- FETCH BUYER PROFILE --------------------

@app.route("/buyer/profile", methods=["GET"])
@jwt_required()
def get_buyer_profile():
    current_user = get_jwt_identity()
    user = mongo.db.users.find_one({"username": current_user["username"]}, {"_id": 0, "password": 0})  

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user), 200

# -------------------- UPDATE BUYER PROFILE --------------------

@app.route("/buyer/update", methods=["POST"])
@jwt_required()
def update_buyer_profile():
    current_user = get_jwt_identity()
    data = request.json

    update_fields = {}
    if "email" in data:
        update_fields["email"] = data["email"]
    if "phone" in data:
        update_fields["phone"] = data["phone"]

    mongo.db.users.update_one({"username": current_user["username"]}, {"$set": update_fields})
    return jsonify({"message": "Profile updated successfully"}), 200

# -------------------- CHANGE PASSWORD --------------------

@app.route("/buyer/change-password", methods=["POST"])
@jwt_required()
def change_password():
    current_user = get_jwt_identity()
    data = request.json
    user = mongo.db.users.find_one({"username": current_user["username"]})

    if not check_password_hash(user["password"], data["old_password"]):
        return jsonify({"message": "Incorrect old password"}), 401

    hashed_password = generate_password_hash(data["new_password"])
    mongo.db.users.update_one({"username": current_user["username"]}, {"$set": {"password": hashed_password}})

    return jsonify({"message": "Password changed successfully"}), 200

# -------------------- DELETE ACCOUNT --------------------

@app.route("/buyer/delete-account", methods=["DELETE"])
@jwt_required()
def delete_account():
    current_user = get_jwt_identity()
    mongo.db.users.delete_one({"username": current_user["username"]})
    return jsonify({"message": "Account deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
