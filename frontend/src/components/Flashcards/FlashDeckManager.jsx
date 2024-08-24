// FlashcardDeckManager.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FlashcardDeckManager = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Fetch decks from API or local storage
    // For now, we'll use dummy data
    setDecks([
      { id: 1, name: 'Basic Phrases', cardCount: 20 },
      { id: 2, name: 'Numbers', cardCount: 15 },
      { id: 3, name: 'Colors', cardCount: 10 },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Flashcard Decks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <Link key={deck.id} to={`/flashcards/${deck.id}`} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold">{deck.name}</h2>
            <p className="text-gray-600">{deck.cardCount} cards</p>
          </Link>
        ))}
        <div className="bg-gray-100 rounded-lg shadow-md p-4 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition duration-300">
          <span className="text-2xl">+ Create New Deck</span>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeckManager;