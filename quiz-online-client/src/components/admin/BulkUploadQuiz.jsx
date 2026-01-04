import React, { useState } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { uploadQuestionsCSV, downloadCSVTemplate } from '../../services/QuizService';
import { useAuth } from '../../hooks/useAuth';

const BulkUploadQuiz = ({ onBack }) => {
    const { user } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.csv')) {
            setSelectedFile(file);
            setUploadResult(null);
        } else {
            alert('Please select a CSV file');
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.name.endsWith('.csv')) {
                setSelectedFile(file);
                setUploadResult(null);
            } else {
                alert('Please select a CSV file');
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }

        if (!user || !user.id) {
            alert('User information not found. Please login again.');
            return;
        }

        setUploading(true);
        try {
            const result = await uploadQuestionsCSV(selectedFile, user.id);
            setUploadResult(result);
            setSelectedFile(null);
        } catch (error) {
            alert('Error uploading file: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDownloadTemplate = async () => {
        try {
            await downloadCSVTemplate();
        } catch (error) {
            alert('Error downloading template: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="backdrop-blur-md bg-slate-800/50 rounded-2xl border border-purple-500/20 p-8 mb-8">
                    <button
                        onClick={onBack}
                        className="mb-6 px-4 py-2 bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={20} /> Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        📤 Bulk Upload Quizzes
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Upload multiple quiz questions at once using a CSV file - Save hours of manual entry!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Instructions */}
                    <div className="lg:col-span-1">
                        <div className="backdrop-blur-md bg-slate-800/50 rounded-2xl border border-purple-500/20 p-6 sticky top-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-purple-400">📋 Quick Guide</h2>
                                <button
                                    onClick={() => setShowInstructions(!showInstructions)}
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    {showInstructions ? '▼' : '▶'}
                                </button>
                            </div>

                            {showInstructions && (
                                <div className="space-y-4 text-sm">
                                    <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
                                        <h3 className="font-bold text-cyan-400 mb-2">✨ System is Flexible!</h3>
                                        <p className="text-gray-300 text-xs">
                                            Our system accepts various header formats. Don't worry about exact capitalization or spacing!
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-purple-400 mb-2">📝 Column Headers (Any of these work):</h3>
                                        <ul className="space-y-2 text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400 font-mono text-xs">•</span>
                                                <div>
                                                    <strong className="text-purple-300">Question:</strong>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        question, questionText, quiz_question, q
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400 font-mono text-xs">•</span>
                                                <div>
                                                    <strong className="text-purple-300">Subject:</strong>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        subject, category, topic, course
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400 font-mono text-xs">•</span>
                                                <div>
                                                    <strong className="text-purple-300">Type:</strong>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        questionType, type, qtype
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400 font-mono text-xs">•</span>
                                                <div>
                                                    <strong className="text-purple-300">Choices:</strong>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        choices, options, answers
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400 font-mono text-xs">•</span>
                                                <div>
                                                    <strong className="text-purple-300">Correct:</strong>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        correctAnswers, correct, answer
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-purple-400 mb-2">🎯 Question Types:</h3>
                                        <ul className="space-y-1 text-gray-300 text-xs">
                                            <li>• <strong>Single:</strong> single, single-choice, mcq, radio</li>
                                            <li>• <strong>Multiple:</strong> multiple, multiple-choice, checkbox</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-purple-400 mb-2">✂️ Separators:</h3>
                                        <ul className="space-y-1 text-gray-300 text-xs">
                                            <li>• <strong>Semicolon (;)</strong> - Recommended ✅</li>
                                            <li>• Pipe (|) - Also works</li>
                                            <li>• Comma (,) - Works in simple cases</li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                                        <h3 className="font-semibold text-green-400 mb-2 text-xs">✅ Format Examples:</h3>
                                        <div className="space-y-2 text-xs text-gray-300 font-mono">
                                            <div className="bg-slate-900/50 p-2 rounded">
                                                "A. Paris;B. London;C. Berlin"
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded">
                                                "A. Java|B. Python|C. C++"
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                        <h3 className="font-semibold text-yellow-400 mb-2 text-xs">💡 Pro Tips:</h3>
                                        <ul className="space-y-1 text-gray-300 text-xs">
                                            <li>• Minimum 2 choices per question</li>
                                            <li>• Correct answers must match choice text</li>
                                            <li>• Case doesn't matter (A. Paris = a. paris)</li>
                                            <li>• Use quotes for text with commas</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Upload Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Download Template */}
                        <div className="backdrop-blur-md bg-slate-800/50 rounded-2xl border border-purple-500/20 p-8">
                            <div className="flex items-start gap-4">
                                <Download className="w-12 h-12 text-cyan-400" />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-purple-400 mb-2">
                                        Step 1: Download Template
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        Get our pre-formatted CSV template with example questions to get started quickly.
                                    </p>
                                    <button
                                        onClick={handleDownloadTemplate}
                                        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-semibold shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                                    >
                                        <Download size={20} />
                                        Download Template CSV
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="backdrop-blur-md bg-slate-800/50 rounded-2xl border border-purple-500/20 p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <Upload className="w-12 h-12 text-purple-400" />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-purple-400 mb-2">
                                        Step 2: Upload Your CSV
                                    </h2>
                                    <p className="text-gray-400">
                                        Drag and drop your CSV file or click to browse
                                    </p>
                                </div>
                            </div>
                            
                            <div
                                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                                    dragActive
                                        ? 'border-purple-400 bg-purple-500/10 scale-105'
                                        : 'border-slate-600 hover:border-purple-500/50 hover:bg-slate-700/30'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {selectedFile ? (
                                    <div className="space-y-4">
                                        <FileText className="w-20 h-20 text-purple-400 mx-auto" />
                                        <p className="text-2xl text-purple-400 font-semibold">{selectedFile.name}</p>
                                        <p className="text-gray-400">
                                            Size: {(selectedFile.size / 1024).toFixed(2)} KB
                                        </p>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="text-red-400 hover:text-red-300 transition-colors text-sm"
                                        >
                                            ✕ Remove file
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Upload className="w-20 h-20 text-gray-500 mx-auto" />
                                        <p className="text-xl text-gray-300">
                                            Drag and drop your CSV file here
                                        </p>
                                        <p className="text-gray-500">or</p>
                                        <label className="inline-block px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all cursor-pointer shadow-lg shadow-purple-500/30 text-lg font-semibold">
                                            Browse Files
                                            <input
                                                type="file"
                                                accept=".csv"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleUpload}
                                    disabled={!selectedFile || uploading}
                                    className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
                                        !selectedFile || uploading
                                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 shadow-purple-500/30 hover:scale-105'
                                    }`}
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={24} />
                                            Uploading Questions...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={24} />
                                            Upload Questions to Database
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Upload Results */}
                        {uploadResult && (
                            <div className="backdrop-blur-md bg-slate-800/50 rounded-2xl border border-purple-500/20 p-8">
                                <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                                    📊 Upload Results
                                </h2>
                                
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-slate-700/30 rounded-xl p-6 text-center border border-cyan-500/30">
                                        <p className="text-5xl font-bold text-cyan-400 mb-2">{uploadResult.totalQuestions}</p>
                                        <p className="text-gray-400 text-sm font-semibold">Total Processed</p>
                                    </div>
                                    <div className="bg-green-500/10 rounded-xl p-6 text-center border border-green-500/30">
                                        <p className="text-5xl font-bold text-green-400 mb-2">{uploadResult.successfulUploads}</p>
                                        <p className="text-gray-400 text-sm font-semibold">✓ Successful</p>
                                    </div>
                                    <div className="bg-red-500/10 rounded-xl p-6 text-center border border-red-500/30">
                                        <p className="text-5xl font-bold text-red-400 mb-2">{uploadResult.failedUploads}</p>
                                        <p className="text-gray-400 text-sm font-semibold">✗ Failed</p>
                                    </div>
                                </div>

                                {uploadResult.errors && uploadResult.errors.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                                            <AlertCircle size={24} /> Errors Found:
                                        </h3>
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 max-h-64 overflow-y-auto">
                                            {uploadResult.errors.map((error, index) => (
                                                <p key={index} className="text-red-300 text-sm mb-2 font-mono">
                                                    • {error}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {uploadResult.successMessages && uploadResult.successMessages.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                                            <CheckCircle size={24} /> Successfully Uploaded:
                                        </h3>
                                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 max-h-64 overflow-y-auto">
                                            {uploadResult.successMessages.slice(0, 15).map((msg, index) => (
                                                <p key={index} className="text-green-300 text-sm mb-2">
                                                    {msg}
                                                </p>
                                            ))}
                                            {uploadResult.successMessages.length > 15 && (
                                                <p className="text-gray-400 text-sm mt-3 font-semibold">
                                                    ... and {uploadResult.successMessages.length - 15} more questions uploaded successfully! 🎉
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkUploadQuiz;
