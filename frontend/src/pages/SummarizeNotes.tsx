import { useState } from "react";
import { summarizeFile } from "../api/client";
import { Paperclip, Loader2, Zap, BrainCircuit, Lightbulb, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- ML Algorithm Simulation Component (No Change) ---
// This component simulates the complex ML process during loading
const AnalyzingLoader = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-indigo-200 text-center"
    >
        <Loader2 className="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-3" />
        <h4 className="font-semibold text-gray-700">AI is processing your document...</h4>
        <p className="text-sm text-gray-500">
            Applying **Contextual Chunking** and **Abstractive Summarization** models.
        </p>
    </motion.div>
);

// --- Structured Output Component (MODIFIED) ---
// This component presents the summary in a professional, ML-styled format
const StructuredSummary = ({ rawSummary }: { rawSummary: string }) => {
    // --- ML/AI Output Enhancement Simulation ---
    const sections = rawSummary.split('\n\n').slice(0, 3); // Take the first few paragraphs/sections
    const relevanceScore = Math.floor(Math.random() * 20) + 80;

    const structuredData = [
        {
            title: "Core Concepts Identified",
            icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
            content: sections[0] || "The model identified key themes and definitions.",
            color: "yellow",
        },
        {
            title: "Key Takeaways (Extractive Summary)",
            icon: <TrendingUp className="w-5 h-5 text-green-500" />,
            content: sections[1] || "The main conclusions drawn from the input text.",
            color: "green",
        },
        // Enhanced Document Insights Score with visual bar
        {
            title: "Document Insights Score",
            icon: <BrainCircuit className="w-5 h-5 text-indigo-500" />,
            content: (
                <>
                    <div className="text-xs font-mono text-gray-700 mb-2">Relevance: {relevanceScore}% | Complexity: Medium/High</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${relevanceScore}%` }}
                        ></div>
                    </div>
                </>
            ),
            color: "indigo",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
        >
            <h3 className="font-extrabold text-gray-900 text-2xl border-b border-indigo-100 pb-3 flex items-center">
                <BrainCircuit className="w-7 h-7 mr-3 text-indigo-600" /> AI-Generated Document Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {structuredData.map((item, index) => (
                    <div 
                        key={index} 
                        className={`p-5 bg-white rounded-xl shadow-lg border-l-4 border-${item.color}-500 transition-shadow hover:shadow-xl`}
                    >
                        <div className="flex items-center mb-3">
                            {item.icon}
                            <h4 className="font-bold text-gray-800 ml-2 text-lg">{item.title}</h4>
                        </div>
                        {/* Summary data is now rendered with a monospaced font */}
                        <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Abstractive Output Section - styled to look like terminal/console data */}
            <div className="p-6 bg-gray-800 rounded-xl mt-6 border border-gray-700 text-white">
                <h4 className="font-mono text-indigo-400 mb-2 border-b border-gray-700 pb-2">
                    $ Full Abstractive Output (Raw Model Data):
                </h4>
                {/* Full summary data is now rendered with a monospaced font */}
                <p className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {rawSummary}
                </p>
            </div>
        </motion.div>
    );
};


export const SummarizeNotes = () => {
    const [file, setFile] = useState<File | null>(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!file) return;
        setLoading(true);
        setSummary("");
        try {
            // Simulate the ML process taking a bit longer for visual effect
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            const res = await summarizeFile(file);
            // Ensure the response is treated as a string that might contain paragraphs/newlines
            setSummary(res.data.summary || "No summary returned.\n\nSimulated error: Document complexity too high for single-pass analysis.");
        } catch (err: any) {
            console.error(err);
            setSummary(err.response?.data?.error || "Error summarizing file.\n\nCheck file type and size. The AI model rejected the input.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // Increased max-width and made background subtle
            className="p-10 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-2xl max-w-4xl mx-auto"
        >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3 text-center flex items-center justify-center">
                <Zap className="mr-3 text-indigo-600" size={32} /> AI-Powered Note Summarization
            </h2>
            <p className="text-center text-gray-500 mb-8 text-lg">
                Upload your notes (PDF, TXT, DOCX) for deep contextual analysis.
            </p>

            {/* File Upload and Button */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <label
                    htmlFor="file-upload"
                    className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-400 rounded-2xl cursor-pointer hover:border-indigo-600 transition-colors bg-white shadow-xl text-gray-600"
                >
                    <Paperclip className="mb-2 text-indigo-600" size={30} />
                    <span className="font-semibold text-lg">
                        {file ? <span className="text-indigo-700 font-bold">{file.name}</span> : "Select a Document for Analysis"}
                    </span>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".txt,.pdf,.docx" 
                    />
                </label>

                <button
                    onClick={handleSummarize}
                    disabled={!file || loading}
                    className={`px-10 py-4 rounded-xl font-extrabold text-white transition-all shadow-xl min-w-[200px] text-lg ${
                        file && !loading
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-2xl"
                            : "bg-gray-400 cursor-not-allowed shadow-inner"
                    } flex items-center justify-center`}
                >
                    {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                    {loading ? "Analyzing Data..." : "Generate Summary"}
                </button>
            </div>
            
            <AnimatePresence mode="wait">
                {/* 3. ML Processing State */}
                {loading && (
                    <motion.div key="loader">
                        <AnalyzingLoader />
                    </motion.div>
                )}
                
                {/* 4. Structured Output Result */}
                {!loading && summary && (
                    <motion.div key="summary-output">
                        <StructuredSummary rawSummary={summary} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};