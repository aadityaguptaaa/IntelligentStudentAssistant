// src/pages/StudentDashboard.tsx

import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';

// Import all content components
import { AskDoubt } from './AskDoubt';
import { SummarizeNotes } from './SummarizeNotes';
import { VideoRecommendations } from './VideoRecommendations';
import { SkillAssessment, DynamicMLInsights } from '../components/SkillsAssessment'; 
import { SubjectQuiz } from './SubjectQuiz'; 
import { Dashboard } from '../components/Dashboard'; 

interface StudentDashboardProps {
    onLogout: () => void;
}

export const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mlResults, setMlResults] = useState<DynamicMLInsights | null>(null);

    // 💾 LOAD INITIAL DATA FROM LOCAL STORAGE ON MOUNT
    useEffect(() => {
        try {
            const storedInsights = localStorage.getItem('latestQuizInsights');
            if (storedInsights) {
                setMlResults(JSON.parse(storedInsights));
            }
        } catch (error) {
            console.error("Error loading insights from Local Storage:", error);
        }
    }, []); 

    // This function is the callback passed to SubjectQuiz and SkillAssessment.
    const handleAssessmentComplete = (results: DynamicMLInsights | null) => {
        // Update state only if new results are provided
        if (results) {
            setMlResults(results);
        }
        setActiveTab('dashboard'); // Switch to dashboard
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'ask-doubt':
                return <AskDoubt />;
            case 'summarize':
                return <SummarizeNotes />;
            case 'videos':
                return <VideoRecommendations />;
            case 'assess-skills':
                return <SkillAssessment onAssessmentComplete={handleAssessmentComplete} />;
            case 'subject-quiz': 
                return <SubjectQuiz onQuizComplete={handleAssessmentComplete} />; 
            case 'dashboard': 
            default:
                // ✅ FIX: Passing mlResults directly as it now matches the mlInsights: DynamicMLInsights | null prop type in Dashboard.tsx
                return <Dashboard onNavigate={setActiveTab} mlInsights={mlResults} />; 
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB]">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
            
            <div className="ml-64 flex-1 p-8 min-h-screen h-full overflow-y-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
};