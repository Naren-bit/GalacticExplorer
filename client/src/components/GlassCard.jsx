/**
 * GlassCard Component - With Realistic Planet Images
 * Shows actual planet photos instead of colored circles
 */

import { motion } from 'framer-motion';

// Map planet names to their image files
const planetImages = {
    mercury: '/planets/planet_mercury_1768282558168.png',
    venus: '/planets/planet_venus_1768282575482.png',
    earth: '/planets/planet_earth_1768282541113.png',
    mars: '/planets/planet_mars_1768282592314.png',
    jupiter: '/planets/planet_jupiter_1768282635416.png',
    saturn: '/planets/planet_saturn_1768282653932.png',
    uranus: '/planets/planet_uranus_1768282668557.png',
    neptune: '/planets/planet_neptune_1768282684557.png',
};

const GlassCard = ({ planet, onClick, layoutId }) => {
    const imagePath = planetImages[planet.name?.toLowerCase()];

    return (
        <motion.button
            layoutId={layoutId}
            onClick={onClick}
            className="glass rounded-3xl p-5 cursor-pointer text-left w-full 
                 focus-visible:ring-4 focus-visible:ring-cosmic-violet
                 group relative overflow-hidden"
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            aria-label={`Learn more about ${planet.name}`}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at center, ${planet.color}15 0%, transparent 70%)`,
                }}
            />

            {/* Order badge */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-cosmic-purple/40 
                      flex items-center justify-center text-xs font-bold text-white/80">
                {planet.orderFromSun}
            </div>

            {/* Planet image */}
            <div className="flex justify-center mb-4">
                {imagePath ? (
                    <motion.img
                        src={imagePath}
                        alt={planet.name}
                        className="w-24 h-24 object-contain rounded-full"
                        style={{
                            mixBlendMode: 'lighten',
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))',
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                    />
                ) : (
                    <div
                        className="w-24 h-24 rounded-full"
                        style={{
                            background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}80)`,
                            boxShadow: `0 0 30px ${planet.color}40`,
                        }}
                    />
                )}
            </div>

            {/* Planet name */}
            <motion.h2
                layoutId={`planet-name-${planet._id}`}
                className="text-xl font-display font-bold text-center mb-2 gradient-text"
            >
                {planet.name}
            </motion.h2>

            {/* Tags */}
            <div className="flex justify-center gap-2 mb-2 flex-wrap">
                <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                        background: planet.isGasGiant
                            ? 'rgba(139, 92, 246, 0.25)'
                            : 'rgba(34, 211, 238, 0.25)',
                        color: planet.isGasGiant ? '#A78BFA' : '#22D3EE',
                    }}
                >
                    {planet.isGasGiant ? '🌬️ Gas Giant' : '🪨 Rocky'}
                </span>
            </div>

            {/* Distance */}
            <p className="text-cosmic-cyan text-center text-xs">
                📍 {planet.distance}
            </p>
        </motion.button>
    );
};

export default GlassCard;
