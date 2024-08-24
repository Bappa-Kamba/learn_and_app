from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from src.config import Config
import requests
import html

client = MongoClient(Config.MONGO_URI)
db = client['learn_and_quiz']
categories_collection = db['categories']

categories_bp = Blueprint('categories', __name__)

TRIVIA_API_BASE_URL = "https://opentdb.com/api.php"
TRIVIA_CATEGORY_URL = "https://opentdb.com/api_category.php"


def fetch_and_cache_categories():
    try:
        response = requests.get(TRIVIA_CATEGORY_URL)
        if response.status_code == 200:
            categories = response.json().get('trivia_categories', [])
            categories_collection.drop()  # Clear existing categories
            categories_collection.insert_many(categories)
        else:
            print(
                f"Failed to fetch categories, status code: {response.status_code}")
    except requests.RequestException as e:
        print(f"Request failed: {e}")


@categories_bp.route('/', methods=['GET'])
def get_categories():
    try:
        categories = list(categories_collection.find({}, {'_id': 0}))
        if not categories:
            fetch_and_cache_categories()
            categories = list(categories_collection.find({}, {'_id': 0}))
        return jsonify({'categories': categories}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@categories_bp.route('/questions', methods=['POST'])
def get_questions():
    try:
        data = request.json
        category = data.get('category')
        difficulty = data.get('difficulty')
        question_type = data.get('type')
        amount = data.get('amount', 10)

        query_params = {
            'amount': amount,
            'category': category,
            'difficulty': difficulty,
            'type': question_type
        }

        response = requests.get(TRIVIA_API_BASE_URL, params=query_params)
        if response.status_code == 200:
            questions = response.json().get('results', [])
            for question in questions:
                question['question'] = html.unescape(question['question'])
                question['correct_answer'] = html.unescape(
                    question['correct_answer'])
                question['incorrect_answers'] = [html.unescape(
                    ans) for ans in question['incorrect_answers']]
            return jsonify({'questions': questions}), 200
        else:
            return jsonify({'error': 'Failed to fetch questions'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
