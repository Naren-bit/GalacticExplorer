/**
 * HomePage Component - Unique Orbital Design
 * Features a solar system layout with planets in orbit positions
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import PlanetModal from '../components/PlanetModal';
import SpaceObjectCard from '../components/SpaceObjectCard';
import SpaceObjectModal from '../components/SpaceObjectModal';
import NasaApod from '../components/NasaApod';
import SpaceFactOfDay from '../components/SpaceFactOfDay';
import { spaceObjects } from '../data/spaceObjects';

// Planet images map
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

const HomePage = () => {
    const [planets, setPlanets] = useState([]);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('planets');

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get('/api/planets');
                setPlanets(response.data.data || []);
            } catch (err) {
                console.error('Error fetching planets:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanets();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedPlanet(null);
                setSelectedObject(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const sections = [
        { id: 'planets', label: '🪐 Planets', count: 8 },
        { id: 'galaxies', label: '🌌 Galaxies', count: 2 },
        { id: 'phenomena', label: '💫 Phenomena', count: 4 },
    ];

    return (
        <div className="min-h-screen pt-20 pb-12">
            {/* Hero Section - Sun above, text below */}
            <section className="flex flex-col items-center justify-center py-12 mb-8">
                {/* Sun with glow */}
                <motion.div
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full mb-8"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #FCD34D, #F59E0B)',
                        boxShadow: '0 0 80px #F59E0B50, 0 0 150px #FCD34D30',
                    }}
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Hero text below sun */}
                <motion.h1
                    className="text-4xl md:text-6xl font-display font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="gradient-text">Explore the Cosmos</span>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-white/70 max-w-xl mx-auto px-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Discover planets, galaxies, and the wonders of our universe
                </motion.p>
            </section>

            {/* Section Tabs */}
            <div className="container mx-auto px-4 mb-8">
                <div className="flex justify-center gap-3 flex-wrap">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-6 py-3 rounded-2xl font-medium transition-all ${activeSection === section.id
                                ? 'bg-cosmic-purple/40 text-white border border-cosmic-purple/50'
                                : 'glass text-white/70 hover:text-white'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {section.label}
                            <span className="ml-2 text-xs bg-white/10 px-2 py-1 rounded-full">
                                {section.count}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div className="container mx-auto px-4 max-w-7xl">
                <AnimatePresence mode="wait">
                    {/* Planets Section */}
                    {activeSection === 'planets' && (
                        <motion.div
                            key="planets"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                        >
                            {loading ? (
                                <div className="col-span-4 text-center py-20">
                                    <div className="w-12 h-12 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto" />
                                </div>
                            ) : (
                                planets.map((planet, index) => (
                                    <motion.div
                                        key={planet._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <GlassCard
                                            planet={planet}
                                            onClick={() => setSelectedPlanet(planet)}
                                            layoutId={`planet-${planet._id}`}
                                        />
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}

                    {/* Galaxies Section */}
                    {activeSection === 'galaxies' && (
                        <motion.div
                            key="galaxies"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {spaceObjects.galaxies.map((obj) => (
                                <SpaceObjectCard
                                    key={obj.id}
                                    object={obj}
                                    onClick={() => setSelectedObject(obj)}
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* Phenomena Section */}
                    {activeSection === 'phenomena' && (
                        <motion.div
                            key="phenomena"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            {[...spaceObjects.blackHoles, ...spaceObjects.comets, ...spaceObjects.asteroids, ...spaceObjects.otherPhenomena].map((obj) => (
                                <SpaceObjectCard
                                    key={obj.id}
                                    object={obj}
                                    onClick={() => setSelectedObject(obj)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick actions */}
                <motion.div
                    className="mt-16 flex flex-col md:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/quiz"
                        className="glass px-8 py-4 rounded-2xl font-medium text-lg hover:bg-glass-medium transition-colors flex items-center gap-3"
                    >
                        <span>🎯</span>
                        <span>Take the Space Quiz</span>
                    </Link>
                    <Link
                        to="/about"
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        Learn more about space →
                    </Link>
                </motion.div>

                {/* Space Fact of the Day - At Bottom */}
                <div className="mt-16">
                    <SpaceFactOfDay />
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedPlanet && (
                    <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
                )}
                {selectedObject && (
                    <SpaceObjectModal object={selectedObject} onClose={() => setSelectedObject(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomePage;
