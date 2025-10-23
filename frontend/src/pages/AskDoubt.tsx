// src/pages/AskDoubt.tsx 
// This version is ready to be integrated into your application.

import { useState } from "react";
import { Paperclip, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK API CLIENT (Simulates the Backend) ---
// Replace this block with your actual 'askDoubt' import when connecting to the live API.
interface AskDoubtResponse {
    status: 'success' | 'error';
    message: string;
    ticketId?: string;
}

// Simulates the function that sends data to your backend API
const askDoubt = async (data: FormData): Promise<{ data: AskDoubtResponse }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // Decision point for testing:
    const simulateError = false; 

    if (simulateError) {
        // --- Simulated Error Response ---
        return {
            data: {
                status: 'error',
                message: "Failed to submit doubt. The AI tutor service is temporarily unavailable. Please try again later.",
            }
        };
    } else {
        // --- Simulated Success Response ---
        const studentName = data.get('studentName') as string;
        return {
            data: {
                status: 'success',
                message: `Hello ${studentName || 'Student'}, your doubt has been submitted successfully! We've assigned a tutor. (Ticket ID: D-${Math.floor(Math.random() * 10000)})`,
                ticketId: `D-${Math.floor(Math.random() * 10000)}`
            }
        };
    }
};
// ------------------------------------


export const AskDoubt = () => {
    const [studentName, setStudentName] = useState("");
    const [question, setQuestion] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    
    // State to hold the structured API response (status and message)
    const [apiResponse, setApiResponse] = useState<AskDoubtResponse | null>(null);

    const handleAsk = async () => {
        // Basic Client-Side Validation
        if (!studentName.trim() || !question.trim()) {
            setApiResponse({ status: 'error', message: 'Please provide your name and question before submitting.' });
            return;
        }

        setLoading(true);
        setApiResponse(null); // Clear previous response when submitting
        
        // Prepare data for submission, required for file uploads
        const formData = new FormData();
        formData.append('studentName', studentName);
        formData.append('question', question);
        if (file) {
            formData.append('file', file);
        }

        try {
            const res = await askDoubt(formData);

            setApiResponse(res.data);

            // Clear inputs ONLY on successful submission
            if (res.data.status === 'success') {
                setStudentName("");
                setQuestion("");
                setFile(null);
            }

        } catch (err: any) {
            // This catches network errors or other unexpected throw scenarios
            console.error("Critical submission error:", err);
            setApiResponse({
                status: 'error',
                message: "A critical network error occurred. Please check your connection and try again."
            });
        } finally {
            setLoading(false);
        }
    };

    // Derived states for UI logic
    const isFormInvalid = !studentName.trim() || !question.trim();
    const isSuccess = apiResponse?.status === 'success';
    const isError = apiResponse?.status === 'error';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Ask a Doubt 💡
            </h2>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all"
                />

                <textarea
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all min-h-[150px] resize-none"
                />

                <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors bg-white shadow-sm"
                >
                    <Paperclip className="mr-2 text-indigo-500" size={20} />
                    {file ? <span className="truncate max-w-xs">{file.name}</span> : "Attach a file (optional)"}
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </label>

                <button
                    onClick={handleAsk}
                    // Disable button if loading or form is invalid
                    disabled={loading || isFormInvalid}
                    className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center transition-all ${
                        loading || isFormInvalid
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
                    }`}
                    whileHover={!loading && !isFormInvalid ? { scale: 1.01 } : {}}
                    whileTap={!loading && !isFormInvalid ? { scale: 0.99 } : {}}
                >
                    {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                    {loading ? "Submitting..." : "Ask Doubt"}
                </button>
            </div>

            <AnimatePresence>
                {apiResponse && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        // Dynamic styling based on success or error state
                        className={`mt-6 p-4 rounded-xl flex items-start space-x-3 ${
                            isSuccess 
                            ? "bg-green-50 border-2 border-green-200" 
                            : "bg-red-50 border-2 border-red-200"
                        }`}
                    >
                        {isSuccess 
                            ? <CheckCircle className="text-green-600 mt-1" size={24} /> 
                            : <AlertTriangle className="text-red-600 mt-1" size={24} />
                        }
                        <div>
                            <p className={`font-semibold ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                                {isSuccess ? "Success! Submission Confirmed:" : "Error During Submission:"}
                            </p>
                            <pre className={`whitespace-pre-wrap text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                                {apiResponse.message}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};