import { useState } from "react";
import Home from './pages/Home';
import Navigation from './components/common/NavBar';
import CyberBackground from './components/common/CyberBackground';
import {AuthProvider} from './components/Auth/AuthProvider';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import About from './pages/About';
import Contact from './pages/Contact';
import QuizStepper from './components/quiz/QuizStepper';
import TakeQuiz from './components/quiz/TakeQuiz';
import CreateQuiz from './components/admin/CreateQuiz';
import ManageQuiz from './components/admin/ManageQuiz';
import UpdateQuestion from './components/admin/UpdateQuestion';
import BulkUploadQuiz from './components/admin/BulkUploadQuiz';


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [quizParams, setQuizParams] = useState(null);
  const [editQuestionId, setEditQuestionId] = useState(null);

  const handlePageChange = (page, params = null) => {
    setCurrentPage(page);
    if (params) {
      setQuizParams(params);
    }
  };

  const handleEditQuestion = (questionId) => {
    setEditQuestionId(questionId);
    setCurrentPage('edit-question');
  };

  const handleBackToManage = () => {
    setEditQuestionId(null);
    setCurrentPage('manage-quiz');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'signup':
        return <SignUp onPageChange={handlePageChange} />;
      case 'login':
        return <SignIn onPageChange={handlePageChange} />;
      case 'quiz-stepper':
        return <QuizStepper onPageChange={handlePageChange} />;
      case 'take-quiz':
        return <TakeQuiz quizParams={quizParams} />;
      case 'create-quiz':
        return <CreateQuiz />;
      case 'manage-quiz':
        return <ManageQuiz onEditQuestion={handleEditQuestion} />;
      case 'edit-question':
        return <UpdateQuestion 
          questionId={editQuestionId} 
          onBack={handleBackToManage}
          onSuccess={handleBackToManage}
        />;
      case 'bulk-upload':
        return <BulkUploadQuiz onBack={() => handlePageChange('home')} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-900 text-white relative">
        <CyberBackground />
        <Navigation currentPage={currentPage} setCurrentPage={handlePageChange} />
        <main className="relative z-10">
          {renderPage()}
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;