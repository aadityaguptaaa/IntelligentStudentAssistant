import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Brain } from 'lucide-react';
import { Button } from '../components/Button';

interface HomeProps {
  onLoginSelect: (role: 'student' | 'teacher') => void;
}

export const Home = ({ onLoginSelect }: HomeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] via-[#5a52d5] to-[#00C9A7] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <GraduationCap className="text-white" size={32} />
          <span className="text-white text-2xl font-bold">ISA</span>
        </motion.div>
      </nav>

      <div className="relative z-10 container mx-auto px-8 py-16">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#6C63FF] rounded-full blur-3xl opacity-50"
              />
              <Brain className="text-white relative z-10" size={120} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Empowering Smarter Learning
            <br />
            <span className="text-[#00C9A7]">with AI</span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 mb-12 max-w-2xl"
          >
            Your intelligent academic companion powered by advanced AI. Get instant doubt resolution,
            smart note summaries, and personalized video recommendations.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button
              variant="secondary"
              onClick={() => onLoginSelect('student')}
              className="text-lg px-8 py-4"
            >
              <GraduationCap className="inline mr-2" size={24} />
              Student Login
            </Button>
            <Button
              variant="accent"
              onClick={() => onLoginSelect('teacher')}
              className="text-lg px-8 py-4"
            >
              <Sparkles className="inline mr-2" size={24} />
              Teacher Login
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
          >
            {[
              { title: 'AI-Powered Doubts', desc: 'Get instant answers to your academic questions' },
              { title: 'Smart Summaries', desc: 'Convert lengthy notes into concise summaries' },
              { title: 'Video Recommendations', desc: 'Discover the best learning videos for any topic' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
