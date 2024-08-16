import React, { useState, useEffect } from 'react';
import Flashcard from '../Flashcards/Flashcard';
import { dummyFlashcard } from '../data/dummyData'; // Import dummy data

const FlashcardContainer = () => {
  const [flashcard, setFlashcard] = useState(null);

  useEffect(() => {
    // Instead of fetching data, use dummy data
    setFlashcard(dummyFlashcard);
  }, []);

  return (
    <div className="flashcard-container">
      <Flashcard flashcard={flashcard} />
    </div>
  );
};

export default FlashcardContainer;
