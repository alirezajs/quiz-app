import { useCallback, useState, useEffect, useRef } from 'react';
import questions from '../../questions.js';
import completeImage from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswer, setUserAnswer] = useState([]);

  const timersRef = useRef([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswer.length : userAnswer.length - 1;
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

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState('answered');
      setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer]);

      const t1 = setTimeout(() => {
        if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('incorrect');
        }
        const t2 = setTimeout(() => {
          setAnswerState('');
        }, 900); // short pause showing correct/incorrect
        timersRef.current.push(t2);
      }, 300); // brief pause before showing correct/incorrect

      timersRef.current.push(t1);
    },
    [activeQuestionIndex]
  );

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
        onSelectAnswer={handleSelectAnswer}
        questionText={questions[activeQuestionIndex]?.text}
        answers={[...questions[activeQuestionIndex]?.answers]}
        answerState={answerState}
        selectedAnswer={userAnswer[userAnswer.length - 1]}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
