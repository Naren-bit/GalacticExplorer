/**
 * WeightCalculator Component
 * Calculates user's weight on different planets
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateWeight, getGravityDescription } from '../utils/weightCalculator';

const WeightCalculator = ({ planetName }) => {
    const [earthWeight, setEarthWeight] = useState('');
    const [planetWeight, setPlanetWeight] = useState(null);

    const handleCalculate = () => {
        const weight = parseFloat(earthWeight);
        if (!isNaN(weight) && weight > 0) {
            setPlanetWeight(calculateWeight(weight, planetName));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCalculate();
        }
    };

    return (
        <div className="glass rounded-xl p-4 mt-4">
            <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                ⚖️ How much would you weigh on {planetName}?
            </h3>

            <div className="flex gap-2">
                <input
                    type="number"
                    value={earthWeight}
                    onChange={(e) => setEarthWeight(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Your weight (kg)"
                    className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-white/40 text-sm
                   focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                />
                <motion.button
                    onClick={handleCalculate}
                    className="px-4 py-2 rounded-lg bg-cosmic-purple/40 text-white text-sm font-medium
                   hover:bg-cosmic-purple/60 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Calculate
                </motion.button>
            </div>

            <AnimatePresence>
                {planetWeight && (
                    <motion.div
                        className="mt-4 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <p className="text-3xl font-bold text-cosmic-cyan mb-1">
                            {planetWeight} kg
                        </p>
                        <p className="text-white/60 text-sm">
                            {getGravityDescription(planetName)}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WeightCalculator;
