from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from src.config import Config

client = MongoClient(Config.MONGO_URI)
db = client['learn_and_quiz']
quizzes_collection = db['quizzes']

quizzes_bp = Blueprint('quizzes', __name__)

# Helper function to serialize MongoDB ObjectId


def serialize_quiz(quiz):
    quiz['_id'] = str(quiz['_id'])
    return quiz


@quizzes_bp.route('/', methods=['POST'])
def create_quiz():
    try:
        data = request.json
        # Ensure the required fields are present
        if 'question' not in data or 'options' not in data or 'answer' not in data:
            return jsonify({'msg': 'Invalid data format. Must include question, options, and answer.'}), 400

        quizzes_collection.insert_one(data)
        return jsonify({'msg': 'Quiz question created successfully!'}), 201
    except Exception as e:
        return jsonify({'msg': 'Error creating quiz question', 'error': str(e)}), 500


@quizzes_bp.route('/')
def get_quizzes():
    quizzes = list(quizzes_collection.find())
    quizzes = [serialize_quiz(quiz) for quiz in quizzes]
    return jsonify(quizzes), 200


@quizzes_bp.route('/<id>')
def get_quiz(id):
    try:
        quiz = quizzes_collection.find_one({"_id": ObjectId(id)})
        if quiz:
            return jsonify(serialize_quiz(quiz)), 200
        return jsonify({'msg': 'Quiz question not found'}), 404
    except Exception as e:
        return jsonify({'msg': 'Invalid ID format or error', 'error': str(e)}), 400


@quizzes_bp.route('/<id>', methods=['PUT'])
def update_quiz(id):
    try:
        data = request.json
        # Ensure the required fields are present
        if 'question' not in data or 'options' not in data or 'answer' not in data:
            return jsonify({'msg': 'Invalid data format. Must include question, options, and answer.'}), 400

        result = quizzes_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count > 0:
            return jsonify({'msg': 'Quiz question updated successfully!'}), 200
        return jsonify({'msg': 'Quiz question not found or no changes made'}), 404
    except Exception as e:
        return jsonify({'msg': 'Error updating quiz question', 'error': str(e)}), 500


@quizzes_bp.route('/<id>', methods=['DELETE'])
def delete_quiz(id):
    try:
        result = quizzes_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({'msg': 'Quiz question deleted successfully!'}), 200
        return jsonify({'msg': 'Quiz question not found'}), 404
    except Exception as e:
        return jsonify({'msg': 'Error deleting quiz question', 'error': str(e)}), 500


@quizzes_bp.route('/bulk', methods=['POST'])
def create_quizzes_bulk():
    try:
        data = request.json
        if not isinstance(data, list) or not all('question' in item and 'options' in item and 'answer' in item for item in data):
            return jsonify({'msg': 'Invalid data format. Must be a list of objects with question, options, and answer.'}), 400

        quizzes_collection.insert_many(data)
        return jsonify({'msg': 'Quizzes created successfully!'}), 201
    except Exception as e:
        return jsonify({'msg': 'Error creating quizzes', 'error': str(e)}), 500
