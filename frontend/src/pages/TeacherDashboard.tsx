import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, CheckCircle, LogOut, Loader2 } from 'lucide-react'; 
import { respondDoubt, fetchDoubts } from '../api/client';

interface Doubt {
  id: string;
  student: string;
  question: string;
  subject: string;
  time: string;
  status: 'pending' | 'answered';
}

interface TeacherDashboardProps {
  onLogout: () => void;
}

// --- DUMMY DATA FOR INITIAL DISPLAY ---
const DUMMY_DOUBTS: Doubt[] = [
    {
        id: 'd101',
        student: 'Alex Johnson',
        question: 'Could you explain the difference between Big O and Big Theta notation in simple terms for recursive functions?',
        subject: 'Data Structures & Algorithms',
        time: '5 min ago',
        status: 'pending',
    },
    {
        id: 'd102',
        student: 'Sarah Lee',
        question: 'I am having trouble styling my component using Tailwind CSS when I try to use `group-hover`. What am I missing?',
        subject: 'Web Development (CSS)',
        time: '15 min ago',
        status: 'pending',
    },
    {
        id: 'd103',
        student: 'David Chen',
        question: 'Why does $0.1 + 0.2$ not equal $0.3$ in JavaScript? Is there a reliable way to fix this for monetary calculations?',
        subject: 'Computer Science Fundamentals',
        time: '30 min ago',
        status: 'pending',
    },
    {
        id: 'd104',
        student: 'Emily Rodriguez',
        question: 'What is the formula for calculating the kinetic energy of a falling object, and what are the standard units?',
        subject: 'Physics',
        time: '1 hour ago',
        status: 'answered',
    },
    {
        id: 'd105',
        student: 'Mark Brown',
        question: 'Can you show me a simple example of React context to pass state without prop drilling?',
        subject: 'Web Development (React)',
        time: '2 hours ago',
        status: 'pending',
    },
];

// Skeleton loading component for better UX during fetch
const DoubtSkeleton = () => (
    <div className="p-4 rounded-lg border-2 border-gray-100 bg-white/70 animate-pulse space-y-3">
        <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
            <div className="h-4 bg-gray-200 w-1/6 rounded"></div>
        </div>
        <div className="h-3 bg-gray-200 w-3/4 rounded"></div>
        <div className="h-3 bg-gray-200 w-1/3 rounded"></div>
    </div>
);

export const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  // Initialize state with dummy data
  const [doubts, setDoubts] = useState<Doubt[]>(DUMMY_DOUBTS); 
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [answer, setAnswer] = useState('');
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  // Set isLoadingFetch to false by default since we are using dummy data instantly
  const [isLoadingFetch, setIsLoadingFetch] = useState(false); 
  const [showSuccess, setShowSuccess] = useState(false);
  
  const pendingDoubts = doubts.filter(d => d.status === 'pending');
  const answeredDoubts = doubts.filter(d => d.status === 'answered');

  // ---------------------
  // Fetch doubts from backend (re-simulated with dummy data)
  // ---------------------
  const loadDoubts = async () => {
    // We can simulate the loading state to show the skeleton for a moment
    setIsLoadingFetch(true);
    try {
      // Simulate network delay for a more realistic feel
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // In a real app, this would be: const res = await fetchDoubts(); setDoubts(res.data.doubts);
      // For now, we load the dummy data after the delay
      setDoubts(DUMMY_DOUBTS); 

    } catch (error) {
      console.error('Failed to fetch doubts:', error);
    } finally {
      setIsLoadingFetch(false);
    }
  };

  useEffect(() => {
    // Use the simulated fetch to show the loading effect on mount
    // loadDoubts();
    
    // However, for a stable demonstration, let's keep it initialized with DUMMY_DOUBTS
    // and remove the initial fetch simulation to avoid re-rendering.
    // If you want the loading spinner, uncomment loadDoubts() and set initial doubts to [].
  }, []);

  const stats = [
    { label: 'Total Students', value: '42', icon: Users, color: 'from-[#6C63FF] to-[#5a52d5]' },
    { label: 'Pending Doubts', value: pendingDoubts.length.toString(), icon: MessageSquare, color: 'from-[#FF6B9D] to-[#C44569]' },
    { label: 'Resolved Today', value: answeredDoubts.length.toString(), icon: CheckCircle, color: 'from-[#00C9A7] to-[#00b396]' },
    { label: 'Avg. Response Rate', value: '95%', icon: TrendingUp, color: 'from-[#FFA500] to-[#FF8C00]' },
  ];

  const handleRespond = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoubt || !answer.trim()) return;

    setIsLoadingSubmit(true);
    try {
      // Simulate successful API call and network delay
      await new Promise(resolve => setTimeout(resolve, 800)); 
      // await respondDoubt(selectedDoubt.id, answer); // Skip actual API call for dummy data

      // Update the list and trigger the exit animation via AnimatePresence
      setDoubts(doubts.map(d =>
        d.id === selectedDoubt.id ? { ...d, status: 'answered' as const } : d
      ));
      
      // Clear and show success
      setShowSuccess(true);
      setAnswer('');
      setSelectedDoubt(null);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error responding to doubt:', error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6C63FF] to-[#5a52d5] text-white px-8 py-6 shadow-xl">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Teaching Portal</h1>
            <p className="text-white/90">Manage student doubts and provide timely support</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" onClick={onLogout} className="bg-white text-[#6C63FF] hover:bg-gray-100">
                  <LogOut className="inline mr-2" size={20} />
                  Logout
              </Button>
          </motion.div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="relative overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-10 -mt-10`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-800">{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Doubts & Respond Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Student Doubts (Left Panel) */}
          <Card className="p-0 border-none shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">
                Pending Doubts ({pendingDoubts.length})
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto p-6">
              {isLoadingFetch ? (
                  Array.from({ length: 4 }).map((_, i) => <DoubtSkeleton key={i} />)
              ) : pendingDoubts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <CheckCircle className="mx-auto mb-3 text-green-400" size={48} />
                    <p className="text-gray-500 font-medium">All clear! No pending doubts right now. 🎉</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                    {pendingDoubts.map((doubt, idx) => (
                        <motion.div
                            key={doubt.id}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                selectedDoubt?.id === doubt.id
                                  ? 'border-[#6C63FF] bg-[#6C63FF]/10 shadow-md'
                                  : 'border-gray-200 bg-white hover:border-[#6C63FF]/30 hover:shadow-sm'
                            }`}
                            onClick={() => {
                                setSelectedDoubt(doubt);
                                setAnswer(''); // Clear answer when selecting a new doubt
                            }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-800">{doubt.student}</h3>
                                    <p className="text-xs text-gray-500">{doubt.time}</p>
                                </div>
                                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full animate-pulse">
                                    PENDING
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2 truncate">{doubt.question}</p>
                            <span className="inline-block px-2 py-1 bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-semibold rounded">
                                {doubt.subject}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
              )}
            </div>
          </Card>

          {/* Respond to Doubt (Right Panel) */}
          <Card className="p-6 border-none shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                Current Response Panel
            </h2>
            
            <AnimatePresence mode="wait">
              {selectedDoubt ? (
                <motion.div
                    key={selectedDoubt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-white/70 rounded-lg p-5 mb-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{selectedDoubt.student}</h3>
                                <p className="text-xs text-gray-500">{selectedDoubt.subject} • {selectedDoubt.time}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                selectedDoubt.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {selectedDoubt.status.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-gray-700 font-medium border-t pt-3 mt-3">Question:</p>
                        <p className="text-gray-700 italic">{selectedDoubt.question}</p>
                    </div>

                    {selectedDoubt.status === 'pending' && (
                        <form onSubmit={handleRespond}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Your Answer
                                </label>
                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Type your detailed, helpful answer here..."
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/50 focus:outline-none transition-all duration-300 min-h-[200px] resize-none shadow-inner"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isLoadingSubmit || !answer.trim()}
                                className="w-full py-4 flex items-center justify-center text-lg"
                            >
                                {isLoadingSubmit ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Answer'
                                )}
                            </Button>
                        </form>
                    )}

                    {selectedDoubt.status === 'answered' && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                            <CheckCircle className="mx-auto mb-3 text-green-600" size={48} />
                            <p className="text-green-800 font-bold text-xl">Doubt Resolved!</p>
                            <p className="text-green-600 text-sm mt-1">Select another pending doubt to continue helping students.</p>
                            <Button 
                                variant="secondary" 
                                onClick={() => setSelectedDoubt(null)} 
                                className="mt-4 bg-white text-green-600 hover:bg-green-100"
                            >
                                Clear Panel
                            </Button>
                        </div>
                    )}
                </motion.div>
              ) : (
                <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center min-h-[400px] bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-inner"
                >
                    <div className="text-center p-8">
                        <MessageSquare className="mx-auto mb-3 text-gray-400" size={64} />
                        <p className="text-gray-500 font-semibold text-lg">Click a doubt on the left to start responding.</p>
                        <p className="text-gray-400 text-sm mt-1">Be sure to provide detailed and helpful answers!</p>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-[#00C9A7] to-[#00b396] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 z-50"
          >
            <CheckCircle size={24} />
            <span className="font-semibold">Answer Submitted Successfully! Doubt resolved.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};