import completeImage from '../assets/quiz-complete.png';
import QUESTIONS from '../../questions.js';

export default function Summery({ userAnswers }) {
  const skippedAnswersCount = userAnswers.filter((answer) => answer === null).length;
  const correctAnswersCount = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  ).length;
  const wrongAnswersCount = userAnswers.filter(
    (answer, index) => answer !== null && answer !== QUESTIONS[index].answers[0]
  ).length;

  const skippedAnswersShare = Math.round((skippedAnswersCount / QUESTIONS.length) * 100);
  const correctAnswersShare = Math.round((correctAnswersCount / QUESTIONS.length) * 100);
  const wrongAnswersShare = Math.round((wrongAnswersCount / QUESTIONS.length) * 100);

  return (
    <div id='summary'>
      <img src={completeImage} alt='Quiz Completed' />
      <h2>Quiz Completed!</h2>
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswersShare}%</span>
          <span className='text'> skipped</span>
        </p>
        <p>
          <span className='number'>{correctAnswersShare}%</span>
          <span className='text'> answer correctly</span>
        </p>
        <p>
          <span className='number'>{wrongAnswersShare}%</span>
          <span className='text'> answer incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';
          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
