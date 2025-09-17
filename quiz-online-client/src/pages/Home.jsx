import { Play, Plus, Settings, Star, Zap, Layers } from 'lucide-react';
import { useAuth } from "../components/Auth/AuthProvider";

const Home = ({ onPageChange }) => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Master Cyber Security
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From beginner to advanced - enhance your cybersecurity knowledge through interactive quizzes designed by industry experts
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full">
                <span className="text-purple-400">🛡️ Real-world Scenarios</span>
              </div>
              <div className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                <span className="text-cyan-400">⚡ Instant Feedback</span>
              </div>
              <div className="px-6 py-3 bg-pink-500/20 border border-pink-500/30 rounded-full">
                <span className="text-pink-400">🏆 Track Progress</span>
              </div>
              <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full">
                <span className="text-green-400">⏱️ Timed Challenges</span>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onPageChange('signup')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95"
                >
                  Start Learning Now
                </button>
                <button 
                  onClick={() => onPageChange('login')}
                  className="px-8 py-4 border border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all"
                >
                  Sign In
                </button>
              </div>
            )}

            {isAuthenticated && (
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20 p-6 mt-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Welcome back, {user?.firstName}!
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user?.role === 'student' && (
                    <button 
                      onClick={() => onPageChange('quiz-stepper')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                    >
                      <Play className="h-5 w-5" />
                      <span>Take Quiz</span>
                    </button>
                  )}
                  {user?.role === 'admin' && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => onPageChange('create-quiz')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Create Quiz</span>
                      </button>
                      <button 
                        onClick={() => onPageChange('manage-quiz')}
                        className="px-6 py-3 border border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all flex items-center justify-center space-x-2"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Manage Quizzes</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Why Choose CyberQuiz Pro?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all transform hover:scale-105">
              {/* TODO: Define or import Target if needed */} 
              <div className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Targeted Learning</h3>
              <p className="text-gray-400">Quizzes designed for every skill level, from basic security concepts to advanced penetration testing techniques</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all transform hover:scale-105">
              <Zap className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Performance</h3>
              <p className="text-gray-400">Track your progress with instant feedback, detailed analytics, and personalized learning paths</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-pink-500/20 p-6 hover:border-pink-500/40 transition-all transform hover:scale-105">
              <Layers className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Topics</h3>
              <p className="text-gray-400">Cover all aspects of cybersecurity from network security to ethical hacking and incident response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20 p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-400">1000+</div>
                <div className="text-gray-400">Questions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400">50+</div>
                <div className="text-gray-400">Topics</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-400">5000+</div>
                <div className="text-gray-400">Active Learners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-4">
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-gray-400 text-sm">Cybersecurity Student</div>
                </div>
              </div>
              <p className="text-gray-300">
                "CyberQuiz Pro helped me prepare for my CISSP certification. The questions are challenging and mirror real-world scenarios perfectly."
              </p>
              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <div className="text-white font-semibold">Mark Rodriguez</div>
                  <div className="text-gray-400 text-sm">Security Instructor</div>
                </div>
              </div>
              <p className="text-gray-300">
                "As an instructor, I love how easy it is to create and manage quizzes. My students are more engaged than ever!"
              </p>
              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home
