/**
 * Weight Calculator Utility
 * Calculates weight on different planets based on Earth weight
 */

// Gravity multipliers relative to Earth (1.0)
export const planetGravity = {
    mercury: 0.38,
    venus: 0.91,
    earth: 1.0,
    mars: 0.38,
    jupiter: 2.34,
    saturn: 1.06,
    uranus: 0.92,
    neptune: 1.12,
    moon: 0.17,
};

// Calculate weight on a planet
export const calculateWeight = (earthWeight, planetName) => {
    const gravity = planetGravity[planetName.toLowerCase()];
    if (!gravity) return null;
    return (earthWeight * gravity).toFixed(1);
};

// Get planet gravity description
export const getGravityDescription = (planetName) => {
    const gravity = planetGravity[planetName.toLowerCase()];
    if (!gravity) return '';

    if (gravity < 0.5) return 'Much weaker gravity - you could jump super high!';
    if (gravity < 1) return 'Weaker gravity - you would feel lighter!';
    if (gravity === 1) return 'Same as Earth!';
    if (gravity < 2) return 'Slightly stronger gravity.';
    return 'Very strong gravity - you would feel much heavier!';
};
