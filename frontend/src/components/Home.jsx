import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Language Learning App</h1>
      <p className="text-lg mb-8">Choose a feature to get started:</p>
      <div className="flex space-x-4">
        <Link to="/flashcards">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-600 transition duration-300">
            Flashcards
          </button>
        </Link>
        <Link to="/quiz">
          <button className="bg-green-500 text-white px-6 py-3 rounded shadow-lg hover:bg-green-600 transition duration-300">
            Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
