import { useState } from "react"
import { useAuth } from '../auth/AuthProvider';
import { Shield, HomeIcon, Brain, Plus, Settings, Info, MessageCircle, LogOut, Menu, X } from "lucide-react"

const NavBar= ({ currentPage, setCurrentPage }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: 'home', label: 'Home', icon: HomeIcon, show: true },
    { key: 'quiz-stepper', label: 'Take Quiz', icon: Brain, show: isAuthenticated && user?.role?.toUpperCase() === 'STUDENT' },
    { key: 'create-quiz', label: 'Create Quiz', icon: Plus, show: isAuthenticated && user?.role?.toUpperCase() === 'ADMIN' },
    { key: 'manage-quiz', label: 'Manage Quizzes', icon: Settings, show: isAuthenticated && user?.role?.toUpperCase() === 'ADMIN' },
    { key: 'about', label: 'About Us', icon: Info, show: true },
    { key: 'contact', label: 'Contact', icon: MessageCircle, show: true }
  ];

  return (
    <nav className="relative z-50 bg-slate-900/90 backdrop-blur-lg border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2"
          >
            <Shield className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CyberQuiz Pro
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.filter(item => item.show).map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={`text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-1 ${
                  currentPage === item.key ? 'text-purple-400' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300">
                  <span className="text-purple-400">{user?.firstName}</span>
                  <span className="text-xs ml-2 px-2 py-1 bg-purple-500/20 rounded-full capitalize">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-purple-500/20 py-4 rounded-b-lg">
            <div className="space-y-4 px-4">
              {navItems.filter(item => item.show).map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setCurrentPage(item.key); setIsMenuOpen(false); }}
                  className={`block text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-2 ${
                    currentPage === item.key ? 'text-purple-400' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {isAuthenticated ? (
                <div className="border-t border-purple-500/20 pt-4">
                  <div className="text-sm text-gray-300 mb-2">
                    <span className="text-purple-400">{user?.firstName}</span>
                    <span className="text-xs ml-2 px-2 py-1 bg-purple-500/20 rounded-full capitalize">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-purple-500/20 pt-4 space-y-2">
                  <button
                    onClick={() => { setCurrentPage('login'); setIsMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setCurrentPage('signup'); setIsMenuOpen(false); }}
                    className="block w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


export default NavBar
