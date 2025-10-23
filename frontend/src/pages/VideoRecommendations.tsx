import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Search, Play, ExternalLink, Zap, BrainCircuit, TrendingDown, Clock, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendVideos } from '../api/client';

interface Video {
  title: string;
  thumbnail: string;
  url: string;
  channel: string;
}

// --- SIMULATED USER WEAKNESS DATA (ML ALGORITHM) ---
// UPDATED with stable Picsum thumbnail URLs (400x225 resolution)
const WEAKNESS_VIDEOS: Video[] = [
    {
        title: 'Fundamental Concepts of Asymptotic Notation (Big O, Omega, Theta)',
        thumbnail: 'https://picsum.photos/id/1056/400/225', // Study-related: desk, notes
        url: '#',
        channel: 'Algorithms Expert',
    },
    {
        title: 'Deep Dive into Python Object-Orientied Programming (OOP)',
        thumbnail: 'https://picsum.photos/id/111/400/225', // Study-related: monitor, coding
        url: '#',
        channel: 'Programming Hub',
    },
    {
        title: 'Calculus Refresher: Differentiation Rules and Applications',
        thumbnail: 'https://picsum.photos/id/1058/400/225', // Study-related: writing, math
        url: '#',
        channel: 'Math Fortress',
    },
    {
        title: 'Understanding SQL Joins for Database Management',
        thumbnail: 'https://picsum.photos/id/214/400/225', // Study-related: database concept
        url: '#',
        channel: 'Database Gurus',
    },
    {
        title: 'Introduction to Web Development: HTML, CSS, JavaScript Basics',
        thumbnail: 'https://picsum.photos/id/9/400/225', // Study-related: laptop, development
        url: '#',
        channel: 'Frontend Fundamentals',
    },
];

export const VideoRecommendations = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  
  // State for the simulated weakness recommendations
  const [weaknessRecommendations, setWeaknessRecommendations] = useState<Video[]>([]);

  // Simulate fetching weakness recommendations on component load
  useEffect(() => {
    // Simulate ML model calculation delay (e.g., running a K-Means or Collaborative Filtering model)
    const timer = setTimeout(() => {
        setWeaknessRecommendations(WEAKNESS_VIDEOS);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      // Keep the original backend call logic
      // NOTE: Ensure your `recommendVideos` API returns video objects with a valid `thumbnail` field.
      const response = await recommendVideos(topic);
      setVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Common Video Card Component
  const VideoItem = ({ video, idx, sourceIcon }: { video: Video, idx: number, sourceIcon: React.ReactNode }) => (
    <motion.div
        key={video.title + idx}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
    >
      <Card className="overflow-hidden p-0 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <div className="relative group">
          <img
            // Use the video's thumbnail or a generic placeholder
            src={video.thumbnail || 'https://picsum.photos/400/225?random=1'} // Fallback uses a simple random Picsum image
            alt={video.title}
            className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          {/* ML Source Badge */}
          <div className="absolute top-3 left-3 bg-[#6C63FF] text-white font-semibold text-xs px-3 py-1 rounded-full shadow-lg flex items-center">
            {sourceIcon}
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="text-white" size={48} />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{video.channel}</p>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#6C63FF] hover:text-[#5a52d5] font-semibold text-sm transition-colors group"
          >
            Watch Video
            <ExternalLink size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold text-[#6C63FF] mb-2 flex items-center">
            <Zap className="mr-3 text-yellow-500" size={32} /> Smart Video Recommendations
        </h1>
        <p className="text-gray-600 font-medium">
            Find videos by topic or see personalized content based on your learning data.
        </p>
      </motion.div>

      {/* -----------------------------
      // 1. Personalized Weakness Section
      // ----------------------------- */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <TrendingDown className="mr-2 text-red-500" size={24} />
        Personalized Weakness Focus (ML-Driven)
      </h2>
      <p className="text-gray-600 mb-6">
        *Based on **low time-on-topic** and **recent doubt frequency** in these areas.
      </p>
      
      <div className="mb-10">
        {weaknessRecommendations.length === 0 ? (
            <Card className="text-center py-10 bg-gray-50 border-dashed animate-pulse">
                <Clock className="mx-auto mb-3 text-gray-400" size={48} />
                <p className="text-gray-500 font-semibold">ML Model is analyzing your learning data...</p>
            </Card>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weaknessRecommendations.map((video, idx) => (
                    <VideoItem 
                        key={idx} 
                        video={video} 
                        idx={idx} 
                        // Source icon for weakness recommendations
                        sourceIcon={<MessageCircle size={14} className="mr-1" />}
                    />
                ))}
            </div>
        )}
      </div>

      {/* -----------------------------
      // 2. Direct Topic Search Section
      // ----------------------------- */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center mt-10">
        <BrainCircuit className="mr-2 text-blue-500" size={24} />
        Deep Search by Topic
      </h2>

      <Card className="mb-8 p-6 border-2 border-blue-100 bg-white shadow-lg">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Search for a specific topic..."
              className="mb-0 border-gray-300 focus:border-blue-500"
            />
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading} 
            className="px-8 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {loading ? 'Searching...' : (
              <>
                <Search className="inline mr-2" size={20} /> Search
              </>
            )}
          </Button>
        </form>
      </Card>

      <AnimatePresence mode="wait">
        {loading && (
            <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
            >
                <Clock className="mx-auto mb-3 h-10 w-10 animate-spin text-blue-500" />
                <p className="text-gray-600 font-semibold">Fetching and ranking videos based on **Text Embeddings**...</p>
            </motion.div>
        )}
      </AnimatePresence>

      {!loading && videos.length > 0 ? (
        <motion.div
          key="topic-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Results for "{topic}"
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
                <VideoItem 
                    key={idx} 
                    video={video} 
                    idx={idx} 
                    // Source icon for direct search
                    sourceIcon={<Search size={14} className="mr-1" />}
                />
            ))}
          </div>
        </motion.div>
      ) : !loading && videos.length === 0 && topic.trim() ? (
        <Card className="text-center py-16">
          <BrainCircuit className="mx-auto mb-4 text-gray-400" size={64} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Topic Videos Found</h3>
          <p className="text-gray-500">The deep search did not return relevant videos for **"{topic}"**. Try refining your query.</p>
        </Card>
      ) : null}

      {!loading && videos.length === 0 && !topic.trim() && (
        <Card className="text-center py-16">
          <Play className="mx-auto mb-4 text-gray-300" size={64} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Search for Educational Content</h3>
          <p className="text-gray-500">Use the search bar above or check your personalized recommendations.</p>
        </Card>
      )}
    </div>
  );
};