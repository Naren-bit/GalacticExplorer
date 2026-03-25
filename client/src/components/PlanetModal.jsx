/**
 * PlanetModal Component - With Realistic 2D Images
 * Full-screen view with Text-to-Speech and Weight Calculator
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PlanetImage from './PlanetImage';
import SpeakButton from './SpeakButton';
import WeightCalculator from './WeightCalculator';

const PlanetModal = ({ planet, onClose }) => {
    // Track planet view for profile progress
    useEffect(() => {
        if (planet) {
            const viewed = JSON.parse(localStorage.getItem('galactic_planets_viewed') || '[]');
            if (!viewed.includes(planet.name)) {
                viewed.push(planet.name);
                localStorage.setItem('galactic_planets_viewed', JSON.stringify(viewed));
            }
        }
    }, [planet]);

    if (!planet) return null;

    // Combine description for TTS
    const descriptionText = `${planet.name}. ${planet.description}`;

    return (
        <>
            {/* Backdrop overlay - covers everything including navbar */}
            <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal content - highest z-index */}
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
                <motion.div
                    layoutId={`planet-card-${planet._id}`}
                    className="glass-strong rounded-3xl p-6 md:p-8 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="planet-modal-title"
                >
                    {/* Close button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-14 h-14 rounded-full glass 
                       flex items-center justify-center text-2xl
                       hover:bg-glass-medium transition-colors
                       focus-visible:ring-4 focus-visible:ring-cosmic-violet z-20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Close modal"
                    >
                        ✕
                    </motion.button>

                    {/* Planet Name - Top Center */}
                    <motion.h1
                        id="planet-modal-title"
                        layoutId={`planet-name-${planet._id}`}
                        className="text-4xl md:text-5xl font-display font-bold text-center mb-4 gradient-text"
                    >
                        {planet.name}
                    </motion.h1>

                    {/* Realistic 2D Planet Image - CENTERED */}
                    <PlanetImage planetName={planet.name} color={planet.color} />


                    {/* Planet type badges - centered */}
                    <div className="flex justify-center gap-3 mb-6 flex-wrap">
                        <span
                            className="px-5 py-2 rounded-full text-sm font-semibold"
                            style={{
                                background: planet.isGasGiant
                                    ? 'rgba(139, 92, 246, 0.3)'
                                    : 'rgba(34, 211, 238, 0.3)',
                                color: planet.isGasGiant ? '#A78BFA' : '#22D3EE',
                            }}
                        >
                            {planet.isGasGiant ? '🌬️ Gas Giant' : '🪨 Rocky Planet'}
                        </span>
                        {planet.hasRings && (
                            <span className="px-5 py-2 rounded-full text-sm font-semibold bg-cosmic-purple/30 text-cosmic-violet">
                                💍 Has Rings
                            </span>
                        )}
                        <span className="px-5 py-2 rounded-full text-sm font-semibold bg-cosmic-cyan/20 text-cosmic-cyan">
                            🌙 {planet.moons} Moon{planet.moons !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {/* Description with Text-to-Speech */}
                    <div className="glass rounded-2xl p-5 mb-6">
                        <div className="flex items-start gap-3">
                            <SpeakButton text={descriptionText} className="flex-shrink-0 mt-1" />
                            <p className="text-lg leading-relaxed text-white/90">
                                {planet.description}
                            </p>
                        </div>
                    </div>

                    {/* Weight Calculator */}
                    <WeightCalculator planetName={planet.name} />

                    {/* Stats Grid - 2x2 on mobile, 4 columns on desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
                        <div className="glass rounded-xl p-4 text-center">
                            <p className="text-white/50 text-xs mb-1">📍 Distance</p>
                            <p className="text-base font-bold text-cosmic-cyan">{planet.distance}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                            <p className="text-white/50 text-xs mb-1">📏 Diameter</p>
                            <p className="text-base font-bold text-cosmic-violet">{planet.diameter}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                            <p className="text-white/50 text-xs mb-1">🌅 Day Length</p>
                            <p className="text-base font-bold text-cosmic-blue">{planet.dayLength}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                            <p className="text-white/50 text-xs mb-1">🌡️ Temperature</p>
                            <p className="text-base font-bold text-cosmic-purple">{planet.temperature}</p>
                        </div>
                    </div>

                    {/* Fun Facts with TTS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <h2 className="text-xl font-display font-semibold mb-4 text-cosmic-violet text-center">
                            🌟 Fun Facts
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3 mb-6">
                            {planet.funFacts && planet.funFacts.slice(0, 4).map((fact, index) => (
                                <motion.div
                                    key={index}
                                    className="glass rounded-xl p-4 flex items-start gap-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <SpeakButton text={fact} className="flex-shrink-0 w-8 h-8" />
                                    <p className="text-white/85 text-sm">{fact}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Close button at bottom */}
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

export default PlanetModal;
