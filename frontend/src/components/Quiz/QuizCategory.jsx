// QuizCategorySelector.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const QuizCategorySelector = ({ categories, onStartQuiz }) => {
    const [difficulty, setDifficulty] = useState('easy');
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);
    const [quizType, setQuizType] = useState('multiple');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const categoriesPerPage = 4;

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const featuredCategories = categories.filter(category => category.featured).slice(0, 3);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleStartQuiz = () => {
        if (selectedCategory) {
            onStartQuiz(selectedCategory, difficulty, numberOfQuestions, quizType);
        } else {
            alert('Please select a category');
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-auto">
            <h2 className="font-heading text-4xl text-green-600 mb-6 text-center">Choose Your Quiz</h2>
            
            {/* Featured Categories */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Featured Categories</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {featuredCategories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category.id)}
                            className="flex-shrink-0 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-200"
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Category Selector */}
            <div className="mb-6">
                <label className="font-ui text-lg text-gray-700 mb-2 block">Category:</label>
                <div className="grid grid-cols-2 gap-4">
                    <AnimatePresence>
                        {currentCategories.map((category) => (
                            <motion.button
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`p-4 text-white rounded-xl font-ui font-semibold text-lg shadow-md transition-colors duration-200 ${
                                    selectedCategory === category.id ? 'bg-cyan-400' : 'bg-green-500 hover:bg-green-600'
                                }`}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 mb-6">
                {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Difficulty Selector */}
            <div className="mb-6">
                <label htmlFor="difficulty" className="font-ui text-lg text-gray-700 mb-2 block">Difficulty:</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body text-lg"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {/* Number of Questions Selector */}
            <div className="mb-6">
                <label htmlFor="numberOfQuestions" className="font-ui text-lg text-gray-700 mb-2 block">Number of Questions:</label>
                <input
                    type="number"
                    id="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                    min="1"
                    max="50"
                    className="w-full p-3 border border-gray-300 rounded-lg font-body text-lg"
                />
            </div>

            {/* Quiz Type Selector */}
            <div className="mb-6">
                <label htmlFor="quizType" className="font-ui text-lg text-gray-700 mb-2 block">Quiz Type:</label>
                <select
                    id="quizType"
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body text-lg"
                >
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
            </div>

            {/* Start Quiz Button */}
            <div className="flex justify-center mt-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartQuiz}
                    className="px-6 py-3 rounded-full font-ui font-semibold text-lg bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors duration-200"
                >
                    Start Quiz
                </motion.button>
            </div>
        </div>
    );
};

QuizCategorySelector.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            featured: PropTypes.bool,
        })
    ).isRequired,
    onStartQuiz: PropTypes.func.isRequired,
};

export default QuizCategorySelector;
