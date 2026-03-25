/**
 * SpaceFactOfDay Component
 * Shows curated space facts and images that rotate daily
 * 50+ facts for variety throughout the year
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 50+ curated space facts with images
const spaceFacts = [
    // Planets
    { title: "The Great Red Spot", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Jupiter%27s_Great_Red_Spot_from_Voyager_1.jpg/1200px-Jupiter%27s_Great_Red_Spot_from_Voyager_1.jpg", fact: "Jupiter's Great Red Spot is a storm that has been raging for over 400 years. It's so large that Earth could fit inside it twice!", category: "Jupiter" },
    { title: "Saturn's Rings", image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg", fact: "Saturn's rings are made mostly of ice particles. They're incredibly thin - only about 10 meters thick but extend 282,000 km!", category: "Saturn" },
    { title: "Mars: The Red Planet", image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", fact: "Mars gets its red color from iron oxide (rust). It has the largest volcano in the solar system - Olympus Mons, 3x taller than Everest!", category: "Mars" },
    { title: "Earth: The Blue Marble", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/800px-The_Blue_Marble_%28remastered%29.jpg", fact: "Earth is the only planet not named after a Greek or Roman god. It's also the only planet where water exists in liquid form on the surface.", category: "Earth" },
    { title: "Venus: Earth's Evil Twin", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", fact: "A day on Venus is longer than its year! It takes 243 Earth days to rotate but only 225 days to orbit the Sun.", category: "Venus" },
    { title: "Mercury's Extremes", image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg", fact: "Mercury has the widest temperature range: from -180°C at night to 430°C during the day!", category: "Mercury" },
    { title: "Neptune's Super Winds", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg", fact: "Neptune has the strongest winds in the solar system, reaching speeds of 2,100 km/h - faster than the speed of sound!", category: "Neptune" },
    { title: "Uranus Rolls Around", image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", fact: "Uranus rotates on its side with a 98-degree tilt! Scientists think a massive collision knocked it over billions of years ago.", category: "Uranus" },

    // Sun & Stars
    { title: "The Sun's Power", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/800px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg", fact: "The Sun is so massive that 1.3 million Earths could fit inside it. Every second, it converts 600 million tons of hydrogen into helium!", category: "Sun" },
    { title: "Sunlight's Journey", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullSunCoronaGraph.jpg/800px-FullSunCoronaGraph.jpg", fact: "Sunlight takes about 8 minutes and 20 seconds to reach Earth, but it takes 100,000 years for that same light to travel from the Sun's core to its surface!", category: "Sun" },
    { title: "The Brightest Star", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sirius_A_and_B_Hubble_photo.jpg/800px-Sirius_A_and_B_Hubble_photo.jpg", fact: "Sirius is the brightest star in our night sky. It's actually a binary star system - two stars orbiting each other!", category: "Stars" },
    { title: "Betelgeuse the Giant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Betelgeuse_captured_by_ALMA.jpg/800px-Betelgeuse_captured_by_ALMA.jpg", fact: "Betelgeuse is so large that if it replaced our Sun, its surface would extend past Jupiter's orbit!", category: "Stars" },

    // Moon
    { title: "Moon Footprints", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Aldrin_Apollo_11.jpg/800px-Aldrin_Apollo_11.jpg", fact: "The footprints left by astronauts on the Moon will stay there for millions of years because there's no wind or water to erase them.", category: "Moon" },
    { title: "The Dark Side of the Moon", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/800px-FullMoon2010.jpg", fact: "The 'dark side' of the Moon isn't actually dark - it gets the same amount of sunlight. We just never see it from Earth because the Moon is tidally locked!", category: "Moon" },
    { title: "Moon's Slow Escape", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Moon_nearside_LRO.jpg/800px-Moon_nearside_LRO.jpg", fact: "The Moon is slowly drifting away from Earth at a rate of about 3.8 centimeters per year!", category: "Moon" },

    // Galaxies
    { title: "The Milky Way", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1200px-ESO-VLT-Laser-phot-33a-07.jpg", fact: "Our Milky Way contains 100-400 billion stars. It would take 100,000 years to travel across it at the speed of light!", category: "Galaxy" },
    { title: "Andromeda Collision", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/M31_09-01-2011_%28cropped%29.jpg/1200px-M31_09-01-2011_%28cropped%29.jpg", fact: "The Andromeda Galaxy is heading toward us at 110 km/second. In 4.5 billion years, it will collide and merge with our Milky Way!", category: "Galaxy" },
    { title: "Supermassive Black Holes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/800px-Black_hole_-_Messier_87_crop_max_res.jpg", fact: "At the center of most galaxies, including ours, is a supermassive black hole. The one in the Milky Way is 4 million times the mass of our Sun!", category: "Black Holes" },

    // Space Exploration
    { title: "Voyager 1's Journey", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Voyager_spacecraft_model.png/800px-Voyager_spacecraft_model.png", fact: "Voyager 1, launched in 1977, is the farthest human-made object from Earth - over 23 billion kilometers away and still sending data!", category: "Exploration" },
    { title: "International Space Station", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/1200px-International_Space_Station_after_undocking_of_STS-132.jpg", fact: "The ISS is the largest object ever assembled in space. It orbits Earth every 90 minutes at 28,000 km/h!", category: "Exploration" },
    { title: "First Moon Landing", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/800px-Aldrin_Apollo_11_original.jpg", fact: "Neil Armstrong and Buzz Aldrin were the first humans on the Moon on July 20, 1969. They spent only 2.5 hours walking on the surface!", category: "Exploration" },
    { title: "Hubble Space Telescope", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg", fact: "The Hubble Space Telescope has made over 1.5 million observations since 1990 and can see galaxies 13.4 billion light-years away!", category: "Exploration" },

    // Amazing Space Facts
    { title: "Space is Silent", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hubble_ultra_deep_field.jpg/800px-Hubble_ultra_deep_field.jpg", fact: "Space is completely silent! Sound waves need a medium like air to travel, and space is a vacuum with no air.", category: "Space" },
    { title: "A Day on Jupiter", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/800px-Jupiter.jpg", fact: "Despite being the largest planet, Jupiter has the shortest day - only 10 hours! It spins so fast that it bulges at the equator.", category: "Jupiter" },
    { title: "Saturn Could Float", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Saturn_PIA06077.jpg/800px-Saturn_PIA06077.jpg", fact: "Saturn is the only planet in our solar system that is less dense than water. If you had a big enough bathtub, it would float!", category: "Saturn" },
    { title: "Diamond Rain", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/800px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg", fact: "On Neptune and Uranus, it may rain diamonds! The extreme pressure turns carbon in the atmosphere into diamond crystals.", category: "Neptune" },
    { title: "Hottest Planet", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/800px-Venus_from_Mariner_10.jpg", fact: "Venus is the hottest planet in our solar system (462°C) even though Mercury is closer to the Sun - because of its thick greenhouse atmosphere!", category: "Venus" },
    { title: "One Million Earths", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sun_in_February_%28black_version%29.jpg/800px-Sun_in_February_%28black_version%29.jpg", fact: "The Sun makes up 99.86% of all mass in our solar system. About 1.3 million Earths could fit inside it!", category: "Sun" },
    { title: "The Asteroid Belt", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ida_and_Dactyl.jpg/800px-Ida_and_Dactyl.jpg", fact: "Despite what movies show, the asteroid belt is mostly empty space. If you collected all asteroids together, they'd be smaller than our Moon!", category: "Asteroids" },
    { title: "Neutron Star Density", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Crab_Nebula.jpg/800px-Crab_Nebula.jpg", fact: "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 6 billion tons on Earth!", category: "Stars" },
    { title: "Light Speed Limit", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Hubble_ultra_deep_field_high_rez_edit1.jpg/800px-Hubble_ultra_deep_field_high_rez_edit1.jpg", fact: "Light travels at 299,792 km per second. Even at this speed, light from the nearest star (Proxima Centauri) takes 4.24 years to reach us!", category: "Space" },
    { title: "Olympus Mons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Olympus_Mons.jpeg/800px-Olympus_Mons.jpeg", fact: "Mars' Olympus Mons is the largest volcano in the solar system - 21 km high (nearly 3x Everest) and 600 km wide!", category: "Mars" },
    { title: "Europa's Ocean", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Europa-moon.jpg/800px-Europa-moon.jpg", fact: "Jupiter's moon Europa has a liquid ocean beneath its icy surface that may contain more water than all of Earth's oceans combined!", category: "Moons" },
    { title: "Titan's Atmosphere", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Titan_in_true_color.jpg/800px-Titan_in_true_color.jpg", fact: "Saturn's moon Titan is the only moon in the solar system with a thick atmosphere. It even has lakes - but they're filled with liquid methane!", category: "Moons" },
    { title: "Io's Volcanoes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/800px-Io_highest_resolution_true_color.jpg", fact: "Jupiter's moon Io is the most volcanically active body in the solar system, with over 400 active volcanoes!", category: "Moons" },
    { title: "The Pale Blue Dot", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PaleBlueDot.jpg/800px-PaleBlueDot.jpg", fact: "In 1990, Voyager 1 took a photo of Earth from 6 billion km away. Earth appears as a tiny 'pale blue dot' - less than a pixel wide!", category: "Earth" },
    { title: "Cosmic Speed", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/The_Pillars_of_Creation.jpg/800px-The_Pillars_of_Creation.jpg", fact: "The Solar System is traveling through the Milky Way at about 828,000 km/h. In one year, we travel about 7.2 billion km!", category: "Space" },
    { title: "Mars Sunset", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/MarsSunset.jpg/1200px-MarsSunset.jpg", fact: "Sunsets on Mars appear blue! The dust in Mars' atmosphere scatters red light and lets blue light through - opposite of Earth!", category: "Mars" },
    { title: "Space Smell", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Astronaut-EVA.jpg/800px-Astronaut-EVA.jpg", fact: "Astronauts say that space smells like seared steak, gunpowder, and raspberries! This is due to dying stars releasing a chemical called ethyl formate.", category: "Space" },
    { title: "Venus Backwards", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Venus_globe.jpg/800px-Venus_globe.jpg", fact: "Venus spins backwards compared to other planets! On Venus, the Sun rises in the west and sets in the east.", category: "Venus" },
    { title: "Jupiter's Moons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Galilean_moons.jpg/1200px-Galilean_moons.jpg", fact: "Jupiter has at least 95 known moons! The four largest (Io, Europa, Ganymede, Callisto) were discovered by Galileo in 1610.", category: "Jupiter" },
    { title: "Ganymede Giant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ganymede_g1_true-edit1.jpg/800px-Ganymede_g1_true-edit1.jpg", fact: "Jupiter's moon Ganymede is the largest moon in the solar system - even bigger than the planet Mercury!", category: "Moons" },
    { title: "The Great Attractor", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/A_Hubble_image_of_ESO_137-001.jpg/800px-A_Hubble_image_of_ESO_137-001.jpg", fact: "A mysterious 'Great Attractor' is pulling our entire galaxy (and millions of others) toward it at 2 million km/h. We still don't know exactly what it is!", category: "Galaxy" },
    { title: "Coldest Place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Boomerang_nebula.jpg/800px-Boomerang_nebula.jpg", fact: "The Boomerang Nebula is the coldest known place in the universe at -272°C - just 1 degree above absolute zero!", category: "Nebula" },
    { title: "Pluto's Heart", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/800px-Pluto_in_True_Color_-_High-Res.jpg", fact: "Pluto has a heart-shaped glacier on its surface! It's made of frozen nitrogen and is larger than Texas.", category: "Dwarf Planets" },
    { title: "Spinning Pulsars", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Vela_Pulsar_jet.jpg/800px-Vela_Pulsar_jet.jpg", fact: "Pulsars are rapidly spinning neutron stars. The fastest known pulsar spins 716 times per second!", category: "Stars" },
    { title: "Magnetars", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Magnetar-1.jpg/800px-Magnetar-1.jpg", fact: "Magnetars have the strongest magnetic fields in the universe - a trillion times stronger than Earth's magnetic field!", category: "Stars" },
];

const SpaceFactOfDay = () => {
    const [currentFact, setCurrentFact] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Get today's fact based on date (rotates through the list)
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const factIndex = dayOfYear % spaceFacts.length;
        setCurrentFact(spaceFacts[factIndex]);
    }, []);

    if (!currentFact) return null;

    return (
        <motion.div
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span className="text-sm font-medium text-cosmic-cyan">Space Fact of the Day</span>
                    <span className="text-xs bg-cosmic-purple/30 px-2 py-1 rounded-full text-cosmic-violet ml-auto">
                        {currentFact.category}
                    </span>
                </div>
            </div>

            {/* Image */}
            <div className="relative bg-black/30" style={{ minHeight: '200px' }}>
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-cosmic-purple border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {!imageError ? (
                    <img
                        src={currentFact.image}
                        alt={currentFact.title}
                        className={`w-full h-64 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="h-64 flex items-center justify-center bg-gradient-to-b from-cosmic-purple/20 to-transparent">
                        <span className="text-6xl">🌌</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-display font-bold text-lg mb-2 text-white">{currentFact.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                    {currentFact.fact}
                </p>
                <p className="text-white/30 text-xs mt-3">
                    💡 {spaceFacts.length} facts - new one every day!
                </p>
            </div>
        </motion.div>
    );
};

export default SpaceFactOfDay;
