import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import DeckManager from './Flashcards/DeckManager';
import QuizContainer from '../components/Quiz/QuizContainer';
import Profile from './Utilities/Profile';
import Settings from './Utilities/Settings';
import Home from './Home';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  // Step 1: Define shared state in the App component
  const [quizData, setQuizData] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-orange-100">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {isAuthenticated ? (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* Step 2: Pass setQuizData to FlashcardContainer */}
                <Route path="/flashcards/:deckId?" element={<DeckManager setQuizData={setQuizData} />} />
                
                
                {/* Step 2: Pass quizData to QuizContainer */}
                <Route 
                  path="/quiz" 
                  element={
                    <QuizContainer quizData={quizData} />
                  } 
                />
                <Route path="*" element={<Navigate to="/profile" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>© 2024 Language Learning App</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
