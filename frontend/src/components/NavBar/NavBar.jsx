import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Home</Link>
        <div>
          <Link to="/flashcards" className="mx-2 hover:underline">Flashcards</Link>
          <Link to="/quiz" className="mx-2 hover:underline">Quiz</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
