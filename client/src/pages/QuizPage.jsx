/**
 * QuizPage Component
 * Quiz level selection and question display
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import QuizCard from '../components/QuizCard';
import ProgressBadges from '../components/ProgressBadges';

const QuizPage = () => {
    const [difficulty, setDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [earnedBadges, setEarnedBadges] = useState([]);

    // Load badges from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('galactic_badges');
        if (saved) {
            setEarnedBadges(JSON.parse(saved));
        }
    }, []);

    // Save badge to localStorage
    const saveBadge = (badgeId) => {
        const updated = [...new Set([...earnedBadges, badgeId])];
        setEarnedBadges(updated);
        localStorage.setItem('galactic_badges', JSON.stringify(updated));
    };

    // Fetch questions when difficulty is selected
    useEffect(() => {
        if (difficulty) {
            fetchQuestions(difficulty);
        }
    }, [difficulty]);

    const fetchQuestions = async (level) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/quiz/${level}`);
            setQuestions(response.data.data || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnswer = (index) => {
        setSelectedAnswer(index);
        setShowResult(true);

        if (index === questions[currentIndex].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            // Quiz complete
            setQuizComplete(true);

            // Calculate final score
            const finalScore = score + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0);

            // Save quiz history to localStorage
            const history = JSON.parse(localStorage.getItem('galactic_quiz_history') || '[]');
            history.push({
                difficulty,
                score: finalScore,
                total: questions.length,
                date: new Date().toLocaleDateString(),
            });
            localStorage.setItem('galactic_quiz_history', JSON.stringify(history));

            // Award badges
            saveBadge(`${difficulty}_complete`);

            if (finalScore === questions.length) {
                saveBadge(`perfect_${difficulty}`);
            }
        }
    };

    const resetQuiz = () => {
        setDifficulty(null);
        setQuestions([]);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setQuizComplete(false);
    };

    const difficultyLevels = [
        {
            id: 'easy',
            name: 'Easy',
            icon: '🌟',
            description: '5 basic questions about planets',
            color: 'from-green-400 to-emerald-600',
        },
        {
            id: 'medium',
            name: 'Medium',
            icon: '⭐',
            description: '7 questions about moons and facts',
            color: 'from-yellow-400 to-orange-500',
        },
        {
            id: 'hard',
            name: 'Hard',
            icon: '🌌',
            description: '10 challenging space questions',
            color: 'from-purple-400 to-pink-600',
        },
    ];

    // Level selection screen
    if (!difficulty) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.header
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
                            🎯 Space Quiz
                        </h1>
                        <p className="text-xl text-white/70">
                            Test your knowledge about our solar system!
                        </p>
                    </motion.header>

                    {/* Progress Badges */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <ProgressBadges earnedBadges={earnedBadges} />
                    </motion.div>

                    {/* Difficulty Selection */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {difficultyLevels.map((level, index) => (
                            <motion.button
                                key={level.id}
                                onClick={() => setDifficulty(level.id)}
                                className="glass rounded-3xl p-8 text-center hover:scale-105 transition-transform"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={`w-20 h-20 rounded-full mx-auto mb-4 
                              bg-gradient-to-br ${level.color}
                              flex items-center justify-center text-4xl`}>
                                    {level.icon}
                                </div>
                                <h2 className="text-2xl font-display font-bold mb-2">
                                    {level.name}
                                </h2>
                                <p className="text-white/70">
                                    {level.description}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-cosmic-purple border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="text-xl text-white/70">Loading questions...</p>
                </div>
            </div>
        );
    }

    // Quiz complete screen
    if (quizComplete) {
        const finalScore = score;
        const percentage = Math.round((finalScore / questions.length) * 100);

        return (
            <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-2xl">
                    <motion.div
                        className="glass-strong rounded-3xl p-8 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                        >
                            {percentage >= 80 ? '🎉' : percentage >= 50 ? '⭐' : '🚀'}
                        </motion.div>

                        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 gradient-text">
                            Quiz Complete!
                        </h1>

                        <div className="text-5xl font-display font-bold mb-2 text-cosmic-cyan">
                            {finalScore} / {questions.length}
                        </div>
                        <p className="text-xl text-white/70 mb-8">
                            {percentage}% Correct
                        </p>

                        {percentage === 100 && (
                            <motion.p
                                className="text-xl text-cosmic-violet mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                🏆 Perfect Score! You earned a special badge!
                            </motion.p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                onClick={resetQuiz}
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Try Another Level
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Quiz in progress
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto">
                <AnimatePresence mode="wait">
                    {questions[currentIndex] && (
                        <QuizCard
                            key={currentIndex}
                            question={questions[currentIndex]}
                            currentIndex={currentIndex}
                            totalQuestions={questions.length}
                            selectedAnswer={selectedAnswer}
                            showResult={showResult}
                            onSelectAnswer={handleSelectAnswer}
                        />
                    )}
                </AnimatePresence>

                {/* Next button */}
                {showResult && (
                    <motion.div
                        className="text-center mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <button
                            onClick={handleNextQuestion}
                            className="btn-primary"
                        >
                            {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
                        </button>
                    </motion.div>
                )}

                {/* Back button */}
                <div className="text-center mt-6">
                    <button
                        onClick={resetQuiz}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        ← Back to Level Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
