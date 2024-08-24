import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from './QuestionCard';
import QuizCategorySelector from './QuizCategory';
import ProgressBar from '../ProgressBar/ProgressBar';
import LoadingSpinner from '../Utilities/Spinner';
import ReviewCard from './ReviewCard';

const QuizContainer = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeLeft, setTimeLeft] = useState();
  const [timerRunning, setTimerRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    category: '',
    difficulty: 'easy',
    numberOfQuestions: 10,
    quizType: 'multiple'
  });

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      handleFinishQuiz();
    }
  }, [timerRunning, timeLeft]);

  const handleStartQuiz = async (category, difficulty, numberOfQuestions, quizType) => {
    setSelectedCategory(category);
    setQuizSettings({ category, difficulty, numberOfQuestions, quizType });

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/categories/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          difficulty,
          type: quizType,
          amount: numberOfQuestions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }

      const data = await response.json();
      const questions = data.questions || [];

      // Map the questions to include options
      const formattedQuestions = questions.map(q => {
        // Combine the correct answer with incorrect answers
        const options = [...q.incorrect_answers, q.correct_answer];
        // Shuffle the options (optional)
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        return {
          question: q.question,
          options: shuffledOptions,
          answer: q.correct_answer,
        };
      });

      if (formattedQuestions.length > 0) {
        setQuiz(formattedQuestions);
        setTimeLeft(180);
        setTimerRunning(true);
        setIsQuizFinished(false);
      } else {
        console.error('No questions available');
        alert('No questions available for the selected category and settings.');
        setQuiz([]);
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    } finally {
      setTimeout(() => {
          setLoading(false);
        }, 3000);
    }
  };

  const handleOptionSelect = (option) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: option
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setLoading(true);
    setIsQuizFinished(true);
    setIsReviewMode(true);
    let newScore = 0;
    quiz.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleFinishQuiz = () => {
    setTimerRunning(false);
    setIsQuizFinished(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers({});
    setIsQuizFinished(false);
    setIsReviewMode(false);
    setTimeLeft(120);
    setTimerRunning(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          {loading ? (
            <div className='flex justify-center items-center'>
              <LoadingSpinner />
            </div>
          ) : !selectedCategory ? (
            <QuizCategorySelector 
              categories={categories} 
              onStartQuiz={handleStartQuiz} 
            />
          ) : (
            <>
              <ProgressBar progress={currentQuestion + 1} total={quiz.length} context='quiz' />
              {isQuizFinished ? (
                isReviewMode && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Quiz Review</h2>
                    <p className="mb-4">Your Score: {score} out of {quiz.length}</p>
                    {quiz.map((q, index) => (
                      <ReviewCard
                        key={index}
                        question={q.question}
                        options={q.options}
                        userAnswer={userAnswers[index]}
                        correctAnswer={q.answer}
                      />
                    ))}
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
                      onClick={handleRestartQuiz}
                    >
                      Restart Quiz
                    </button>
                  </div>
                )
              ) : (
                quiz[currentQuestion] ? (
                  <QuestionCard 
                    question={quiz[currentQuestion].question} 
                    options={quiz[currentQuestion].options} 
                    selectedOption={userAnswers[currentQuestion]}
                    onOptionSelect={handleOptionSelect} 
                    onNext={handleNextQuestion}
                    onPrevious={handlePreviousQuestion}
                    onSubmit={handleSubmitQuiz}
                    isFirstQuestion={currentQuestion === 0}
                    isLastQuestion={currentQuestion === quiz.length - 1}
                    timeLeft={timeLeft}
                  />
                ) : (
                  <div className="text-center text-red-500">Loading...</div>
                )
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizContainer;
