import React, { useState } from 'react';

const Settings = () => {
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('Light');
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        
        {/* Language Preferences */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Language Preferences:</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Notifications:</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <span className="text-gray-900">Enable notifications</span>
          </div>
        </div>

        {/* Theme Customization */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Theme:</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            {/* Add more themes as needed */}
          </select>
        </div>

        {/* Account Management */}
        <div>
          <h2 className="text-xl font-bold mb-2">Account Management:</h2>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
