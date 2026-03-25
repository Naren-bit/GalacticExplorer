/**
 * Quiz Routes
 * API endpoints for quiz functionality
 */

const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

/**
 * @route   GET /api/quiz/:difficulty
 * @desc    Get quiz questions by difficulty
 * @access  Public
 */
router.get('/:difficulty', async (req, res) => {
    try {
        const { difficulty } = req.params;

        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid difficulty. Use: easy, medium, or hard',
            });
        }

        const questions = await Quiz.find({ difficulty });

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions,
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
 * @route   GET /api/quiz
 * @desc    Get all quiz questions
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const questions = await Quiz.find();
        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions,
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
 * @route   POST /api/quiz/seed
 * @desc    Seed database with quiz questions
 * @access  Public (for demo)
 */
router.post('/seed', async (req, res) => {
    try {
        await Quiz.deleteMany({});

        const quizData = [
            // EASY QUESTIONS (5)
            {
                question: 'Which planet is known as the Red Planet?',
                options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                correctAnswer: 1,
                difficulty: 'easy',
                planetName: 'Mars',
                explanation: 'Mars appears red because of iron oxide (rust) on its surface!',
            },
            {
                question: 'Which planet is the largest in our solar system?',
                options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
                correctAnswer: 2,
                difficulty: 'easy',
                planetName: 'Jupiter',
                explanation: 'Jupiter is so big that 1,300 Earths could fit inside it!',
            },
            {
                question: 'Which planet has beautiful rings around it?',
                options: ['Mars', 'Earth', 'Saturn', 'Venus'],
                correctAnswer: 2,
                difficulty: 'easy',
                planetName: 'Saturn',
                explanation: 'Saturn has the most visible and beautiful rings made of ice and rock!',
            },
            {
                question: 'Which planet do we live on?',
                options: ['Mars', 'Venus', 'Earth', 'Mercury'],
                correctAnswer: 2,
                difficulty: 'easy',
                planetName: 'Earth',
                explanation: 'Earth is our home and the only planet known to have life!',
            },
            {
                question: 'Which planet is closest to the Sun?',
                options: ['Venus', 'Earth', 'Mars', 'Mercury'],
                correctAnswer: 3,
                difficulty: 'easy',
                planetName: 'Mercury',
                explanation: 'Mercury is the smallest and closest planet to the Sun!',
            },

            // MEDIUM QUESTIONS (7)
            {
                question: 'Which planet spins backwards compared to other planets?',
                options: ['Mars', 'Venus', 'Neptune', 'Jupiter'],
                correctAnswer: 1,
                difficulty: 'medium',
                planetName: 'Venus',
                explanation: 'Venus rotates clockwise while most planets rotate counter-clockwise!',
            },
            {
                question: 'How many moons does Mars have?',
                options: ['0', '1', '2', '4'],
                correctAnswer: 2,
                difficulty: 'medium',
                planetName: 'Mars',
                explanation: 'Mars has two small moons named Phobos and Deimos!',
            },
            {
                question: 'Which planet is tilted on its side?',
                options: ['Neptune', 'Uranus', 'Saturn', 'Jupiter'],
                correctAnswer: 1,
                difficulty: 'medium',
                planetName: 'Uranus',
                explanation: 'Uranus is tilted 98 degrees, so it rolls around the Sun like a ball!',
            },
            {
                question: 'Which planet is the hottest in our solar system?',
                options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
                correctAnswer: 1,
                difficulty: 'medium',
                planetName: 'Venus',
                explanation: 'Venus is hottest (465°C) due to its thick atmosphere trapping heat!',
            },
            {
                question: 'Which planet has the Great Red Spot?',
                options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
                correctAnswer: 2,
                difficulty: 'medium',
                planetName: 'Jupiter',
                explanation: 'The Great Red Spot is a giant storm that has been raging for over 300 years!',
            },
            {
                question: 'Which planet has the most moons?',
                options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                correctAnswer: 1,
                difficulty: 'medium',
                planetName: 'Saturn',
                explanation: 'Saturn has 146 known moons, more than any other planet!',
            },
            {
                question: 'What color is Neptune?',
                options: ['Red', 'Yellow', 'Blue', 'Green'],
                correctAnswer: 2,
                difficulty: 'medium',
                planetName: 'Neptune',
                explanation: 'Neptune is blue because methane in its atmosphere absorbs red light!',
            },

            // HARD QUESTIONS (10)
            {
                question: 'Which planet has the tallest volcano in the solar system?',
                options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
                correctAnswer: 2,
                difficulty: 'hard',
                planetName: 'Mars',
                explanation: 'Olympus Mons on Mars is 21 km tall - nearly 3 times Mount Everest!',
            },
            {
                question: 'Which planet has the strongest winds?',
                options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                correctAnswer: 3,
                difficulty: 'hard',
                planetName: 'Neptune',
                explanation: 'Neptune has winds up to 2,100 km/h - the fastest in the solar system!',
            },
            {
                question: 'How long is one day on Mercury?',
                options: ['24 hours', '59 Earth days', '88 Earth days', '176 Earth days'],
                correctAnswer: 1,
                difficulty: 'hard',
                planetName: 'Mercury',
                explanation: 'Mercury rotates very slowly - one day equals 59 Earth days!',
            },
            {
                question: 'Which planet could float in water if there was a bathtub big enough?',
                options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                correctAnswer: 1,
                difficulty: 'hard',
                planetName: 'Saturn',
                explanation: 'Saturn is less dense than water, so it would float!',
            },
            {
                question: 'What is Jupiter mostly made of?',
                options: ['Rock and metal', 'Ice', 'Hydrogen and helium', 'Carbon dioxide'],
                correctAnswer: 2,
                difficulty: 'hard',
                planetName: 'Jupiter',
                explanation: 'Jupiter is 90% hydrogen and 10% helium, just like the Sun!',
            },
            {
                question: 'How long does it take Neptune to orbit the Sun?',
                options: ['12 years', '29 years', '84 years', '165 years'],
                correctAnswer: 3,
                difficulty: 'hard',
                planetName: 'Neptune',
                explanation: 'Neptune takes 165 Earth years to complete one orbit around the Sun!',
            },
            {
                question: 'Which planet has a hexagonal storm at its north pole?',
                options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                correctAnswer: 1,
                difficulty: 'hard',
                planetName: 'Saturn',
                explanation: 'Saturn has a mysterious hexagon-shaped storm at its north pole!',
            },
            {
                question: 'What are Saturn\'s rings mainly made of?',
                options: ['Dust', 'Gas', 'Ice and rock', 'Metal'],
                correctAnswer: 2,
                difficulty: 'hard',
                planetName: 'Saturn',
                explanation: 'Saturn\'s rings are mostly ice particles with some rocky debris!',
            },
            {
                question: 'Which planet has diamond rain?',
                options: ['Jupiter', 'Saturn', 'Uranus', 'Both Uranus and Neptune'],
                correctAnswer: 3,
                difficulty: 'hard',
                planetName: 'Neptune',
                explanation: 'Both Uranus and Neptune may have diamond rain due to extreme pressure!',
            },
            {
                question: 'How many Earth days is one year on Mercury?',
                options: ['88 days', '225 days', '365 days', '687 days'],
                correctAnswer: 0,
                difficulty: 'hard',
                planetName: 'Mercury',
                explanation: 'Mercury orbits the Sun in just 88 Earth days - the shortest year!',
            },
        ];

        const questions = await Quiz.insertMany(quizData);

        res.status(201).json({
            success: true,
            message: '🎯 Quiz questions seeded successfully!',
            count: questions.length,
            breakdown: {
                easy: quizData.filter(q => q.difficulty === 'easy').length,
                medium: quizData.filter(q => q.difficulty === 'medium').length,
                hard: quizData.filter(q => q.difficulty === 'hard').length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error seeding quiz questions',
            error: error.message,
        });
    }
});

module.exports = router;
