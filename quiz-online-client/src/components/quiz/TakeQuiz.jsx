import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Info, Trophy } from 'lucide-react'; 
import QuizTimer from './QuizTimer';


// Take Quiz Component 
const TakeQuiz = ({ quizParams }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizParams?.timeLimit || 600);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Mock questions for demonstration
  const [questions] = useState([
    {
      id: 1,
      question: "What does CIA stand for in cybersecurity?",
      choices: [
        "A. Central Intelligence Agency",
        "B. Confidentiality, Integrity, Availability", 
        "C. Computer Information Access",
        "D. Cyber Intelligence Analysis"
      ],
      correctAnswers: ["B"],
      questionType: "single"
    },
    {
      id: 2,
      question: "Which of the following are types of malware? (Select all that apply)",
      choices: [
        "A. Virus",
        "B. Trojan", 
        "C. Firewall",
        "D. Ransomware"
      ],
      correctAnswers: ["A", "B", "D"],
      questionType: "multiple"
    }
  ]);

  useEffect(() => {
    if (quizParams?.timeLimit > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question.questionType === 'single') {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: [answer]
      }));
    } else {
      setSelectedAnswers(prev => {
        const current = prev[questionId] || [];
        const updated = current.includes(answer)
          ? current.filter(a => a !== answer)
          : [...current, answer];
        return {
          ...prev,
          [questionId]: updated
        };
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const userAnswers = selectedAnswers[question.id] || [];
      const correctAnswers = question.correctAnswers;
      
      if (userAnswers.length === correctAnswers.length &&
          userAnswers.every(answer => correctAnswers.includes(answer))) {
        totalScore++;
      }
    });
    
    setScore(totalScore);
    setShowResult(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestion];

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 text-center">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h1>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20 p-6 mb-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-300 mb-2">
                {Math.round((score / questions.length) * 100)}% Score
              </div>
              <div className="text-gray-400">
                {score === questions.length ? 'Perfect Score! 🎉' : 
                 score >= questions.length * 0.8 ? 'Excellent Work! 👏' :
                 score >= questions.length * 0.6 ? 'Good Job! 👍' : 'Keep Learning! 📚'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{questions.length}</div>
                <div className="text-sm text-gray-400">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-sm text-gray-400">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
                <div className="text-sm text-gray-400">Incorrect</div>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h1>
            <div className="text-purple-400">{quizParams?.selectedSubject || 'Cybersecurity Quiz'}</div>
          </div>
          
          {quizParams?.timeLimit > 0 && (
            <QuizTimer duration={timeLeft} onTimeUp={handleSubmitQuiz} />
          )}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQ?.question}
          </h2>

          <div className="space-y-3">
            {currentQ?.choices.map((choice, index) => {
              const letter = choice.charAt(0);
              const isSelected = selectedAnswers[currentQ.id]?.includes(letter);
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, letter)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-purple-500/50'
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {currentQ?.questionType === 'multiple' && (
            <div className="mt-4 text-sm text-gray-400 flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Select all correct answers
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQ?.id]?.length}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;