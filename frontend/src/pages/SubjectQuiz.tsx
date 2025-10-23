import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { BookOpen, Clock, CheckCircle, XCircle, Award } from 'lucide-react'; 
import { DynamicMLInsights } from '../components/SkillsAssessment'; 

interface SubjectQuizProps {
    // onQuizComplete can accept null (to switch to dashboard without new data) or the insights object
    onQuizComplete: (results: DynamicMLInsights | null) => void; 
}

// 💡 QUIZ_DATA: Ensured 10 questions per subject
const QUIZ_DATA = {
    'Machine Learning': [
        { q: "What is the goal of a loss function?", options: ["Minimize error", "Maximize features", "Speed up training", "Normalize data"], a: "Minimize error", topic: "Fundamentals" },
        { q: "Which algorithm is non-parametric?", options: ["Linear Regression", "Logistic Regression", "k-Nearest Neighbors (k-NN)", "Support Vector Machines"], a: "k-Nearest Neighbors (k-NN)", topic: "Algorithm Types" },
        { q: "What does 'Bias' in ML refer to?", options: ["Model's ability to fit complex data", "Error due to overly simple assumptions", "Amount of noise in the data", "Model's variance"], a: "Error due to overly simple assumptions", topic: "Model Evaluation" },
        { q: "What is backpropagation used for?", options: ["Feature selection", "Weight adjustment", "Data normalization", "Activation function"], a: "Weight adjustment", topic: "Neural Networks" },
        { q: "Which metric is best for imbalanced datasets?", options: ["Accuracy", "Precision", "Recall", "F1-Score"], a: "F1-Score", topic: "Model Evaluation" },
        { q: "What is the primary purpose of a validation set?", options: ["Training the model", "Testing the final model", "Tuning hyperparameters", "Data cleaning"], a: "Tuning hyperparameters", topic: "Model Evaluation" },
        { q: "In Python, which library is typically used for ML?", options: ["Numpy", "Pandas", "Scikit-learn", "Matplotlib"], a: "Scikit-learn", topic: "Libraries" },
        { q: "What is 'Overfitting'?", options: ["Model fits training data too well", "Model is too simple", "Model is too slow", "Data is noisy"], a: "Model fits training data too well", topic: "Concepts" },
        { q: "What is an activation function used for in a neural network?", options: ["Calculating input sum", "Introducing non-linearity", "Normalizing weights", "Preventing overfitting"], a: "Introducing non-linearity", topic: "Neural Networks" },
        { q: "Which type of learning involves no labeled data?", options: ["Supervised", "Reinforcement", "Unsupervised", "Semi-Supervised"], a: "Unsupervised", topic: "Learning Types" },
    ],
    'Mathematics': [
        { q: "What is the derivative of $x^2$?", options: ["x", "2x", "$x^3/3$", "2"], a: "2x", topic: "Calculus" },
        { q: "The dot product of two orthogonal vectors is always:", options: ["1", "Their magnitude product", "0", "Undefined"], a: "0", topic: "Linear Algebra" },
        { q: "What is the result of $2^0$?", options: ["2", "1", "0", "Undefined"], a: "1", topic: "Algebra" },
        { q: "In statistics, what measures the spread of data?", options: ["Mean", "Median", "Mode", "Standard Deviation"], a: "Standard Deviation", topic: "Statistics" },
        { q: "What is the integral of 1 with respect to x?", options: ["0", "1", "x + C", "$x^2$"], a: "x + C", topic: "Calculus" },
        { q: "What type of matrix is equal to its own transpose?", options: ["Diagonal", "Identity", "Symmetric", "Skew-Symmetric"], a: "Symmetric", topic: "Linear Algebra" },
        { q: "A rational number can be written as a fraction $\\frac{p}{q}$ where $q$ is not:", options: ["1", "Prime", "0", "Negative"], a: "0", topic: "Number Theory" },
        { q: "The sum of angles in a triangle is (in degrees):", options: ["90", "180", "270", "360"], a: "180", topic: "Geometry" },
        { q: "What is the logarithm base 10 of 100?", options: ["1", "10", "2", "0"], a: "2", topic: "Logarithms" },
        { q: "If $f(x) = 3x + 1$, what is $f(2)$?", options: ["3", "7", "10", "5"], a: "7", topic: "Functions" },
    ],
    'Artificial Intelligence': [
        { q: "What is a heuristic function in AI search?", options: ["A search strategy", "A greedy algorithm", "An evaluation function", "A probability distribution"], a: "An evaluation function", topic: "Search Algorithms" },
        { q: "Turing test assesses a machine's ability to:", options: ["Compute numbers", "Learn from data", "Exhibit intelligent behavior", "Pass security checks"], a: "Exhibit intelligent behavior", topic: "Fundamentals" },
        { q: "What is the state space in an AI problem?", options: ["All possible states and actions", "The final goal state", "The initial state", "The set of all agents"], a: "All possible states and actions", topic: "Problem Solving" },
        { q: "Which AI field deals with uncertainty and probability?", options: ["Logic programming", "Knowledge representation", "Bayesian networks", "Robotics"], a: "Bayesian networks", topic: "Uncertainty" },
        { q: "What does NLP stand for?", options: ["Natural Language Planning", "Neural Logic Processing", "Natural Language Processing", "Network Layer Protocol"], a: "Natural Language Processing", topic: "Fields" },
        { q: "What is the main challenge of the 'Frame Problem'?", options: ["Vision processing speed", "Deciding what changes and what stays the same", "Generating natural speech", "Training large models"], a: "Deciding what changes and what stays the same", topic: "Logic & Planning" },
        { q: "Which search algorithm always finds the shortest path?", options: ["Depth-First Search", "Breadth-First Search", "Hill Climbing", "A* Search"], a: "A* Search", topic: "Search Algorithms" },
        { q: "An AI agent that makes decisions based only on the current percept is:", options: ["Goal-based", "Utility-based", "Simple Reflex", "Learning"], a: "Simple Reflex", topic: "Agents" },
        { q: "Which AI concept deals with making optimal sequential decisions?", options: ["Constraint satisfaction", "Reinforcement Learning", "Fuzzy Logic", "Expert Systems"], a: "Reinforcement Learning", topic: "Learning Types" },
        { q: "In AI, an 'Expert System' mimics the decision-making of a:", options: ["Robot", "Human expert", "Computer network", "Database"], a: "Human expert", topic: "Applications" },
    ],
    'FLA': [ 
        { q: "What does a Regular Expression define?", options: ["Context-free grammar", "Regular language", "Turing machine", "Pushdown automaton"], a: "Regular language", topic: "Regular Languages" },
        { q: "What is the simplest type of automaton?", options: ["Pushdown Automaton", "Linear Bounded Automaton", "Turing Machine", "Finite Automaton"], a: "Finite Automaton", topic: "Automata Theory" },
        { q: "Context-Free Languages are accepted by which machine?", options: ["Finite Automaton", "Turing Machine", "Pushdown Automaton", "Linear Bounded Automaton"], a: "Pushdown Automaton", topic: "Language Hierarchy" },
        { q: "The Chomsky Hierarchy ranks languages based on:", options: ["Size", "Complexity of Grammar", "Speed of recognition", "Alphabet size"], a: "Complexity of Grammar", topic: "Chomsky Hierarchy" },
        { q: "A language accepted by a Turing Machine is called:", options: ["Context-Free", "Recursive", "Regular", "Context-Sensitive"], a: "Recursive", topic: "Turing Machines" },
        { q: "What is the role of a 'stack' in a Pushdown Automaton (PDA)?", options: ["Finite memory", "Infinite tape", "Extra temporary memory", "Input tape"], a: "Extra temporary memory", topic: "PDA" },
        { q: "If a language is regular, is it also context-free?", options: ["Always", "Never", "Sometimes", "Only if deterministic"], a: "Always", topic: "Language Hierarchy" },
        { q: "Which type of automaton is used to recognize C-like programming languages?", options: ["Finite Automaton", "Turing Machine", "Linear Bounded Automaton", "Pushdown Automaton"], a: "Pushdown Automaton", topic: "Applications" },
        { q: "What is a 'string' in Formal Language theory?", options: ["A file", "A sequence of symbols from an alphabet", "A list of states", "A set of rules"], a: "A sequence of symbols from an alphabet", topic: "Fundamentals" },
        { q: "The transition function $\\delta$ in an NFA can map to:", options: ["Only one state", "Multiple states", "No state", "Only the final state"], a: "Multiple states", topic: "NFA/DFA" },
    ],
    'Information Storage and Management': [
        { q: "RAID 0 offers:", options: ["Redundancy", "Stripping", "Mirroring", "Parity"], a: "Stripping", topic: "Storage Basics" },
        { q: "Which RAID level involves mirroring?", options: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"], a: "RAID 1", topic: "RAID" },
        { q: "The primary purpose of deduplication is to:", options: ["Increase write speed", "Reduce storage space", "Improve latency", "Enhance security"], a: "Reduce storage space", topic: "Data Management" },
        { q: "SAN typically uses which protocol?", options: ["NFS", "SMB", "iSCSI/Fibre Channel", "HTTP"], a: "iSCSI/Fibre Channel", topic: "Networked Storage" },
        { q: "NAS provides storage at the:", options: ["Block level", "Byte level", "File level", "Database level"], a: "File level", topic: "Networked Storage" },
        { q: "What term describes the time taken to find a specific track on a disk?", options: ["Rotational Latency", "Seek Time", "Transfer Rate", "Throughput"], a: "Seek Time", topic: "Disk Technology" },
        { q: "In a hierarchical storage management system, what is the fastest tier?", options: ["Tape", "Cloud", "Solid State Drive (SSD)", "Hard Disk Drive (HDD)"], a: "Solid State Drive (SSD)", topic: "Storage Tiers" },
        { q: "Data archival is primarily focused on:", options: ["High availability", "Long-term retention and compliance", "Fast access", "High performance"], a: "Long-term retention and compliance", topic: "Backup & Recovery" },
        { q: "Which type of storage is volatile (loses data when power is off)?", options: ["HDD", "SSD", "RAM", "CD-ROM"], a: "RAM", topic: "Memory Basics" },
        { q: "What is a major advantage of object storage?", options: ["Fast random access", "File locking", "Scalability and metadata handling", "Compatibility with legacy OS"], a: "Scalability and metadata handling", topic: "Storage Types" },
    ],
    'Computer Network': [
        { q: "Which layer is responsible for logical addressing (IP)?", options: ["Physical", "Data Link", "Network", "Transport"], a: "Network", topic: "OSI Model" },
        { q: "TCP operates at which layer of the OSI model?", options: ["Network", "Data Link", "Application", "Transport"], a: "Transport", topic: "OSI Model" },
        { q: "What device connects different networks and uses IP addresses?", options: ["Hub", "Switch", "Repeater", "Router"], a: "Router", topic: "Devices" },
        { q: "What is the primary function of DNS?", options: ["Encryption", "Translating domain names to IP addresses", "Routing packets", "Managing network traffic"], a: "Translating domain names to IP addresses", topic: "Protocols" },
        { q: "What is the standard port for HTTP?", options: ["21", "23", "80", "443"], a: "80", "topic": "Protocols" },
        { q: "MAC address is used at which layer?", options: ["Physical", "Data Link", "Network", "Transport"], a: "Data Link", topic: "Addressing" },
        { q: "What does the acronym DHCP stand for?", options: ["Data Host Control Protocol", "Dynamic Host Configuration Protocol", "Domain Host Control Process", "Digital Handshake Protocol"], a: "Dynamic Host Configuration Protocol", topic: "Protocols" },
        { q: "Collision detection is a key feature of which protocol?", options: ["CSMA/CD (Ethernet)", "Token Ring", "FDDI", "CDMA"], a: "CSMA/CD (Ethernet)", topic: "Access Methods" },
        { q: "What is the maximum number of bits in an IPv4 address?", options: ["16", "32", "64", "128"], a: "32", topic: "Addressing" },
        { q: "What is the goal of subnetting?", options: ["Increase network speed", "Decrease latency", "Improve security and manageability", "Replace routers"], a: "Improve security and manageability", topic: "IP Subnetting" },
    ],
};

const TIME_LIMIT = 10 * 60; // 10 minutes in seconds

export const SubjectQuiz: React.FC<SubjectQuizProps> = ({ onQuizComplete }) => {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [currentQuestions, setCurrentQuestions] = useState<{ q: string; options: string[]; a: string; topic: string; }[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timer, setTimer] = useState(TIME_LIMIT);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // State to hold comprehensive results
    const [resultBreakdown, setResultBreakdown] = useState<{ score: number | null, correct: number, wrong: number, total: number }>({
        score: null, correct: 0, wrong: 0, total: 0
    });

    // Function to format time
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const resetQuiz = () => {
        setSelectedSubject(null);
        setCurrentQuestions([]);
        setAnswers({});
        setTimer(TIME_LIMIT);
        setIsSubmitted(false);
        setResultBreakdown({ score: null, correct: 0, wrong: 0, total: 0 });
    }

    const handleChange = (qIndex: number, selectedOption: string) => {
        setAnswers(prev => ({ ...prev, [qIndex]: selectedOption }));
    };

    // 💡 FIX: Define handleSubmit using useCallback *before* useEffect
    const handleSubmit = useCallback(() => {
        if (isSubmitted) return; 
        
        let correctCount = 0;
        const incorrectTopics: Record<string, number> = {};
        const totalQuestions = currentQuestions.length;

        currentQuestions.forEach((q, index) => {
            if (answers[index] === q.a) {
                correctCount++;
            } else {
                // If the answer is missing or incorrect
                incorrectTopics[q.topic] = (incorrectTopics[q.topic] || 0) + 1;
            }
        });
        
        const wrongCount = totalQuestions - correctCount;
        const finalScore = Math.round((correctCount / totalQuestions) * 100); 

        // Update the local state with the breakdown
        setResultBreakdown({
            score: finalScore,
            correct: correctCount,
            wrong: wrongCount,
            total: totalQuestions
        });

        setIsSubmitted(true);

        // --- ML LOGIC SIMULATION ---
        let weaknessTopic = "No critical weakness detected.";
        let highestIncorrectCount = 0;

        for (const topic in incorrectTopics) {
            if (incorrectTopics[topic] > highestIncorrectCount) {
                highestIncorrectCount = incorrectTopics[topic];
                weaknessTopic = topic;
            }
        }
        
        if (highestIncorrectCount > 0) {
            weaknessTopic = `${selectedSubject} - ${weaknessTopic}`;
        } else if (finalScore < 80) {
             weaknessTopic = `Advanced ${selectedSubject} concepts`;
        }

        const learningMilestone = finalScore < 60 ? `Review ${selectedSubject} Fundamentals` : (finalScore < 85 ? `Practice ${selectedSubject} Intermediate` : `Master ${selectedSubject} Concepts`);

        const newInsights: DynamicMLInsights = {
            predictedScore: finalScore,
            weaknessTopic: weaknessTopic,
            learningMilestone: learningMilestone,
        };
        
        // 💾 LOCAL STORAGE: Store the latest quiz results in Local Storage
        try {
            localStorage.setItem('latestQuizInsights', JSON.stringify(newInsights));
            localStorage.setItem('latestQuizSubject', selectedSubject!); // Save the subject too
        } catch (error) {
            console.error("Could not save to Local Storage:", error);
        }

        // Pass the dynamic results back to the parent
        onQuizComplete(newInsights); 
    }, [answers, currentQuestions, selectedSubject, isSubmitted, onQuizComplete]); // All external deps are included
    
    // --- Timer Logic ---
    useEffect(() => {
        if (selectedSubject && !isSubmitted && timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0 && selectedSubject && !isSubmitted) {
            handleSubmit(); // ✅ Now `handleSubmit` is in scope
        }
    }, [selectedSubject, isSubmitted, timer, handleSubmit]); // Dependency array is correct
    
    const handleSubjectSelect = (subject: string) => {
        const questions = QUIZ_DATA[subject as keyof typeof QUIZ_DATA] || [];
        
        setSelectedSubject(subject);
        setCurrentQuestions(questions.slice(0, 10)); 
        setTimer(TIME_LIMIT);
        setAnswers({});
        setIsSubmitted(false);
        setResultBreakdown({ score: null, correct: 0, wrong: 0, total: questions.length });
    };

    // --- Render Subject Selection Screen ---
    if (!selectedSubject) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 w-full min-h-[80vh]">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookOpen size={30} className="mr-3 text-indigo-500" /> Choose a Subject for Quiz
                </h1>
                <p className="text-gray-600 mb-8">Your results will immediately update your Dashboard's weakness prediction. Each quiz has **10 timed questions**.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.keys(QUIZ_DATA).map(subject => (
                        <motion.div
                            key={subject}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSubjectSelect(subject)}
                            className="p-6 bg-white border border-gray-200 rounded-xl cursor-pointer text-center"
                        >
                            <BookOpen size={36} className="text-indigo-500 mx-auto mb-3" />
                            <h2 className="text-lg font-semibold text-gray-800">{subject}</h2>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }
    
    // --- Render Quiz Completion Screen ---
    if (isSubmitted && resultBreakdown.score !== null) {
        const { score, correct, wrong } = resultBreakdown;
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-10 h-full flex flex-col justify-center">
                <Card className="p-10 bg-white shadow-2xl border-t-8 border-green-500 max-w-lg mx-auto w-full">
                    <Award size={48} className="text-green-600 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results: {selectedSubject}</h2>
                    
                    <div className="mb-8">
                        <p className="text-lg text-gray-700">Final Score: {correct}/{resultBreakdown.total}</p>
                        <p className="text-green-600 font-extrabold text-7xl mb-4">{score}%</p>
                        
                        <div className="flex justify-center space-x-10 text-xl font-semibold">
                            <div className="text-green-600 flex items-center">
                                <CheckCircle size={24} className="mr-2" /> Correct: **{correct}**
                            </div>
                            <div className="text-red-600 flex items-center">
                                <XCircle size={24} className="mr-2" /> Wrong: **{wrong}**
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-md text-gray-600 mb-6">
                        The Intelligent Assistant has processed your results. Your **Dashboard** has been updated with a new **Critical Area** and **Performance Forecast**.
                    </p>
                    
                    <div className="flex flex-col space-y-4">
                        <motion.button
                            onClick={() => onQuizComplete(null)} // Pass null to trigger switch without new data
                            className="px-6 py-3 bg-[#6C63FF] text-white font-bold rounded-lg shadow-md hover:bg-[#5a52d5] transition"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Go to Dashboard to See Updated Insights
                        </motion.button>
                        <motion.button
                            onClick={resetQuiz}
                            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Take Another Quiz
                        </motion.button>
                    </div>
                </Card>
            </motion.div>
        );
    }
    
    // --- Render Timed Quiz Screen ---
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Quiz: {selectedSubject}</h1>
                <div className={`flex items-center text-xl font-bold px-3 py-1 rounded-full ${timer <= 60 ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    <Clock size={20} className="mr-2" />
                    Time Left: {formatTime(timer)}
                </div>
            </div>
            
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                {currentQuestions.map((q, index) => (
                    <Card key={index} className="p-6">
                        <p className="font-semibold text-lg text-gray-800 mb-4">
                            {index + 1}. {q.q}
                            <span className="text-xs ml-2 px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">{q.topic}</span>
                        </p>
                        <div className="space-y-3">
                            {currentQuestions[index].options.map((option, optIndex) => (
                                <motion.div 
                                    key={optIndex}
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                        answers[index] === option ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleChange(index, option)}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        checked={answers[index] === option}
                                        onChange={() => handleChange(index, option)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mr-3"
                                    />
                                    <label className="text-gray-700 font-medium">{option}</label>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            <motion.button
                onClick={handleSubmit}
                className={`mt-6 w-full px-6 py-4 font-bold text-white rounded-xl shadow-lg transition-colors bg-[#00C9A7] hover:bg-[#00b396]`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                Submit Quiz ({Object.keys(answers).length}/{currentQuestions.length} answered)
            </motion.button>
        </motion.div>
    );
};