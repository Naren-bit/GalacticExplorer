/**
 * Auth Routes - User authentication endpoints
 * Register, Login, Get Profile, Update Progress
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'galactic-explorer-secret-key-2024';
const JWT_EXPIRES_IN = '7d';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Middleware to verify token
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            badges: [],
            quizHistory: [],
            planetsViewed: []
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                badges: user.badges,
                quizHistory: user.quizHistory,
                planetsViewed: user.planetsViewed
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating account'
        });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user with password
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: `No account exists with email "${email}". Please create one first.`
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password. Please try again.'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: `Welcome back, ${user.name}!`,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                badges: user.badges,
                quizHistory: user.quizHistory,
                planetsViewed: user.planetsViewed
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in'
        });
    }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 */
router.get('/me', authMiddleware, async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

/**
 * @route   PUT /api/auth/progress
 * @desc    Update user progress (badges, quiz history, planets viewed)
 */
router.put('/progress', authMiddleware, async (req, res) => {
    try {
        const { badges, quizHistory, planetsViewed } = req.body;
        const updates = {};

        if (badges) {
            // Add new badges (avoid duplicates)
            updates.$addToSet = { badges: { $each: badges } };
        }

        if (quizHistory) {
            // Push new quiz result
            updates.$push = { quizHistory: quizHistory };
        }

        if (planetsViewed) {
            // Add viewed planets (avoid duplicates)
            if (!updates.$addToSet) updates.$addToSet = {};
            updates.$addToSet.planetsViewed = { $each: planetsViewed };
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true }
        );

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Progress update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating progress'
        });
    }
});

module.exports = router;
