import { useCallback, useState, useEffect, useRef } from 'react';
import questions from '../../questions.js';
import Question from './Question.jsx';
import Summery from './Summery.jsx';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const timersRef = useRef([]);

  const activeQuestionIndex = userAnswer.length;
  const quizIsCompleted = userAnswer.length === questions.length;

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const handleSkipAnswer = useCallback(() => {
    setUserAnswer((prev) => [...prev, null]);
  }, []);

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer]);
  }, []);

  if (quizIsCompleted) {
    return <Summery userAnswers={userAnswer} />;
  }

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
