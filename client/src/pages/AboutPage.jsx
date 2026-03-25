/**
 * AboutPage Component
 * Information about our solar system and space exploration
 */

import { motion } from 'framer-motion';

const AboutPage = () => {
    const solarSystemFacts = [
        {
            title: '☀️ The Sun',
            content: 'Our Sun is a star at the center of our solar system. It is about 4.6 billion years old and provides the light and warmth that makes life on Earth possible.',
        },
        {
            title: '🌍 The Planets',
            content: 'There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. They all orbit around the Sun.',
        },
        {
            title: '🌙 Moons',
            content: 'Moons are natural objects that orbit planets. Our solar system has over 200 known moons! Saturn has the most with 146 moons.',
        },
        {
            title: '☄️ Asteroids & Comets',
            content: 'Asteroids are rocky objects, while comets are made of ice and dust. Most asteroids are found in the asteroid belt between Mars and Jupiter.',
        },
    ];

    const spaceExploration = [
        {
            year: '1957',
            event: 'Sputnik 1',
            description: 'The first artificial satellite was launched into space by the Soviet Union.',
        },
        {
            year: '1961',
            event: 'First Human in Space',
            description: 'Yuri Gagarin became the first human to travel to space.',
        },
        {
            year: '1969',
            event: 'Moon Landing',
            description: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon.',
        },
        {
            year: '1990',
            event: 'Hubble Telescope',
            description: 'The Hubble Space Telescope was launched, giving us amazing views of the universe.',
        },
        {
            year: '2021',
            event: 'James Webb Telescope',
            description: 'The most powerful space telescope was launched to study distant galaxies.',
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
                        📖 About Our Universe
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Discover fascinating facts about our solar system and humanity's journey to explore space!
                    </p>
                </motion.header>

                {/* Solar System Section */}
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-cosmic-cyan">
                        🌌 Our Solar System
                    </h2>
                    <div className="grid gap-4 md:gap-6">
                        {solarSystemFacts.map((fact, index) => (
                            <motion.div
                                key={fact.title}
                                className="glass rounded-2xl p-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                <h3 className="text-xl font-display font-semibold mb-2">
                                    {fact.title}
                                </h3>
                                <p className="text-white/80 leading-relaxed text-lg">
                                    {fact.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Space Exploration Timeline */}
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-cosmic-violet">
                        🚀 Space Exploration Timeline
                    </h2>
                    <div className="space-y-4">
                        {spaceExploration.map((item, index) => (
                            <motion.div
                                key={item.year}
                                className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                <div className="text-3xl font-display font-bold text-cosmic-blue min-w-[80px]">
                                    {item.year}
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-semibold mb-1">
                                        {item.event}
                                    </h3>
                                    <p className="text-white/70 text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Fun Statistics */}
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-cosmic-purple">
                        📊 Amazing Numbers
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { number: '8', label: 'Planets' },
                            { number: '200+', label: 'Moons' },
                            { number: '4.6B', label: 'Years Old' },
                            { number: '∞', label: 'Stars' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="glass rounded-2xl p-6 text-center"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                                    {stat.number}
                                </div>
                                <div className="text-white/70 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Accessibility Statement */}
                <motion.section
                    className="glass rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-display font-bold mb-4 text-cosmic-cyan">
                        ♿ Accessibility
                    </h2>
                    <p className="text-white/80 leading-relaxed text-lg mb-4">
                        Galactic Explorer is designed for everyone, including children with autism.
                        We use calming colors, smooth animations, and clear, simple language to
                        create a comfortable learning experience.
                    </p>
                    <ul className="text-white/70 space-y-2 text-lg">
                        <li>✓ Large, readable fonts</li>
                        <li>✓ Calming blue and purple colors</li>
                        <li>✓ Smooth, predictable animations</li>
                        <li>✓ Simple, easy-to-understand facts</li>
                        <li>✓ Keyboard navigation support</li>
                    </ul>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutPage;
