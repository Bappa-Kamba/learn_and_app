import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('authToken', 'exampleToken');
    setIsLoggedIn(true);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-heading mb-4 text-center text-gray-800">Welcome to the Language Learning App</h1>
        <p className="text-lg font-body mb-8 text-center text-gray-600">Enhance your language skills with interactive lessons</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <Link to="/flashcards" className="w-full sm:w-auto">
            <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center font-ui font-semibold">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Flashcards
            </button>
          </Link>
          <Link to="/quiz" className="w-full sm:w-auto">
            <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center font-ui font-semibold">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quiz
            </button>
          </Link>
        </div>
        {!isLoggedIn && (
          <div className="text-center">
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 font-ui font-semibold"
            >
              Login to Access More Features
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;