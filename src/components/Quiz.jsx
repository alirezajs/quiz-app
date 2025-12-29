import { useCallback, useState, useEffect, useRef } from 'react';
import questions from '../../questions.js';
import completeImage from '../assets/quiz-complete.png';
import Question from './Question.jsx';

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
    setAnswerState('answered');
    setUserAnswer((prev) => [...prev, null]);
    const t = setTimeout(() => {
      setAnswerState('');
    }, 700);
    timersRef.current.push(t);
  }, []);

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer]);
  }, []);

  if (quizIsCompleted) {
    return (
      <div id='summary'>
        <img src={completeImage} alt='Quiz Completed' />
        <h2>Quiz Completed!</h2>
      </div>
    );
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
