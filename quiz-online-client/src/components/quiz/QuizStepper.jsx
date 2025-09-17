import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { Brain, Target, Timer, CheckCircle } from 'lucide-react';



// Quiz Stepper Component
const QuizStepper = ({ onPageChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedNumQuestions, setSelectedNumQuestions] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  
  // Mock subjects for demonstration
  const subjects = [
    'Network Security',
    'Ethical Hacking',
    'Cryptography',
    'Incident Response',
    'Risk Management',
    'Malware Analysis',
    'Digital Forensics',
    'Cloud Security'
  ];

  const handleNext = () => {
    if (currentStep === 4) {
      // Navigate to quiz with selected parameters
      onPageChange('take-quiz', {
        selectedSubject,
        selectedNumQuestions: parseInt(selectedNumQuestions),
        timeLimit: parseInt(timeLimit)
      });
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <Brain className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">Choose Your Subject</h3>
            <p className="text-gray-400 mb-6">Select the cybersecurity topic you want to focus on</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSubject === subject
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-purple-500/50'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <Target className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">How Many Questions?</h3>
            <p className="text-gray-400 mb-6">Choose the number of questions for your quiz</p>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              {['5', '10', '15', '20'].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedNumQuestions(num)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedNumQuestions === num
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="text-2xl font-bold">{num}</div>
                  <div className="text-sm">Questions</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <Timer className="h-16 w-16 text-pink-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">Set Time Limit</h3>
            <p className="text-gray-400 mb-6">Choose how much time you want for the quiz</p>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              {[
                { value: '300', label: '5 min', desc: 'Quick' },
                { value: '600', label: '10 min', desc: 'Standard' },
                { value: '900', label: '15 min', desc: 'Extended' },
                { value: '0', label: 'No Limit', desc: 'Relaxed' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeLimit(option.value)}
                  className={`p-4 rounded-lg border transition-all ${
                    timeLimit === option.value
                      ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-pink-500/50'
                  }`}
                >
                  <div className="text-xl font-bold">{option.label}</div>
                  <div className="text-sm">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to Start!</h3>
            <p className="text-gray-400 mb-6">Review your quiz configuration</p>
            
            <div className="bg-slate-700/50 rounded-lg p-6 max-w-md mx-auto">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-purple-400 font-semibold">{selectedSubject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Questions:</span>
                  <span className="text-cyan-400 font-semibold">{selectedNumQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Limit:</span>
                  <span className="text-pink-400 font-semibold">
                    {timeLimit === '0' ? 'No Limit' : `${Math.floor(timeLimit / 60)} minutes`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

   const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedSubject !== '';
      case 2: return selectedNumQuestions !== '';
      case 3: return timeLimit !== '';
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Quiz Setup
          </h1>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          
          <div className="text-sm text-gray-400">
            Step {currentStep} of 4
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 min-h-[400px] flex items-center">
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{currentStep === 4 ? 'Start Quiz' : 'Next'}</span>
            {currentStep === 4 ? <Play className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStepper;
