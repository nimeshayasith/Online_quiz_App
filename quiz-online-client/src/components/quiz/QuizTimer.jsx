import  { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const QuizTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 60 && !isWarning) {
          setIsWarning(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isWarning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
      isWarning ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-slate-800/50 border-purple-500/20 text-purple-400'
    }`}>
      <Clock className="h-5 w-5" />
      <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default QuizTimer;