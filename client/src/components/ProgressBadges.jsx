/**
 * ProgressBadges Component
 * Display earned achievement badges stored in localStorage
 */

import { motion } from 'framer-motion';

const BADGES = [
    {
        id: 'easy_complete',
        name: 'Space Cadet',
        icon: '🚀',
        description: 'Complete the Easy quiz',
        color: 'from-green-400 to-emerald-600',
    },
    {
        id: 'medium_complete',
        name: 'Star Navigator',
        icon: '⭐',
        description: 'Complete the Medium quiz',
        color: 'from-yellow-400 to-orange-500',
    },
    {
        id: 'hard_complete',
        name: 'Galaxy Master',
        icon: '🌌',
        description: 'Complete the Hard quiz',
        color: 'from-purple-400 to-pink-600',
    },
    {
        id: 'perfect_easy',
        name: 'Perfect Start',
        icon: '💫',
        description: 'Get 100% on Easy',
        color: 'from-cyan-400 to-blue-500',
    },
    {
        id: 'perfect_medium',
        name: 'Stellar Mind',
        icon: '🧠',
        description: 'Get 100% on Medium',
        color: 'from-indigo-400 to-purple-600',
    },
    {
        id: 'perfect_hard',
        name: 'Cosmic Genius',
        icon: '👑',
        description: 'Get 100% on Hard',
        color: 'from-amber-400 to-red-500',
    },
];

const ProgressBadges = ({ earnedBadges = [] }) => {
    return (
        <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-display font-bold mb-4 gradient-text">
                🏆 Your Achievements
            </h3>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {BADGES.map((badge, index) => {
                    const isEarned = earnedBadges.includes(badge.id);

                    return (
                        <motion.div
                            key={badge.id}
                            className={`relative group cursor-pointer ${isEarned ? '' : 'opacity-40 grayscale'
                                }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={isEarned ? { scale: 1.1 } : {}}
                        >
                            {/* Badge circle */}
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl
                           bg-gradient-to-br ${badge.color} 
                           ${isEarned ? 'shadow-lg' : 'bg-gray-600'}`}
                            >
                                {isEarned ? badge.icon : '🔒'}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                            opacity-0 group-hover:opacity-100 transition-opacity
                            pointer-events-none z-10">
                                <div className="glass rounded-lg p-2 text-center min-w-[120px]">
                                    <p className="font-semibold text-sm">{badge.name}</p>
                                    <p className="text-xs text-white/70">{badge.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {earnedBadges.length === 0 && (
                <p className="text-center text-white/50 mt-4">
                    Complete quizzes to earn badges! 🌟
                </p>
            )}
        </div>
    );
};

export { BADGES };
export default ProgressBadges;
