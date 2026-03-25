/**
 * SpaceObjectModal Component
 * Modal for displaying detailed space object information
 */

import { motion } from 'framer-motion';

const SpaceObjectModal = ({ object, onClose }) => {
    if (!object) return null;

    return (
        <>
            {/* Backdrop overlay */}
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal content */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
                <motion.div
                    className="glass-strong rounded-3xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Close button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full glass 
                       flex items-center justify-center text-xl
                       hover:bg-glass-medium transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Close modal"
                    >
                        ✕
                    </motion.button>

                    {/* Icon & Title */}
                    <div className="text-center mb-6">
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {object.icon}
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                            {object.name}
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="glass rounded-2xl p-5 mb-6">
                        <p className="text-lg leading-relaxed text-white/90">
                            {object.description}
                        </p>
                    </div>

                    {/* Fun Facts */}
                    <div className="mb-6">
                        <h2 className="text-xl font-display font-semibold mb-4 text-cosmic-violet">
                            🌟 Amazing Facts
                        </h2>
                        <div className="space-y-3">
                            {object.facts.map((fact, index) => (
                                <motion.div
                                    key={index}
                                    className="glass rounded-xl p-4 flex items-start gap-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <span className="text-cosmic-cyan">✦</span>
                                    <p className="text-white/85">{fact}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Stats if available */}
                    {object.stats && (
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {object.stats.map((stat, index) => (
                                <div key={index} className="glass rounded-xl p-4 text-center">
                                    <p className="text-white/60 text-sm">{stat.label}</p>
                                    <p className="text-lg font-semibold text-cosmic-cyan">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Close button */}
                    <motion.button
                        onClick={onClose}
                        className="btn-primary w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        🚀 Continue Exploring
                    </motion.button>
                </motion.div>
            </div>
        </>
    );
};

export default SpaceObjectModal;
