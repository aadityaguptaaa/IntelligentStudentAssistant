// frontend/src/components/SkillAssessment.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, BrainCircuit, X } from 'lucide-react';
import { Card } from './Card'; // Assuming Card is in the same 'components' directory

// --- 💡 1. DEFINE/EXPORT DYNAMIC ML INSIGHTS TYPE ---
// This interface defines the data structure that updates the main Dashboard.
export interface DynamicMLInsights {
    predictedScore: number; // Used for the gauge/score on the Dashboard
    weaknessTopic: string; // Used for the Critical Area
    learningMilestone: string; // Used for the Personalized Learning Pathway
}

// --- 💡 2. COMPONENT PROPS: ACCEPT CALLBACK ---
interface SkillAssessmentProps {
    onAssessmentComplete: (results: DynamicMLInsights) => void;
}

// Updated Skill type to include 'ml'
type Skill = 'dsa' | 'webdev' | 'ml';

interface Question {
    id: number;
    question: string;
    options: { text: string; level: 'beginner' | 'intermediate' | 'advanced' }[];
}

// (DSA, Webdev, ML question data remains the same)
// ... [dsaQuestions, webdevQuestions, mlQuestions arrays] ...

const dsaQuestions: Question[] = [
    {
        id: 1,
        question: 'How would you find the time complexity of an algorithm?',
        options: [
            { text: 'I don\'t know what time complexity is.', level: 'beginner' },
            { text: 'I use Big O notation, but I struggle with recursion.', level: 'intermediate' },
            { text: 'I can analyze iterative and recursive functions using Big O, Omega, and Theta.', level: 'advanced' },
        ],
    },
    {
        id: 2,
        question: 'Which of these data structures do you feel most comfortable with?',
        options: [
            { text: 'Arrays and basic lists.', level: 'beginner' },
            { text: 'Stacks, Queues, Linked Lists, and Hash Maps.', level: 'intermediate' },
            { text: 'Trees (AVL, Red-Black), Heaps, and Graphs.', level: 'advanced' },
        ],
    },
    {
        id: 3,
        question: 'What is your experience with sorting algorithms?',
        options: [
            { text: 'I only know simple sorts like Bubble Sort.', level: 'beginner' },
            { text: 'I can implement Merge Sort and Quick Sort.', level: 'intermediate' },
            { text: 'I understand their complexities, stability, and can apply them appropriately.', level: 'advanced' },
        ],
    },
];

const webdevQuestions: Question[] = [
    {
        id: 1,
        question: 'What is your experience with JavaScript (or a similar frontend language)?',
        options: [
            { text: 'I can write basic scripts to change HTML content.', level: 'beginner' },
            { text: 'I understand DOM manipulation and asynchronous operations (Promises).', level: 'intermediate' },
            { text: 'I master modern features, state management, and have built a multi-page app.', level: 'advanced' },
        ],
    },
    {
        id: 2,
        question: 'Which of these best describes your CSS skills?',
        options: [
            { text: 'I use basic selectors and inline styles.', level: 'beginner' },
            { text: 'I can use Flexbox and/or Grid for responsive layouts.', level: 'intermediate' },
            { text: 'I utilize preprocessors (SASS/LESS) or utility frameworks (Tailwind) and understand animations.', level: 'advanced' },
        ],
    },
    {
        id: 3,
        question: 'How familiar are you with backend concepts (APIs, Databases)?',
        options: [
            { text: 'I only know what they are in theory.', level: 'beginner' },
            { text: 'I can consume REST APIs and perform basic CRUD operations.', level: 'intermediate' },
            { text: 'I can design a schema, build a secure RESTful API, and manage authentication.', level: 'advanced' },
        ],
    },
];

const mlQuestions: Question[] = [
    {
        id: 1,
        question: 'What is your experience with model training and evaluation?',
        options: [
            { text: 'I can load a dataset but struggle to choose a model.', level: 'beginner' },
            { text: 'I can train basic models (Linear/Logistic Regression) and use metrics like Accuracy and F1-Score.', level: 'intermediate' },
            { text: 'I regularly use Cross-Validation, interpret ROC/AUC, and tune hyper-parameters effectively.', level: 'advanced' },
        ],
    },
    {
        id: 2,
        question: 'Which ML paradigm are you most comfortable implementing?',
        options: [
            { text: 'Basic supervised learning tasks like prediction.', level: 'beginner' },
            { text: 'Supervised and basic unsupervised (K-Means, PCA).', level: 'intermediate' },
            { text: 'Deep Learning (CNNs/RNNs/Transformers) and Reinforcement Learning.', level: 'advanced' },
        ],
    },
    {
        id: 3,
        question: 'How do you handle data preprocessing and feature engineering?',
        options: [
            { text: 'I mostly use raw data and sometimes handle missing values.', level: 'beginner' },
            { text: 'I use techniques like scaling/normalization and one-hot encoding.', level: 'intermediate' },
            { text: 'I can design complex features, handle class imbalance, and manage time-series data.', level: 'advanced' },
        ],
    },
];


export const SkillAssessment: React.FC<SkillAssessmentProps> = ({ onAssessmentComplete }) => {
    const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<('beginner' | 'intermediate' | 'advanced')[]>([]);
    const [knowledgeLevel, setKnowledgeLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

    // Determine the active question set
    let questions: Question[];
    let skillName: string;
    switch (activeSkill) {
        case 'dsa':
            questions = dsaQuestions;
            skillName = 'Data Structures & Algorithms';
            break;
        case 'webdev':
            questions = webdevQuestions;
            skillName = 'Web Development';
            break;
        case 'ml':
            questions = mlQuestions;
            skillName = 'Machine Learning';
            break;
        default:
            questions = [];
            skillName = '';
    }

    const handleCardClick = (skill: Skill) => {
        setActiveSkill(skill);
        setCurrentQuestion(0);
        setAnswers([]);
        setKnowledgeLevel(null);
    };

    const handleAnswer = (level: 'beginner' | 'intermediate' | 'advanced') => {
        const newAnswers = [...answers, level];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Assessment complete, calculate level
            const scoreMap = { beginner: 1, intermediate: 2, advanced: 3 };
            const totalScore = newAnswers.reduce((sum, level) => sum + scoreMap[level], 0);
            const questionsLength = questions.length;
            
            let calculatedLevel: 'beginner' | 'intermediate' | 'advanced';
            if (totalScore >= questionsLength * 2.5) {
                calculatedLevel = 'advanced';
            } else if (totalScore >= questionsLength * 1.5) {
                calculatedLevel = 'intermediate';
            } else {
                calculatedLevel = 'beginner';
            }

            setKnowledgeLevel(calculatedLevel);
            
            // --- 💡 3. UPDATE CALCULATION & CALL CALLBACK ---
            const predictedScore = Math.min(100, Math.max(0, Math.round((totalScore / (questionsLength * 3)) * 100)));
            
            let weaknessTopic = `${skillName} - Foundational Knowledge`;
            if (calculatedLevel === 'intermediate') {
                weaknessTopic = `${skillName} - Advanced Topics`;
            } else if (calculatedLevel === 'advanced') {
                weaknessTopic = `${skillName} - Optimization & Implementation`;
            }

            const newInsights: DynamicMLInsights = {
                predictedScore: predictedScore,
                weaknessTopic: weaknessTopic,
                learningMilestone: `Focus on ${calculatedLevel.toUpperCase()} ${skillName} track.`,
            };
            
            // Call the callback to update the Dashboard state
            onAssessmentComplete(newInsights);
            // ----------------------------------------------------
        }
    };

    // This function is now only used to close the modal before it redirects to the dashboard.
    const closeModal = () => {
        setActiveSkill(null);
        setKnowledgeLevel(null);
        setCurrentQuestion(0);
        setAnswers([]);
    };

    // --- 💡 4. REMOVE RecommendationContent and SHOW SUBMISSION CONFIRMATION ---
    if (knowledgeLevel) {
        return (
            <div className="text-center p-10">
                <Card className="p-8 bg-indigo-50 shadow-2xl border-t-4 border-indigo-500">
                    <BrainCircuit size={48} className="text-indigo-600 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
                    <p className="text-lg text-gray-700 mb-4">Your calculated level is: <span className="text-indigo-600 font-extrabold text-4xl capitalize">{knowledgeLevel}</span> in {skillName}.</p>
                    
                    <p className="text-md text-gray-600">The Intelligent Assistant is now updating your Dashboard with the latest **Performance Forecast** and **Critical Weakness** based on these results.</p>
                    
                    <motion.button
                        onClick={closeModal} // This will redirect back to the main list view, which is fine as the dashboard update already happened via the callback
                        className="mt-6 px-6 py-3 bg-[#6C63FF] text-white font-semibold rounded-lg shadow-md hover:bg-[#5a52d5] transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Assessment Finished
                    </motion.button>
                </Card>
            </div>
        );
    }
    // -----------------------------------------------------------------------------

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Start Your Learning Path</h2>
            <p className="text-gray-600 mb-8">Assess your current knowledge in a field to get personalized, AI-driven recommendations.</p>

            {/* Grid for Skill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. DSA Card (remains the same) */}
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => handleCardClick('dsa')}
                    className="cursor-pointer"
                >
                    <Card className="bg-gradient-to-br from-[#6C63FF] to-[#8a84ff] text-white p-6 h-full flex flex-col justify-between">
                        <div>
                            <Code size={40} className="mb-4" />
                            <h3 className="text-2xl font-bold mb-1">Data Structures & Algorithms</h3>
                            <p className="text-sm opacity-90">The backbone of efficient problem-solving.</p>
                        </div>
                        <span className="mt-4 inline-block bg-white text-[#6C63FF] font-semibold py-1 px-4 rounded-full text-sm shadow-md">Start Assessment →</span>
                    </Card>
                </motion.div>

                {/* 2. Web Dev Card (remains the same) */}
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    onClick={() => handleCardClick('webdev')}
                    className="cursor-pointer"
                >
                    <Card className="bg-gradient-to-br from-[#00C9A7] to-[#12f0c7] text-white p-6 h-full flex flex-col justify-between">
                        <div>
                            <Layout size={40} className="mb-4" />
                            <h3 className="text-2xl font-bold mb-1">Web Development</h3>
                            <p className="text-sm opacity-90">Build interactive and dynamic applications.</p>
                        </div>
                        <span className="mt-4 inline-block bg-white text-[#00C9A7] font-semibold py-1 px-4 rounded-full text-sm shadow-md">Start Assessment →</span>
                    </Card>
                </motion.div>
                
                {/* 3. Machine Learning Card (remains the same) */}
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                    onClick={() => handleCardClick('ml')}
                    className="cursor-pointer"
                >
                    <Card className="bg-gradient-to-br from-[#FF6384] to-[#ff8e9b] text-white p-6 h-full flex flex-col justify-between">
                        <div>
                            <BrainCircuit size={40} className="mb-4" />
                            <h3 className="text-2xl font-bold mb-1">Machine Learning / Data Science</h3>
                            <p className="text-sm opacity-90">Explore data, build models, and predict the future.</p>
                        </div>
                        <span className="mt-4 inline-block bg-white text-[#FF6384] font-semibold py-1 px-4 rounded-full text-sm shadow-md">Start Assessment →</span>
                    </Card>
                </motion.div>

            </div>

            {/* Assessment Modal (Quiz in progress) */}
            {activeSkill && !knowledgeLevel && ( // Only show if skill is active and not yet finished
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative"
                    >
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
                            {skillName} Assessment
                        </h3>
                        <p className="text-gray-500 mb-6">Question {currentQuestion + 1} of {questions.length}</p>

                        {/* Question Content */}
                        <motion.div
                            key={currentQuestion}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <p className="text-lg font-semibold text-gray-700">{questions[currentQuestion].question}</p>
                            <div className="space-y-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAnswer(option.level)}
                                        className="w-full text-left p-4 border border-gray-200 rounded-lg transition-all duration-200 hover:bg-indigo-50 hover:border-indigo-500 hover:shadow-sm"
                                    >
                                        <p className="font-medium">{option.text}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            )}
        </div>
    );
};