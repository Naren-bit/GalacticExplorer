/**
 * PlanetImage Component
 * Displays realistic 2D planet images
 * Much simpler and faster than 3D rendering
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

const PlanetImage = ({ planetName, color }) => {
    const imagePath = planetImages[planetName?.toLowerCase()];

    return (
        <div className="flex justify-center items-center py-4">
            <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {/* Glow effect behind planet */}
                <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-30"
                    style={{
                        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                        transform: 'scale(1.2)',
                    }}
                />

                {/* Planet image */}
                {imagePath ? (
                    <motion.img
                        src={imagePath}
                        alt={planetName}
                        className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-full relative z-10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.5))',
                        }}
                    />
                ) : (
                    // Fallback colored sphere if no image
                    <div
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full relative z-10"
                        style={{
                            background: `radial-gradient(circle at 30% 30%, ${color}, ${color}99)`,
                            boxShadow: `0 0 60px ${color}40, inset -20px -20px 40px rgba(0,0,0,0.4)`,
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default PlanetImage;
