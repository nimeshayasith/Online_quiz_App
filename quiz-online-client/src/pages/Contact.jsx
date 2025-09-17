import { useState } from 'react';
import { Mail, Users, Clock, CheckCircle } from 'lucide-react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300">
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
            
            {isSubmitted && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="content">Content Suggestion</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Mail className="h-5 w-5 text-cyan-400 mr-2" />
                Email Support
              </h3>
              <p className="text-gray-300 mb-2">For technical support and general inquiries:</p>
              <p className="text-cyan-400">support@cyberquizpro.com</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Users className="h-5 w-5 text-purple-400 mr-2" />
                Community
              </h3>
              <p className="text-gray-300 mb-4">Join our community for discussions and updates:</p>
              <div className="space-y-2">
                <button className="block w-full text-left px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-colors">
                  Discord Community
                </button>
                <button className="block w-full text-left px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  LinkedIn Group
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-pink-500/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Clock className="h-5 w-5 text-pink-400 mr-2" />
                Response Time
              </h3>
              <p className="text-gray-300">
                We typically respond to inquiries within 24 hours during business days. 
                For urgent technical issues, please mark your subject as &quot;URGENT&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contact;