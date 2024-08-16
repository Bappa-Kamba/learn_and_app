import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import FlashcardContainer from '../components/Flashcards/Flashcard';
import QuizContainer from '../components/Quiz/QuizContainer';
import Home from './Home';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<FlashcardContainer />} />
            <Route path="/quiz" element={<QuizContainer />} />
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
