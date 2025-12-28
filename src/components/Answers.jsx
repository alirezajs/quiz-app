import { useRef } from 'react';

export default function Answers({
  answers,
  onSelectAnswer,
  answerState,
  selectedAnswer,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';
        if (answerState === 'answered' && isSelected) {
          cssClass = 'wrong';
        }
        if ((answerState === 'correct' || answerState === 'incorrect') && isSelected) {
          cssClass = answerState;
        }
        return (
          <li key={index} className='answer'>
            <button className={cssClass} onClick={() => onSelectAnswer(answer, index)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
