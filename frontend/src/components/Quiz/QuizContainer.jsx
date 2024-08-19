import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ResultPanel from './ResultPanel';
import ProgressBar from '../ProgreeBar/ProgressBar';
import { dummyQuestions } from '../../data/dummyData';

const QuizContainer = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const totalQuestions = dummyQuestions ? dummyQuestions.length : 0;

  useEffect(() => {
    setQuiz(dummyQuestions);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === quiz[currentQuestion].answer) {
        setScore(score + 1);
      }
      
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setIsQuizFinished(true);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsQuizFinished(false);
  };

  return (
    <div className="quiz-container max-w-2xl mx-auto p-5 bg-white shadow-md rounded-lg mt-10">
      <ProgressBar
                progress={currentQuestion + 1}
                total={totalQuestions}
      />
      {quiz.length > 0 ? (
        <>
          {isQuizFinished ? (
            <ResultPanel score={score} totalQuestions={totalQuestions} onRestart={handleRestartQuiz} />
          ) : (
            <>
              <QuestionCard
                quiz={quiz[currentQuestion]}
                onOptionSelect={handleOptionSelect}
                selectedOption={selectedOption}
              />
              <button 
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className={`
                  px-4 py-2 rounded font-bold text-white mt-3
                  ${selectedOption 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-400 cursor-not-allowed'}
                `}
              >
                Next
              </button>
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default QuizContainer;
