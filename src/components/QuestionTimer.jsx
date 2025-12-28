import { use, useEffect, useState } from 'react';

export default function QuestionTimer({ timeOut, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeOut);

    return () => {
      clearTimeout(timer);
    };
  }, [timeOut, onTimeOut]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return <progress id='question-time' max={timeOut} value={remainingTime}></progress>;
}
