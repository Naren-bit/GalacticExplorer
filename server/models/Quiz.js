/**
 * Quiz Model
 * Mongoose schema for quiz questions
 */

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'Question is required'],
            trim: true,
        },
        options: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length === 4;
                },
                message: 'Must have exactly 4 options',
            },
        },
        correctAnswer: {
            type: Number,
            required: true,
            min: 0,
            max: 3,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: true,
        },
        planetName: {
            type: String,
            required: false,
        },
        explanation: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Quiz', quizSchema);
