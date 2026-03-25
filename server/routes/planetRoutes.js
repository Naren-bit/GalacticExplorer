/**
 * Planet Routes - Enhanced
 * API endpoints for planet data with rich information
 */

const express = require('express');
const router = express.Router();
const Planet = require('../models/Planet');

/**
 * @route   GET /api/planets
 * @desc    Get all planets sorted by distance from Sun
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const planets = await Planet.find().sort({ orderFromSun: 1 });
        res.status(200).json({
            success: true,
            count: planets.length,
            data: planets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
});

/**
 * @route   GET /api/planets/:id
 * @desc    Get single planet by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        if (!planet) {
            return res.status(404).json({
                success: false,
                message: 'Planet not found',
            });
        }
        res.status(200).json({
            success: true,
            data: planet,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
});

/**
 * @route   POST /api/planets/seed
 * @desc    Seed database with all 8 planets + detailed info
 * @access  Public (for demo)
 */
router.post('/seed', async (req, res) => {
    try {
        await Planet.deleteMany({});

        const planetsData = [
            {
                name: 'Mercury',
                description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. Despite being nearest to the Sun, it is not the hottest planet because it has no atmosphere to trap heat.',
                color: '#B5B5B5',
                textureMap: 'mercury',
                distance: '36 million miles',
                distanceKm: 57900000,
                diameter: '3,032 miles',
                diameterKm: 4879,
                dayLength: '59 Earth days',
                yearLength: '88 Earth days',
                moons: 0,
                moonNames: [],
                temperature: '-180°C to 430°C',
                isGasGiant: false,
                hasRings: false,
                orderFromSun: 1,
                funFacts: [
                    'Mercury is the smallest planet in our solar system!',
                    'A year on Mercury is only 88 Earth days long.',
                    'Mercury has no moons or rings.',
                    'Despite being closest to the Sun, Mercury is not the hottest planet.',
                    'Mercury has ice in its craters that never see sunlight!',
                ],
            },
            {
                name: 'Venus',
                description: 'Venus is the second planet from the Sun and is often called Earth\'s twin because of their similar size. It is the hottest planet due to its thick atmosphere that traps heat.',
                color: '#E6C87A',
                textureMap: 'venus',
                distance: '67 million miles',
                distanceKm: 108200000,
                diameter: '7,521 miles',
                diameterKm: 12104,
                dayLength: '243 Earth days',
                yearLength: '225 Earth days',
                moons: 0,
                moonNames: [],
                temperature: '465°C average',
                isGasGiant: false,
                hasRings: false,
                orderFromSun: 2,
                funFacts: [
                    'Venus is the hottest planet at 465°C - hot enough to melt lead!',
                    'Venus spins backwards compared to most planets.',
                    'A day on Venus is longer than its year!',
                    'Venus is sometimes called Earth\'s twin because of similar size.',
                    'The thick clouds on Venus are made of sulfuric acid.',
                ],
            },
            {
                name: 'Earth',
                description: 'Earth is our home planet and the only known place in the universe with life. It has liquid water on its surface and a protective atmosphere that makes life possible.',
                color: '#4A90D9',
                textureMap: 'earth',
                distance: '93 million miles',
                distanceKm: 149600000,
                diameter: '7,926 miles',
                diameterKm: 12756,
                dayLength: '24 hours',
                yearLength: '365.25 days',
                moons: 1,
                moonNames: ['The Moon'],
                temperature: '15°C average',
                isGasGiant: false,
                hasRings: false,
                orderFromSun: 3,
                funFacts: [
                    'Earth is the only planet known to have life!',
                    '70% of Earth\'s surface is covered by water.',
                    'Earth has one moon simply called "The Moon".',
                    'Earth is the densest planet in our solar system.',
                    'The Earth rotates at about 1,000 miles per hour!',
                ],
            },
            {
                name: 'Mars',
                description: 'Mars is called the Red Planet because of iron oxide (rust) on its surface. It has the largest volcano and canyon in the solar system.',
                color: '#E27B58',
                textureMap: 'mars',
                distance: '142 million miles',
                distanceKm: 228000000,
                diameter: '4,221 miles',
                diameterKm: 6792,
                dayLength: '24.6 hours',
                yearLength: '687 Earth days',
                moons: 2,
                moonNames: ['Phobos', 'Deimos'],
                temperature: '-65°C average',
                isGasGiant: false,
                hasRings: false,
                orderFromSun: 4,
                funFacts: [
                    'Mars is called the Red Planet because of iron oxide (rust)!',
                    'Mars has the tallest volcano: Olympus Mons (21 km high)!',
                    'Mars has two tiny moons named Phobos and Deimos.',
                    'A day on Mars is almost the same length as Earth.',
                    'Mars has seasons like Earth because of its tilted axis.',
                ],
            },
            {
                name: 'Jupiter',
                description: 'Jupiter is the largest planet in our solar system. It is a gas giant and is famous for its Great Red Spot, a storm that has been raging for over 300 years.',
                color: '#D4A574',
                textureMap: 'jupiter',
                distance: '484 million miles',
                distanceKm: 778500000,
                diameter: '88,846 miles',
                diameterKm: 142984,
                dayLength: '10 hours',
                yearLength: '12 Earth years',
                moons: 95,
                moonNames: ['Io', 'Europa', 'Ganymede', 'Callisto'],
                temperature: '-110°C average',
                isGasGiant: true,
                hasRings: true,
                orderFromSun: 5,
                funFacts: [
                    'Jupiter is so big that 1,300 Earths could fit inside it!',
                    'The Great Red Spot is a storm bigger than Earth!',
                    'Jupiter has 95 known moons - a mini solar system!',
                    'Jupiter spins faster than any other planet (10 hours)!',
                    'Jupiter is made of hydrogen and helium, like the Sun.',
                ],
            },
            {
                name: 'Saturn',
                description: 'Saturn is famous for its beautiful rings made of ice and rock. It is the second largest planet and has the most moons of any planet.',
                color: '#E8D5A3',
                textureMap: 'saturn',
                distance: '886 million miles',
                distanceKm: 1432000000,
                diameter: '74,898 miles',
                diameterKm: 120536,
                dayLength: '10.7 hours',
                yearLength: '29 Earth years',
                moons: 146,
                moonNames: ['Titan', 'Enceladus', 'Mimas', 'Rhea'],
                temperature: '-140°C average',
                isGasGiant: true,
                hasRings: true,
                orderFromSun: 6,
                funFacts: [
                    'Saturn has the most beautiful rings in the solar system!',
                    'Saturn has 146 moons - more than any other planet!',
                    'Saturn is less dense than water - it could float!',
                    'Saturn\'s moon Titan has lakes and rivers of liquid methane.',
                    'Saturn has a mysterious hexagon-shaped storm at its north pole.',
                ],
            },
            {
                name: 'Uranus',
                description: 'Uranus is an ice giant that rotates on its side. It appears blue-green due to methane in its atmosphere and has 27 known moons.',
                color: '#7EC8E8',
                textureMap: 'uranus',
                distance: '1.8 billion miles',
                distanceKm: 2867000000,
                diameter: '31,763 miles',
                diameterKm: 51118,
                dayLength: '17 hours',
                yearLength: '84 Earth years',
                moons: 27,
                moonNames: ['Miranda', 'Ariel', 'Umbriel', 'Titania', 'Oberon'],
                temperature: '-195°C average',
                isGasGiant: true,
                hasRings: true,
                orderFromSun: 7,
                funFacts: [
                    'Uranus is tilted 98 degrees - it rolls around the Sun!',
                    'Uranus appears blue-green due to methane gas.',
                    'Uranus has 27 moons named after Shakespeare characters!',
                    'Uranus is an "ice giant" rather than a gas giant.',
                    'It may rain diamonds on Uranus due to extreme pressure!',
                ],
            },
            {
                name: 'Neptune',
                description: 'Neptune is the farthest planet from the Sun. It is known for its deep blue color and has the strongest winds in the solar system.',
                color: '#4B6CB7',
                textureMap: 'neptune',
                distance: '2.8 billion miles',
                distanceKm: 4515000000,
                diameter: '30,779 miles',
                diameterKm: 49528,
                dayLength: '16 hours',
                yearLength: '165 Earth years',
                moons: 16,
                moonNames: ['Triton', 'Nereid', 'Proteus'],
                temperature: '-200°C average',
                isGasGiant: true,
                hasRings: true,
                orderFromSun: 8,
                funFacts: [
                    'Neptune has the strongest winds - up to 2,100 km/h!',
                    'Neptune\'s moon Triton orbits backwards!',
                    'It takes 165 years for Neptune to orbit the Sun once.',
                    'Neptune is so far that sunlight takes 4 hours to reach it.',
                    'Neptune was discovered using math before being seen!',
                ],
            },
        ];

        const planets = await Planet.insertMany(planetsData);

        res.status(201).json({
            success: true,
            message: '🚀 All 8 planets seeded with detailed information!',
            count: planets.length,
            data: planets.map(p => ({ name: p.name, moons: p.moons })),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error seeding database',
            error: error.message,
        });
    }
});

module.exports = router;
