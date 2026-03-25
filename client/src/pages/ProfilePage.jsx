/**
 * ProfilePage with MongoDB data
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProgressBadges from '../components/ProgressBadges';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('galactic_user');
        if (!savedUser) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(savedUser));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('galactic_token');
        localStorage.removeItem('galactic_user');
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    if (!user) return null;

    const quizHistory = user.quizHistory || [];
    const planetsViewed = user.planetsViewed || [];
    const earnedBadges = user.badges || [];

    const stats = [
        { label: 'Planets Explored', value: planetsViewed.length, icon: '🪐', color: 'from-blue-500 to-cyan-500' },
        { label: 'Quizzes Completed', value: quizHistory.length, icon: '📝', color: 'from-purple-500 to-pink-500' },
        { label: 'Badges Earned', value: earnedBadges.length, icon: '🏆', color: 'from-amber-500 to-orange-500' },
        { label: 'Total Score', value: quizHistory.reduce((sum, q) => sum + (q.score || 0), 0), icon: '⭐', color: 'from-emerald-500 to-teal-500' },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.div className="glass-strong rounded-3xl p-8 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-blue flex items-center justify-center text-4xl md:text-5xl">
                            👨‍🚀
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">{user.name}</h1>
                            <p className="text-white/60 mb-4">{user.email}</p>
                            <span className="px-4 py-2 rounded-full text-sm font-medium bg-cosmic-purple/30 text-cosmic-violet">
                                🚀 Explorer Level {Math.min(Math.floor(earnedBadges.length / 2) + 1, 5)}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="text-white/50 hover:text-white transition-colors text-sm">
                            Sign Out →
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label} className="glass rounded-2xl p-5 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                            <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <ProgressBadges earnedBadges={earnedBadges} />
                </motion.div>

                <motion.div className="glass rounded-2xl p-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h2 className="text-xl font-display font-bold mb-4 gradient-text">📊 Quiz History</h2>
                    {quizHistory.length > 0 ? (
                        <div className="space-y-3">
                            {quizHistory.slice(-5).reverse().map((quiz, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{quiz.difficulty === 'easy' ? '🌟' : quiz.difficulty === 'medium' ? '⭐' : '🌌'}</span>
                                        <div>
                                            <p className="font-medium capitalize">{quiz.difficulty} Quiz</p>
                                            <p className="text-white/50 text-sm">{new Date(quiz.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-cosmic-cyan">{quiz.score}/{quiz.total}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/50 text-center py-8">No quizzes taken yet. <a href="/quiz" className="text-cosmic-cyan hover:underline">Take one now!</a></p>
                    )}
                </motion.div>

                <motion.div className="glass rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <h2 className="text-xl font-display font-bold mb-4 gradient-text">🌍 Planets Explored</h2>
                    {planetsViewed.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {planetsViewed.map((planet, index) => (
                                <span key={index} className="px-4 py-2 rounded-full text-sm font-medium bg-cosmic-blue/30 text-cosmic-cyan">{planet}</span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/50 text-center py-8">You haven't explored any planets yet. <a href="/" className="text-cosmic-cyan hover:underline">Start exploring!</a></p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;
