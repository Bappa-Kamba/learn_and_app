import unittest
from app import create_app


class FlashcardsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_create_flashcard(self):
        response = self.client.post('/api/flashcards/', json={
            'question': 'What is Flask?',
            'answer': 'A micro web framework for Python.'
        })
        self.assertEqual(response.status_code, 201)

    def test_get_flashcards(self):
        response = self.client.get('/api/flashcards/')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
