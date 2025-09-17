import { useState } from "react";
import { CheckCircle, Plus, Trash2 } from "lucide-react";



// Create Quiz Component (for Admin)
const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    questionType: 'single',
    choices: ['A. ', 'B. '],
    correctAnswers: ['']
  });
  const [subjects] = useState([
    'Network Security',
    'Ethical Hacking', 
    'Cryptography',
    'Incident Response',
    'Risk Management',
    'Malware Analysis',
    'Digital Forensics',
    'Cloud Security'
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Creating question:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    
    // Reset form
    setFormData({
      question: '',
      subject: '',
      questionType: 'single',
      choices: ['A. ', 'B. '],
      correctAnswers: ['']
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddChoice = () => {
    const nextLetter = String.fromCharCode(65 + formData.choices.length);
    setFormData({
      ...formData,
      choices: [...formData.choices, `${nextLetter}. `]
    });
  };

  const handleRemoveChoice = (index) => {
    if (formData.choices.length > 2) {
      setFormData({
        ...formData,
        choices: formData.choices.filter((_, i) => i !== index)
      });
    }
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...formData.choices];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Create New Quiz Question
          </h1>
          <p className="text-gray-400">Design engaging cybersecurity questions for your students</p>
        </div>

        {isSubmitted && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center text-green-400">
              <CheckCircle className="h-5 w-5 mr-2" />
              Question created successfully!
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                  <option value="new">Add New Subject</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question Type</label>
                <select
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
            </div>

            {formData.subject === 'new' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Subject Name</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Enter new subject name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                placeholder="Enter your cybersecurity question here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Answer Choices</label>
              <div className="space-y-3">
                {formData.choices.map((choice, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => handleChoiceChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                      placeholder={`Choice ${String.fromCharCode(65 + index)}`}
                    />
                    {formData.choices.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        className="px-3 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {formData.choices.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Choice</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correct Answer{formData.questionType === 'multiple' ? 's' : ''} (Enter letter: A, B, C, etc.)
              </label>
              <input
                type="text"
                value={formData.correctAnswers[0]}
                onChange={(e) => setFormData({ ...formData, correctAnswers: [e.target.value] })}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                placeholder={formData.questionType === 'multiple' ? "A,B,C (comma separated)" : "A"}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz