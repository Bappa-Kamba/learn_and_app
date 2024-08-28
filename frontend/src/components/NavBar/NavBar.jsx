import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-xl font-bold hover:text-blue-500 flex items-center space-x-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
            </svg>
            <span>Home</span>
          </NavLink>
        </div>
        <div className="flex flex-wrap space-x-4 sm:space-x-6">
          <NavLink to="/flashcards" className="flex items-center space-x-2 mx-2 hover:text-blue-500 text-sm sm:text-base">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Flashcards</span>
          </NavLink>
          <NavLink to="/quiz" className="flex items-center space-x-2 mx-2 hover:text-blue-500 text-sm sm:text-base">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Quiz</span>
          </NavLink>
          <NavLink to="/profile" className="flex items-center space-x-2 mx-2 hover:text-blue-500 text-sm sm:text-base">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9.003 9.003 0 0112 15a9.003 9.003 0 016.879 2.804M15 11a3
                3 0 11-6 0 3 3 0 016 0zM19.071 19.071A9.955 9.955 0 0112 21a9.955 9.955 0
                01-7.071-2.929M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/settings" className="flex items-center space-x-2 mx-2 hover:text-blue-500 text-sm sm:text-base">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M12 1v2m0 18v2m8.49-10.85h-2.11a7.968 7.968 0 00-.4-1.67l1.5-1.5a1 1 0 000-1.41l-2.83-2.83a1 1 0 00-1.41
               0l-1.5 1.5a7.968 7.968 0 00-1.67-.4V3.51A1 1 0 0012 2.5h-2a1 1 0 00-.9 1.01v2.11a7.968 7.968 0 00-1.67.4l-1.5-1.5a1 1
               0 00-1.41 0L2.09 7.49a1 1 0 000 1.41l1.5 1.5a7.968 7.968 0 00-.4 1.67H3.51A1 1 0 002.5 12v2a1 1 0 001.01.9h2.11a7.968
               7.968 0 00.4 1.67l-1.5 1.5a1 1 0 000 1.41l2.83 2.83a1 1 0 001.41 0l1.5-1.5a7.968 7.968 0 001.67.4v2.11A1 1 0
               0010 21.5h2a1 1 0 00.9-1.01v-2.11a7.968 7.968 0 001.67-.4l1.5 1.5a1 1 0 001.41 0l2.83-2.83a1 1 0 000-1.41l-1.5-1.5a7.968 7.968 0
               00.4-1.67h2.11A1 1 0 0021.5 14v-2a1 1 0 00-1.01-.9zM12 16a4 4 0 110-8 4 4 0 010 8z" />
            </svg>
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
