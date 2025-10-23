// src/components/RecommendationContent.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Link, RefreshCw } from 'lucide-react';
import { Card } from './Card'; // Assuming Card is imported correctly

// UPDATED Skill type to include 'ml'
type Skill = 'dsa' | 'webdev' | 'ml';
type Level = 'beginner' | 'intermediate' | 'advanced';

interface Recommendation {
    title: string;
    level: Level;
    videos: { title: string; url: string }[];
    studyMaterial: { title: string; url: string }[];
}

const recommendations: Record<Skill, Recommendation[]> = {
    dsa: [
        {
            title: 'DSA Fundamentals: Get Started',
            level: 'beginner',
            videos: [
                { title: 'DSA in 100 Minutes - A Quick Overview', url: 'https://www.youtube.com/watch?v=RBSGKlAEO-U' },
                { title: 'Arrays, Linked Lists, and Memory Allocation', url: 'https://www.youtube.com/watch?v=S5o5t0KkU-o' },
            ],
            studyMaterial: [
                { title: 'Introduction to Algorithms (CLRS) - Chapter 1', url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition' },
                { title: 'GeeksforGeeks DSA Self-Paced Course (Basic)', url: 'https://www.geeksforgeeks.org/data-structures-algorithms-self-paced-course/' },
            ],
        },
        {
            title: 'Intermediate DSA: Dive Deeper',
            level: 'intermediate',
            videos: [
                { title: 'Understanding Hash Tables and Collision Handling', url: 'https://www.youtube.com/watch?v=sfm1_yyR-p4' },
                { title: 'Quick Sort vs. Merge Sort Explained', url: 'https://www.youtube.com/watch?v=ZZuD63TogAY' },
            ],
            studyMaterial: [
                { title: 'LeetCode Top Interview Questions (Medium)', url: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM&topicSlugs=data-structure' },
                { title: 'HackerRank Data Structures Challenges', url: 'https://www.hackerrank.com/domains/data-structures' },
            ],
        },
        {
            title: 'Advanced DSA: Mastery and Competition',
            level: 'advanced',
            videos: [
                { title: 'Advanced Graph Algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall)', url: 'https://www.youtube.com/watch?v=Akj99Y9jJ7s' },
                { title: 'Dynamic Programming Concepts and Examples', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk' },
            ],
            studyMaterial: [
                { title: 'TopCoder Tutorials - Advanced Topics', url: 'https://www.topcoder.com/community/tutorials/' },
                { title: 'Introduction to Competitive Programming (CP-Algorithms)', url: 'https://cp-algorithms.com/' },
            ],
        },
    ],
    webdev: [
        {
            title: 'Web Dev Basics: HTML, CSS, JS',
            level: 'beginner',
            videos: [
                { title: 'HTML and CSS Crash Course for Beginners', url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc' },
                { title: 'JavaScript Fundamentals - The Complete Guide', url: 'https://www.youtube.com/watch?v=W6NZfCO5sks' },
            ],
            studyMaterial: [
                { title: 'MDN Web Docs: HTML & CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
                { title: 'freeCodeCamp Responsive Web Design Certification', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' },
            ],
        },
        {
            title: 'Intermediate Web Dev: Frameworks and APIs',
            level: 'intermediate',
            videos: [
                { title: 'React JS Crash Course for 2024', url: 'https://www.youtube.com/watch?v=Dorf8i6Uae0' },
                { title: 'Understanding REST APIs and Fetch/Axios', url: 'https://www.youtube.com/watch?v=BN_G0sM-s1Q' },
            ],
            studyMaterial: [
                { title: 'The Road to React (Book)', url: 'https://www.roadtoreact.com/' },
                { title: 'CSS-Tricks: Flexbox and Grid Guides', url: 'https://css-tricks.com/guides/a-complete-guide-to-flexbox/' },
            ],
        },
        {
            title: 'Advanced Web Dev: Full-Stack and DevOps',
            level: 'advanced',
            videos: [
                { title: 'Building a Full-Stack App with Next.js/MERN Stack', url: 'https://www.youtube.com/watch?v=wm5gSINJ8Q0' },
                { title: 'Authentication and Authorization Best Practices', url: 'https://www.youtube.com/watch?v=W5tGg0Xm_4c' },
            ],
            studyMaterial: [
                { title: 'Full-Stack Open Course (University of Helsinki)', url: 'https://fullstackopen.com/en/' },
                { title: 'OWASP Top 10 for Developers', url: 'https://owasp.org/www-project-top-ten/' },
            ],
        },
    ],
    // NEW MACHINE LEARNING / DATA SCIENCE RECOMMENDATIONS
    ml: [
        {
            title: 'ML & Python Foundations: Data Analysis',
            level: 'beginner',
            videos: [
                { title: 'Python for Data Science Crash Course (Pandas/NumPy)', url: 'https://www.youtube.com/watch?v=vmEaB319qSg' },
                { title: 'Introduction to Linear Regression and Supervised Learning', url: 'https://www.youtube.com/watch?v=E50gN4c8QoE' },
            ],
            studyMaterial: [
                { title: 'Kaggle Learn - Intro to Machine Learning', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
                { title: 'Coursera - Machine Learning Specialization (Part 1)', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
            ],
        },
        {
            title: 'Intermediate ML: Model Building & Evaluation',
            level: 'intermediate',
            videos: [
                { title: 'Hyperparameter Tuning and Cross-Validation Explained', url: 'https://www.youtube.com/watch?v=Akj99Y9jJ7s' },
                { title: 'Decision Trees, Random Forests, and Ensemble Methods', url: 'https://www.youtube.com/watch?v=J_B04C-kR-4' },
            ],
            studyMaterial: [
                { title: 'Scikit-learn Documentation: User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' },
                { title: 'Hands-On Machine Learning with Scikit-Learn (Book)', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/' },
            ],
        },
        {
            title: 'Advanced ML: Deep Learning & Production',
            level: 'advanced',
            videos: [
                { title: 'Introduction to PyTorch and Neural Networks', url: 'https://www.youtube.com/watch?v=vV_zW4d31wY' },
                { title: 'MLOps: Deployment, Monitoring, and Scaling', url: 'https://www.youtube.com/watch?v=i9Yp0iF711c' },
            ],
            studyMaterial: [
                { title: 'Deep Learning Book (Goodfellow et al.)', url: 'https://www.deeplearningbook.org/' },
                { title: 'Papers with Code (Latest research)', url: 'https://paperswithcode.com/' },
            ],
        },
    ],
};

interface RecommendationContentProps {
    skill: Skill;
    level: Level;
    onReset: () => void;
}

// Helper function to format the skill title
const formatSkillTitle = (skill: Skill) => {
    switch (skill) {
        case 'dsa':
            return 'DSA';
        case 'webdev':
            return 'Web Development';
        case 'ml':
            return 'ML/Data Science';
        default:
            return 'Skill';
    }
};

export const RecommendationContent: React.FC<RecommendationContentProps> = ({ skill, level, onReset }) => {
    const data = recommendations[skill].find(r => r.level === level)!;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-extrabold text-indigo-700 capitalize">
                    Your {formatSkillTitle(skill)} Path
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReset}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    <RefreshCw size={18} />
                    <span>Retake Assessment</span>
                </motion.button>
            </div>

            <Card className={`p-6 mb-8 bg-gradient-to-r from-white to-indigo-50 border-l-4 ${level === 'beginner' ? 'border-green-500' : level === 'intermediate' ? 'border-yellow-500' : 'border-red-500'}`}>
                <p className="text-xl font-semibold text-gray-700">
                    Based on your answers, your current knowledge level in <span className="font-extrabold capitalize">{formatSkillTitle(skill)}</span> is <span className="capitalize">{level}</span>.
                </p>
                <p className="mt-2 text-gray-500">
                    Here is a personalized collection of resources to help you reach the next level.
                </p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* YouTube Video Recommendations */}
                <Card className="bg-white p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                        <Youtube size={30} className="text-red-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-800">Video Recommendations</h3>
                    </div>
                    <ul className="space-y-4">
                        {data.videos.map((video, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-3 border-b border-gray-100 hover:bg-red-50 rounded-md transition"
                            >
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-red-600 font-medium">
                                    <Youtube size={18} className="mr-2 flex-shrink-0" />
                                    <span className="truncate">{video.title}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </Card>

                {/* Study Material Recommendations */}
                <Card className="bg-white p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                        <Link size={30} className="text-blue-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-800">Study Material & Links</h3>
                    </div>
                    <ul className="space-y-4">
                        {data.studyMaterial.map((material, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-3 border-b border-gray-100 hover:bg-blue-50 rounded-md transition"
                            >
                                <a href={material.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                                    <Link size={18} className="mr-2 flex-shrink-0" />
                                    <span className="truncate">{material.title}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </Card>
            </div>
        </motion.div>
    );
};