import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import { dummyQuiz } from '../../data/dummyData';

const QuizContainer = () => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Instead of fetching data, use dummy data
    setQuiz(dummyQuiz);
  }, []);

  return (
    <div className="quiz-container">
      {quiz && <QuestionCard quiz={quiz} />}
    </div>
  );
};

export default QuizContainer;
