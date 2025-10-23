// src/components/Dashboard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, TrendingDown, BookOpen, Clock, Lightbulb } from 'lucide-react';
import { Card } from './Card';
// Ensure DynamicMLInsights is imported. Assuming it's in the same directory structure.
import { DynamicMLInsights } from './SkillsAssessment'; 

// --- STATIC/DEFAULT DATA for rich context when dynamic data is missing or for additional features ---
const STATIC_ML_INSIGHTS = {
    // 1. Learning Pathway Model (Used if dynamic data doesn't cover this)
    nextMilestone: {
        topic: 'Dynamic Programming (Knapsack Problem)',
        estimatedDays: 7,
        link: 'videos', // Tab ID
    },
    // 2. Weakness Predictor Model (Used for default reason/confidence)
    defaultWeakness: 'Asymptotic Notation (Big O)',
    defaultConfidence: 92,
    defaultReason: 'Low quiz accuracy and high doubt frequency in related material.',
    defaultActionLink: 'videos',
    // 3. Performance Forecast Model (Used for default trend/range)
    defaultConfidenceRange: '± 5%',
    defaultTrend: 'Neutral',
};

// Component to visualize the Performance Forecast
const PerformanceGauge = ({ score, trend }: { score: number, trend: string }) => (
    <div className="text-center p-4">
        <div className="relative w-32 h-32 mx-auto mb-3">
            {/* Simple circular gauge simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={score > 80 ? '#00C9A7' : score > 60 ? '#FFD700' : '#FF6384'}
                    strokeWidth="10"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 2 * Math.PI * 45,
                        strokeDashoffset: (1 - score / 100) * (2 * Math.PI * 45),
                    }}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: (1 - score / 100) * (2 * Math.PI * 45) }}
                    transition={{ duration: 1.5 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{score}</span>
                <span className="text-xs text-gray-500">Predicted Score</span>
            </div>
        </div>
        <div className={`flex items-center justify-center text-sm font-semibold mt-2 ${trend === 'Positive' ? 'text-green-600' : trend === 'Negative' ? 'text-red-600' : 'text-gray-600'}`}>
            {trend === 'Positive' ? <TrendingUp size={16} className="mr-1" /> : trend === 'Negative' ? <TrendingDown size={16} className="mr-1" /> : <Clock size={16} className="mr-1" />}
            Trend: {trend}
        </div>
    </div>
);

// 💡 FIX: DashboardProps now correctly includes mlInsights
interface DashboardProps {
    onNavigate: (tabId: string) => void;
    mlInsights: DynamicMLInsights | null;
}

// 💡 FIX: Updated component signature to destructure mlInsights
export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, mlInsights }) => {
    
    // --- Dynamic Data Mapping ---
    // Use dynamic data from the quiz/assessment, or fall back to defaults
    const predictedScore = mlInsights?.predictedScore ?? 0; // Use 0 for gauge if null
    const weaknessTopic = mlInsights?.weaknessTopic ?? STATIC_ML_INSIGHTS.defaultWeakness;
    const nextMilestone = mlInsights?.learningMilestone ?? STATIC_ML_INSIGHTS.nextMilestone.topic;

    const trend = (predictedScore > 80) ? 'Positive' : (predictedScore > 60) ? 'Neutral' : 'Negative';

    // Set CTA link based on whether dynamic insights are available
    const ctaLink = weaknessTopic !== STATIC_ML_INSIGHTS.defaultWeakness ? STATIC_ML_INSIGHTS.defaultActionLink : 'assess-skills';
    const ctaText = weaknessTopic !== STATIC_ML_INSIGHTS.defaultWeakness ? 'Fix Weakness Now' : 'Take First Assessment';
    
    // Set a dynamic reason/confidence for the card
    const weaknessReason = mlInsights ? `Based on your latest quiz score (${predictedScore}%) and incorrect topics.` : STATIC_ML_INSIGHTS.defaultReason;
    const confidence = mlInsights ? 100 : STATIC_ML_INSIGHTS.defaultConfidence;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-7xl mx-auto"
        >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
                <Zap className="mr-3 text-indigo-500" size={36} /> Intelligent Student Dashboard
            </h1>
            <p className="text-gray-600 mb-8 font-medium">
                Real-time insights powered by your learning data and pre-trained Machine Learning models.
            </p>

            {/* Main Grid for ML Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                {/* 1. Performance Forecast (Dynamic) */}
                <Card className="p-6 bg-white shadow-2xl border-t-4 border-indigo-500">
                    <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
                        <TrendingUp className="mr-2" size={24} /> Performance Forecast
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Prediction based on your **latest activity** and model analysis.
                    </p>
                    <PerformanceGauge
                        score={predictedScore}
                        trend={trend}
                    />
                    <p className="text-sm text-center text-gray-500 mt-2">
                        Confidence Range: {STATIC_ML_INSIGHTS.defaultConfidenceRange}
                    </p>
                </Card>

                {/* 2. Weakness Predictor (Dynamic) */}
                <Card className="p-6 bg-red-50 shadow-2xl border-l-4 border-red-500 col-span-1 lg:col-span-2">
                    <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                        <TrendingDown className="mr-2" size={24} /> High-Priority Weakness Predictor
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-800 mb-1">
                                Critical Area: <span className="text-red-600">{weaknessTopic}</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>ML Reason:</strong> {weaknessReason}
                            </p>
                            <p className="text-xs text-gray-500">
                                Model Confidence: {confidence}%
                            </p>
                        </div>
                        <motion.button 
                            onClick={() => onNavigate(ctaLink)} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 md:mt-0 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition flex items-center"
                        >
                            <Lightbulb size={18} className="mr-2" />
                            {ctaText}
                        </motion.button>
                    </div>
                </Card>
            </div>

            {/* 3. Learning Pathway (Dynamic) */}
            <Card className="p-6 bg-white shadow-lg border-l-4 border-yellow-500">
                <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center">
                    <BookOpen className="mr-2" size={24} /> Personalized Learning Pathway
                </h2>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                        <p className="text-lg font-semibold text-gray-800">
                            Your Next Recommended Milestone:
                        </p>
                        <p className="text-2xl font-extrabold text-yellow-600 mt-1">
                            {nextMilestone}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-gray-600">
                            <Clock size={18} className="mr-1 text-yellow-500" />
                            <span className="font-semibold">{STATIC_ML_INSIGHTS.nextMilestone.estimatedDays} Days</span>
                        </div>
                        <motion.button 
                            onClick={() => onNavigate(STATIC_ML_INSIGHTS.nextMilestone.link)}
                            className="text-sm text-yellow-700 hover:text-yellow-800 font-medium mt-1 block"
                        >
                            Go to resources →
                        </motion.button>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    *Calculated by the Learning Pathway model, optimizing for knowledge gain and pacing.
                </p>
            </Card>

        </motion.div>
    );
};