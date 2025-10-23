import { BookOpen, MessageSquare, Video, LayoutDashboard, LogOut, Code, Award } from 'lucide-react'; // 💡 Imported Award icon
import { motion } from 'framer-motion';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

export const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
    const menuItems = [
        // Group 1: Core Dashboard & Tools
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, 
        { id: 'ask-doubt', label: 'Ask Doubt', icon: MessageSquare },
        { id: 'summarize', label: 'Summarize Notes', icon: BookOpen },
        { id: 'videos', label: 'Video Recommendations', icon: Video },
        
        // Group 2: Assessment Tools
        { id: 'assess-skills', label: 'Skill Assessment', icon: Code }, 
        // 💡 NEW SECTION: Subject-specific timed quiz
        { id: 'subject-quiz', label: 'Subject Quiz', icon: Award }, 
    ];

    return (
        // Added flex-col to enable push-to-bottom logout button
        <div className="w-64 bg-gradient-to-b from-[#6C63FF] to-[#5a52d5] text-white min-h-screen p-6 fixed left-0 top-0 shadow-2xl flex flex-col">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">ISA</h2>
                <p className="text-sm text-white/80">Intelligent Student Assistant</p>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                isActive ? 'bg-white text-[#6C63FF] shadow-lg' : 'hover:bg-white/10'
                            }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </motion.button>
                    );
                })}
            </nav>

            {/* Logout Button: Fixed to the bottom */}
            <div className="mt-auto pt-6 border-t border-white/20"> 
                <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </motion.button>
            </div>
        </div>
    );
};