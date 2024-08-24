import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import FlashcardButtons from './ButtonPanel';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { dummyFlashcards } from '../../data/dummyData';

const FlashcardContainer = ({ setQuizData }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [knownCards, setKnownCards] = useState([]);
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setFlashcards(dummyFlashcards.map(card => ({ ...card, interval: 1, nextReview: Date.now() })));
  }, []);

  const scheduleReview = (flashcard, known) => {
    const now = Date.now();
    let newInterval = flashcard.interval;

    if (known) {
      newInterval *= 2;
    } else {
      newInterval = 1;
    }

    return {
      ...flashcard,
      interval: newInterval,
      nextReview: now + newInterval * 24 * 60 * 60 * 1000, // Convert days to milliseconds
    };
  };

  const handleKnown = () => {
    const updatedCard = scheduleReview(flashcards[currentFlashcard], true);
    updateFlashcards(updatedCard);
    setKnownCards([...knownCards, updatedCard]);
    setStreak(streak + 1);
    moveToNextCard();
  };

  const handleUnknown = () => {
    const updatedCard = scheduleReview(flashcards[currentFlashcard], false);
    updateFlashcards(updatedCard);
    setReviewQueue([...reviewQueue, updatedCard]);
    moveToNextCard();
  };

  const updateFlashcards = (updatedCard) => {
    setFlashcards(flashcards.map(card => 
      card === flashcards[currentFlashcard] ? updatedCard : card
    ));
  };

  const moveToNextCard = () => {
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
    } else if (reviewQueue.length > 0) {
      setFlashcards(reviewQueue);
      setReviewQueue([]);
      setCurrentFlashcard(0);
    } else {
      setShowQuizPrompt(true); // Show quiz prompt
    }
  };

  const handleCompletion = (takeQuiz) => {
    if (takeQuiz) {
      setQuizData(knownCards);
      navigate('/quiz'); // Redirect to the quiz page
    } else {
      setShowQuizPrompt(false);
      alert("You're done with this deck of cards.")
    }
  };

  return (
    <div className="flashcard-container max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl mt-10">
      <ProgressBar progress={currentFlashcard + 1} total={flashcards.length} />
      <div className="streak-indicator bg-green-500 text-white px-4 py-2 rounded-lg mb-4 shadow-md">
        Current Streak: {streak}
      </div>
      {flashcards.length > 0 ? (
        <>
          <Flashcard
            front={flashcards[currentFlashcard].foreignWord}
            back={flashcards[currentFlashcard].englishTranslation}
            currentFlashcard={currentFlashcard}
          />
          <FlashcardButtons onKnown={handleKnown} onUnknown={handleUnknown} />
          {showQuizPrompt && (
            <div className="quiz-prompt bg-gray-200 p-4 mt-4 rounded-lg shadow-inner">
              <p className="text-lg font-medium text-gray-700">You have completed all flashcards! Would you like to take a quiz based on your known cards?</p>
              <button 
                onClick={() => handleCompletion(true)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 mt-2 shadow-sm hover:bg-blue-700">
                Yes, take me to the quiz
              </button>
              <button 
                onClick={() => handleCompletion(false)} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 shadow-sm hover:bg-red-600">
                No, maybe later
              </button>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default FlashcardContainer;
