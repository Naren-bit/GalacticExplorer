/**
 * Galactic Explorer - Server Entry Point
 * Express server with MongoDB connection
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const planetRoutes = require('./routes/planetRoutes');
const quizRoutes = require('./routes/quizRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/planets', planetRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: '🌌 Welcome to Galactic Explorer API!',
        version: '2.0',
        endpoints: {
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login',
                profile: 'GET /api/auth/me',
                updateProgress: 'PUT /api/auth/progress',
            },
            planets: {
                getAll: 'GET /api/planets',
                getOne: 'GET /api/planets/:id',
                seed: 'POST /api/planets/seed',
            },
            quiz: {
                getByDifficulty: 'GET /api/quiz/:difficulty',
                getAll: 'GET /api/quiz',
                seed: 'POST /api/quiz/seed',
            },
        },
    });
});

// Export for Vercel serverless
module.exports = app;

// Start server only when running directly (not imported by Vercel)
const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
