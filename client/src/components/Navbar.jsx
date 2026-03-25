/**
 * Navbar Component
 * Navigation with Sensory Mode toggle
 * Auto-hides on scroll down, shows on scroll up
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useSensoryMode } from '../context/SensoryModeContext';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const { isSensoryMode, toggleSensoryMode } = useSensoryMode();

    // Track scroll direction to show/hide navbar
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 100) {
            setHidden(true); // Scrolling down - hide
        } else {
            setHidden(false); // Scrolling up - show
        }
    });

    const navItems = [
        { path: '/', label: '🏠 Home', icon: '🪐' },
        { path: '/quiz', label: '📝 Quiz', icon: '🎯' },
        { path: '/about', label: '📖 About', icon: '🌌' },
        { path: '/profile', label: '👤 Profile', icon: '👨‍🚀' },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 glass"
            initial={{ y: -100 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <motion.span
                            className="text-2xl md:text-3xl sensory-hide-animation"
                            animate={isSensoryMode ? {} : { rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            🪐
                        </motion.span>
                        <span className="text-lg md:text-xl font-display font-bold gradient-text">
                            Galactic Explorer
                        </span>
                    </NavLink>

                    {/* Navigation Links + Sensory Toggle */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Sensory Mode Toggle */}
                        <motion.button
                            onClick={toggleSensoryMode}
                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all
                                      ${isSensoryMode
                                    ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                                    : 'glass text-white/60 hover:text-white'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            title={isSensoryMode ? 'Turn off Quiet Mode' : 'Turn on Quiet Mode'}
                        >
                            <span className="hidden sm:inline">
                                {isSensoryMode ? '🔇 Quiet' : '🔊 Normal'}
                            </span>
                            <span className="sm:hidden">
                                {isSensoryMode ? '🔇' : '🔊'}
                            </span>
                        </motion.button>

                        {/* Nav items */}
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-3 py-2 md:px-4 md:py-2 rounded-xl font-display font-medium text-sm
                                     transition-all duration-300 min-h-[44px] flex items-center
                                     ${isActive
                                        ? 'bg-cosmic-purple/30 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-glass-light'
                                    }`
                                }
                            >
                                <span className="hidden md:inline">{item.label}</span>
                                <span className="md:hidden text-lg">{item.icon}</span>
                            </NavLink>
                        ))}

                        {/* External link to TopoMath */}
                        <a
                            href="https://topo-math.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 md:px-4 md:py-2 rounded-xl font-display font-medium text-sm
                                       transition-all duration-300 min-h-[44px] flex items-center
                                       text-white/70 hover:text-white hover:bg-glass-light"
                        >
                            <span className="hidden md:inline">🧮 Lab 2 TopoMath</span>
                            <span className="md:hidden text-lg">🧮</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
