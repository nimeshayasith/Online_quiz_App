import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';


const ManageQuiz = () => {
  const [questions] = useState([
    {
      id: 1,
      question: "What is the most common type of cyber attack?",
      subject: "Network Security",
      choices: ["A. DDoS", "B. Phishing", "C. Malware", "D. SQL Injection"],
      correctAnswers: ["B"],
      questionType: "single"
    },
    {
      id: 2,
      question: "Which encryption algorithm is considered most secure?",
      subject: "Cryptography",
      choices: ["A. DES", "B. AES", "C. RC4", "D. MD5"],
      correctAnswers: ["B"],
      questionType: "single"
    }
  ]);

  const handleEdit = (id) => {
    console.log('Edit question:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete question:', id);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Manage Quiz Questions
            </h1>
            <p className="text-gray-400">Edit, delete, and organize your quiz questions</p>
          </div>
          
          <div className="text-sm text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-purple-500/20">
            Total Questions: {questions.length}
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg font-semibold text-purple-400">#{index + 1}</span>
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
                      {question.subject}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                      {question.questionType === 'single' ? 'Single Choice' : 'Multiple Choice'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {question.question}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-2 mb-4">
                    {question.choices.map((choice, choiceIndex) => (
                      <div 
                        key={choiceIndex}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          question.correctAnswers.includes(choice.charAt(0))
                            ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                            : 'bg-slate-700/50 border border-slate-600/50 text-gray-300'
                        }`}
                      >
                        {choice}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    Correct Answer{question.correctAnswers.length > 1 ? 's' : ''}: {question.correctAnswers.join(', ')}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(question.id)}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageQuiz;