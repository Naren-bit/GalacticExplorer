/**
 * Space Objects Data
 * Static data for asteroids, comets, galaxies, black holes, and other cosmic phenomena
 */

export const spaceObjects = {
    asteroids: [
        {
            id: 'asteroid-belt',
            name: 'Asteroid Belt',
            icon: '🪨',
            color: '#9CA3AF',
            shortDesc: 'Millions of rocky objects between Mars and Jupiter',
            description: 'The Asteroid Belt is a region of space between Mars and Jupiter where millions of rocky objects orbit the Sun. These space rocks range from tiny pebbles to dwarf planets like Ceres!',
            facts: [
                'The asteroid belt contains millions of asteroids!',
                'The largest asteroid, Ceres, is 940 km wide.',
                'All asteroids in the belt would fit inside our Moon.',
                'Asteroids are leftovers from when our solar system formed.',
                'Some asteroids have their own tiny moons!',
            ],
            stats: [
                { label: 'Location', value: 'Mars to Jupiter' },
                { label: 'Largest Object', value: 'Ceres (940 km)' },
                { label: 'Total Mass', value: '4% of Moon' },
                { label: 'Age', value: '4.6 Billion Years' },
            ],
        },
    ],

    comets: [
        {
            id: 'halleys-comet',
            name: "Halley's Comet",
            icon: '☄️',
            color: '#22D3EE',
            shortDesc: 'Famous comet visible every 76 years',
            description: "Halley's Comet is the most famous comet! It visits Earth approximately every 76 years. When it gets close to the Sun, it develops a beautiful glowing tail that can stretch millions of miles!",
            facts: [
                "Halley's Comet was last visible from Earth in 1986.",
                'It will return in 2061 - mark your calendars!',
                'The comet is about 15 km long and 8 km wide.',
                'Its tail can be 100 million km long!',
                'People have been watching this comet for over 2,000 years.',
            ],
            stats: [
                { label: 'Orbit Period', value: '76 Years' },
                { label: 'Next Visit', value: '2061' },
                { label: 'Size', value: '15 km long' },
                { label: 'Speed', value: '254,000 km/h' },
            ],
        },
    ],

    galaxies: [
        {
            id: 'milky-way',
            name: 'Milky Way Galaxy',
            icon: '🌌',
            color: '#8B5CF6',
            shortDesc: 'Our home galaxy with 200 billion stars',
            description: 'The Milky Way is our cosmic home! It is a spiral galaxy that contains our solar system. When you look up at the night sky and see a band of light, you are looking at billions of stars in our galaxy!',
            facts: [
                'The Milky Way contains 200-400 billion stars!',
                'It would take 100,000 years to cross our galaxy at light speed.',
                'Our Sun is just one star among hundreds of billions.',
                'The Milky Way is on a collision course with Andromeda Galaxy!',
                'There is a supermassive black hole at the center called Sagittarius A*.',
            ],
            stats: [
                { label: 'Diameter', value: '100,000 light-years' },
                { label: 'Stars', value: '200-400 billion' },
                { label: 'Age', value: '13.6 billion years' },
                { label: 'Type', value: 'Spiral Galaxy' },
            ],
        },
        {
            id: 'andromeda',
            name: 'Andromeda Galaxy',
            icon: '✨',
            color: '#A78BFA',
            shortDesc: 'Our nearest large galaxy neighbor',
            description: 'The Andromeda Galaxy is the closest large galaxy to the Milky Way and is heading toward us! In about 4.5 billion years, our galaxies will merge to form one giant galaxy.',
            facts: [
                'Andromeda contains about 1 trillion stars!',
                'It is 2.5 million light-years away from Earth.',
                'You can see it with your naked eye on a dark night!',
                'Andromeda is approaching us at 110 km per second.',
                'It is the largest galaxy in our Local Group.',
            ],
            stats: [
                { label: 'Distance', value: '2.5 million light-years' },
                { label: 'Stars', value: '~1 trillion' },
                { label: 'Diameter', value: '220,000 light-years' },
                { label: 'Collision ETA', value: '4.5 billion years' },
            ],
        },
    ],

    blackHoles: [
        {
            id: 'black-hole',
            name: 'Black Holes',
            icon: '🕳️',
            color: '#1F2937',
            shortDesc: 'Mysterious objects with gravity so strong even light cannot escape',
            description: 'Black holes are regions in space where gravity is so incredibly strong that nothing - not even light - can escape once it gets too close. They form when giant stars collapse at the end of their lives.',
            facts: [
                'Black holes are invisible - we detect them by their effects!',
                'Time slows down near a black hole.',
                'The closest black hole is about 1,500 light-years away.',
                'Supermassive black holes can be billions of times heavier than the Sun.',
                'If you fell into a black hole, you would be stretched like spaghetti!',
            ],
            stats: [
                { label: 'Nearest', value: '1,500 light-years' },
                { label: 'In Milky Way', value: '~100 million' },
                { label: 'Largest Known', value: '40 billion Suns' },
                { label: 'Discovery', value: '1964' },
            ],
        },
    ],

    otherPhenomena: [
        {
            id: 'nebula',
            name: 'Nebulae',
            icon: '🌫️',
            color: '#EC4899',
            shortDesc: 'Beautiful clouds where new stars are born',
            description: 'Nebulae are giant clouds of gas and dust in space. They are often called "stellar nurseries" because new stars are born inside them. Some of the most beautiful images from space show colorful nebulae!',
            facts: [
                'The word "nebula" means "cloud" in Latin.',
                'Some nebulae are hundreds of light-years across!',
                'The Orion Nebula is visible with the naked eye.',
                'Stars form when nebula gas and dust clump together.',
                'Planetary nebulae form when dying stars shed their outer layers.',
            ],
            stats: [
                { label: 'Largest Known', value: 'Tarantula Nebula' },
                { label: 'Size Range', value: '1 to 1000+ light-years' },
                { label: 'Nearest', value: 'Helix (700 ly)' },
                { label: 'Composition', value: 'Hydrogen & Helium' },
            ],
        },
        {
            id: 'neutron-star',
            name: 'Neutron Stars',
            icon: '💫',
            color: '#6366F1',
            shortDesc: 'Super-dense stars spinning incredibly fast',
            description: 'Neutron stars are the collapsed cores of massive stars. They are incredibly dense - a teaspoon of neutron star material would weigh about 6 billion tons on Earth! Some spin hundreds of times per second.',
            facts: [
                'A teaspoon of neutron star weighs 6 billion tons!',
                'They can spin up to 716 times per second.',
                'Neutron stars are only about 20 km across.',
                'Their magnetic fields are trillions of times stronger than Earth\'s.',
                'Pulsars are neutron stars that emit beams of radiation.',
            ],
            stats: [
                { label: 'Diameter', value: '~20 km' },
                { label: 'Density', value: '1 billion tons/tsp' },
                { label: 'Spin Rate', value: 'Up to 716/sec' },
                { label: 'In Milky Way', value: '~1 billion' },
            ],
        },
        {
            id: 'supernova',
            name: 'Supernovae',
            icon: '💥',
            color: '#EF4444',
            shortDesc: 'Massive star explosions that outshine entire galaxies',
            description: 'A supernova is the explosive death of a massive star. For a brief time, a single supernova can outshine an entire galaxy! These explosions create and scatter elements that make up everything around us - including you!',
            facts: [
                'A supernova can briefly outshine 10 billion suns!',
                'The elements in your body were made in supernovae.',
                'One occurs in our galaxy about every 50 years.',
                'Supernovae can be seen from millions of light-years away.',
                'They leave behind neutron stars or black holes.',
            ],
            stats: [
                { label: 'Brightness', value: '10 billion suns' },
                { label: 'Energy', value: '10^44 joules' },
                { label: 'Duration', value: 'Weeks to months' },
                { label: 'In Milky Way', value: '~1 every 50 years' },
            ],
        },
    ],
};

export const allSpaceObjects = [
    ...spaceObjects.asteroids,
    ...spaceObjects.comets,
    ...spaceObjects.galaxies,
    ...spaceObjects.blackHoles,
    ...spaceObjects.otherPhenomena,
];
