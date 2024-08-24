from flask import Flask
from flask_cors import CORS
from .config import Config


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_object(Config)
    app.url_map.strict_slashes = False

    # Import and register blueprints here
    from .routes.flashcards import flashcards_bp
    from .routes.quizzes import quizzes_bp
    from .routes.categories import categories_bp
    app.register_blueprint(flashcards_bp, url_prefix='/api/flashcards')
    app.register_blueprint(quizzes_bp, url_prefix='/api/quiz')
    app.register_blueprint(categories_bp, url_prefix='/api/categories')

    return app
