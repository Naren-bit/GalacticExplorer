/**
 * Planet Model - Enhanced
 * Mongoose schema with rich planet information
 */

const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Planet name is required'],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        color: {
            type: String,
            required: [true, 'Color hex code is required'],
            match: [/^#[0-9A-Fa-f]{6}$/, 'Please enter a valid hex color'],
        },
        // Texture name for 3D rendering
        textureMap: {
            type: String,
            default: 'earth',
        },
        // Distance from Sun
        distance: {
            type: String,
            required: [true, 'Distance from Sun is required'],
        },
        distanceKm: {
            type: Number,
            required: true,
        },
        // Physical properties
        diameter: {
            type: String,
            required: true,
        },
        diameterKm: {
            type: Number,
            required: true,
        },
        // Orbital properties
        dayLength: {
            type: String,
            required: true,
        },
        yearLength: {
            type: String,
            required: true,
        },
        // Moons
        moons: {
            type: Number,
            default: 0,
        },
        moonNames: {
            type: [String],
            default: [],
        },
        // Temperature
        temperature: {
            type: String,
            required: true,
        },
        // Type
        isGasGiant: {
            type: Boolean,
            default: false,
        },
        hasRings: {
            type: Boolean,
            default: false,
        },
        // Multiple fun facts
        funFacts: {
            type: [String],
            required: true,
        },
        // Order from Sun (1 = Mercury, 8 = Neptune)
        orderFromSun: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Planet', planetSchema);
