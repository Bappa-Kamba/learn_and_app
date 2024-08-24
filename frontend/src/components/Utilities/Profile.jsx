import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faTrophy, faHistory, faStar } from '@fortawesome/free-solid-svg-icons';

// Set up modal styles
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
  },
};

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [progress, setProgress] = useState({ quiz: 70, flashcards: 50 });
  const [achievements, setAchievements] = useState(['Beginner Badge', 'Quiz Master']);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [theme, setTheme] = useState('light');
  const [bio, setBio] = useState('Avid learner and quiz enthusiast');
  const [showModal, setShowModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState('personal');
  const [streak, setStreak] = useState(5);
  const [recentActivities, setRecentActivities] = useState([
    { type: 'quiz', name: 'Science Quiz', score: 80, date: '2023-04-15' },
    { type: 'flashcard', name: 'Math Flashcards', cards: 20, date: '2023-04-14' },
  ]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUsername(newUsername);
    setEmail(newEmail);
    setIsEditing(false);
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackground(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 font-sans">
      <div
        className="bg-white shadow-lg rounded-lg p-6 "
      >
        <h1 className="text-3xl font-bold mb-6 text-white">User Profile</h1>
        <div className="flex items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shadow-md">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-2xl">No Image</span>
            )}
          </div>
          <div className="ml-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="avatarUpload">
              Upload Avatar:
            </label>
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block text-white text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">Current Streak</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold mr-2 text-white">{streak}</span>
            <span className="text-white">days</span>
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-2 text-2xl" />
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSection('personal')}
            className="flex justify-between w-full p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Personal Information
            </span>
            <span>{expandedSection === 'personal' ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {expandedSection === 'personal' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-b-lg shadow-inner"
              >
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Username:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="block w-full text-gray-900 border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-gray-100">{username}</p>
                    )}
                    </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Email:</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="block w-full text-gray-900 border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-gray-100">{email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Bio:</label>
                    {isEditing ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="block w-full text-gray-900 border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-gray-100">{bio}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

         {/* Progress Section */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSection('progress')}
            className="flex justify-between w-full p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              Progress
            </span>
            <span>{expandedSection === 'progress' ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {expandedSection === 'progress' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-b-lg shadow-inner"
              >
                <div className="mt-4">
                  <div className="mb-2">
                    <label className="block text-gray-600 dark:text-gray-400">Quiz:</label>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200 dark:bg-teal-600 dark:text-teal-100">
                          {progress.quiz}%
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200 dark:bg-teal-700">
                        <div style={{ width: `${progress.quiz}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 dark:bg-teal-400"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400">Flashcards:</label>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200 dark:bg-teal-600 dark:text-teal-100">
                          {progress.flashcards}%
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200 dark:bg-teal-700">
                        <div style={{ width: `${progress.flashcards}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 dark:bg-teal-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-6">
          <button 
            onClick={() => toggleSection('achievements')}
            className="flex justify-between w-full p-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-200"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              Achievements
            </span>
            <span>{expandedSection === 'achievements' ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {expandedSection === 'achievements' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-b-lg shadow-inner"
              >
                <ul className="text-gray-900 dark:text-gray-100 list-disc ml-5 mt-4">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <svg className="w-5 h-5 text-yellow-400 mr-2 dark:text-yellow-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                      </svg>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Activity Section */}
        <div className="mb-6">
          <button 
            onClick={() => toggleSection('recentActivity')}
            className="flex justify-between w-full p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              Recent Activity
            </span>
            <span>{expandedSection === 'recentActivity' ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {expandedSection === 'recentActivity' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-b-lg shadow-inner"
              >
                <ul className="space-y-2 mt-4">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
                      <div className="flex justify-between">
                        <span>{activity.name}</span>
                        <span>{activity.date}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.type === 'quiz' ? `Score: ${activity.score}%` : `Cards reviewed: ${activity.cards}`}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex-1"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 flex-1"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditToggle}
                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 flex-1"
              >
                Edit
              </button>
              <button
                onClick={handleThemeToggle}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-700 transition-colors duration-200 flex-1"
              >
                Toggle Theme
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal for additional features if needed */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customModalStyles}
        contentLabel="Additional Features"
      >
        <h2 className="text-xl font-bold mb-4">Additional Features</h2>
        <p className="mb-4">This modal can be used for any additional features or information you want to display.</p>
        <button
          onClick={() => setShowModal(false)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Profile;