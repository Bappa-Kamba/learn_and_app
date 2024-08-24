from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from src.config import Config
from bson import ObjectId

client = MongoClient(Config.MONGO_URI)
db = client['learn_and_quiz']
flashcards_collection = db['flashcards']

flashcards_bp = Blueprint('flashcards', __name__)

# Helper function to serialize MongoDB ObjectId


def serialize_flashcard(flashcard):
    flashcard['_id'] = str(flashcard['_id'])
    return flashcard


@flashcards_bp.route('/', methods=['POST'])
def create_flashcard():
    try:
        data = request.get_json()
        # Ensure the required fields are present
        if 'foreign_word' not in data or 'translation' not in data:
            return jsonify({
                'msg': 'Invalid data format. Must include foreign_word and translation.'
            }), 400

        # check f
        flashcards_collection.insert_one(data)
        return jsonify({'msg': 'Flashcard created successfully!'}), 201
    except Exception as e:
        return jsonify({'msg': 'Error creating flashcard', 'error': str(e)}), 500


@flashcards_bp.route('/')
def get_flashcards():
    flashcards = list(flashcards_collection.find())
    flashcards = [serialize_flashcard(flashcard) for flashcard in flashcards]
    return jsonify(flashcards), 200


@flashcards_bp.route('/<id>')
def get_flashcard(id):
    try:
        flashcard = flashcards_collection.find_one({"_id": ObjectId(id)})
        if flashcard:
            return jsonify(serialize_flashcard(flashcard)), 200
        return jsonify({'msg': 'Flashcard not found'}), 404
    except Exception as e:
        return jsonify({'msg': 'Invalid ID format or error', 'error': str(e)}), 400


@flashcards_bp.route('/<id>', methods=['PUT'])
def update_flashcard(id):
    try:
        data = request.json
        # Ensure the required fields are present
        if 'foreign_word' not in data or 'translation' not in data:
            return jsonify({
                'msg': 'Invalid data format. Must include foreign_word and translation.'
            }), 400

        result = flashcards_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count > 0:
            return jsonify({'msg': 'Flashcard updated successfully!'}), 200
        return jsonify({'msg': 'Flashcard not found or no changes made'}), 404
    except Exception as e:
        return jsonify({'msg': 'Error updating flashcard', 'error': str(e)}), 500


@flashcards_bp.route('/<id>', methods=['DELETE'])
def delete_flashcard(id):
    try:
        result = flashcards_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({'msg': 'Flashcard deleted successfully!'}), 200
        return jsonify({'msg': 'Flashcard not found'}), 404
    except Exception as e:
        return jsonify({'msg': 'Error deleting flashcard', 'error': str(e)}), 500


@flashcards_bp.route('/bulk', methods=['POST'])
def create_flashcards_bulk():
    try:
        data = request.get_json()
        if not isinstance(data, list) or not all(
            'foreign_word' in item and 'translation' in item for item in data
        ):
            return jsonify({
                'msg': 'Invalid data format. Must be a list of objects with foreign_word and translation.'
            }), 400

        flashcards_collection.insert_many(data)
        return jsonify({'msg': 'Flashcards created successfully!'}), 201
    except Exception as e:
        return jsonify({'msg': 'Error creating flashcards', 'error': str(e)}), 500
