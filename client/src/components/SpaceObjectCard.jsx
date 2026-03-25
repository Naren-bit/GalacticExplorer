/**
 * SpaceObjectCard Component
 * Card for displaying space objects like asteroids, comets, galaxies, black holes
 */

import { motion } from 'framer-motion';

const SpaceObjectCard = ({ object, onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            className="glass rounded-2xl p-5 cursor-pointer text-left w-full 
                 focus-visible:ring-4 focus-visible:ring-cosmic-violet
                 group relative overflow-hidden"
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            aria-label={`Learn more about ${object.name}`}
        >
            {/* Gradient glow effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at center, ${object.color}20 0%, transparent 70%)`,
                }}
            />

            {/* Icon */}
            <div className="text-4xl text-center mb-3">
                {object.icon}
            </div>

            {/* Name */}
            <h3 className="text-xl font-display font-bold text-center mb-2 gradient-text">
                {object.name}
            </h3>

            {/* Short description */}
            <p className="text-white/70 text-center text-sm">
                {object.shortDesc}
            </p>
        </motion.button>
    );
};

export default SpaceObjectCard;
