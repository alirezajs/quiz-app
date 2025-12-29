import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../../questions.js';
import { useState } from 'react';

export default function Question({ index, onSelectAnswer, handleSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  function handleAnswerSelection(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id='question'>
      <QuestionTimer timeOut={20000} onTimeOut={handleSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        onSelectAnswer={handleAnswerSelection}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
