import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_key')
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/learn_and_quiz')
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
