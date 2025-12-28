import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  handleSkipAnswer,
}) {
  return (
    <div id='question'>
      <QuestionTimer timeOut={20000} onTimeOut={handleSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        onSelectAnswer={onSelectAnswer}
        answerState={answerState}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
