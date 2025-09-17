
import { Target, Eye } from 'lucide-react';


const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            About CyberQuiz Pro
          </h1>
          <p className="text-xl text-gray-300">
            Empowering the next generation of cybersecurity professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Target className="h-6 w-6 text-purple-400 mr-2" />
              Our Mission
            </h2>
            <p className="text-gray-300">
              To democratize cybersecurity education by providing accessible, engaging, and comprehensive 
              learning experiences that prepare individuals for real-world security challenges.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Eye className="h-6 w-6 text-cyan-400 mr-2" />
              Our Vision
            </h2>
            <p className="text-gray-300">
              To become the leading platform for cybersecurity education, fostering a global community 
              of skilled security professionals who can protect our digital future.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                N
              </div>
              <h3 className="text-lg font-semibold text-white">Nimesha</h3>
              <p className="text-purple-400 text-sm">Founder & Lead Developer</p>
              <p className="text-gray-400 text-sm mt-2">
                Cybersecurity enthusiast with a passion for education and technology
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                T
              </div>
              <h3 className="text-lg font-semibold text-white">Tech Team</h3>
              <p className="text-cyan-400 text-sm">Development & Security</p>
              <p className="text-gray-400 text-sm mt-2">
                Dedicated developers ensuring platform security and performance
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                E
              </div>
              <h3 className="text-lg font-semibold text-white">Educators</h3>
              <p className="text-pink-400 text-sm">Content & Curriculum</p>
              <p className="text-gray-400 text-sm mt-2">
                Industry experts crafting comprehensive cybersecurity content
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 mb-6">
            Join thousands of learners already advancing their cybersecurity skills
          </p>
          <div className="flex justify-center space-x-4">
            <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full">
              <span className="text-purple-400">Industry-Expert Content</span>
            </div>
            <div className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
              <span className="text-cyan-400">Practical Applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;