/**
 * SensoryMode Context
 * Provides app-wide sensory/quiet mode toggle
 * Reduces animations and visual intensity for sensitive users
 */

import { createContext, useContext, useState, useEffect } from 'react';

const SensoryModeContext = createContext();

export const useSensoryMode = () => useContext(SensoryModeContext);

export const SensoryModeProvider = ({ children }) => {
    const [isSensoryMode, setIsSensoryMode] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('galactic_sensory_mode');
        if (saved) {
            setIsSensoryMode(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage and apply CSS class
    useEffect(() => {
        localStorage.setItem('galactic_sensory_mode', JSON.stringify(isSensoryMode));

        if (isSensoryMode) {
            document.body.classList.add('sensory-mode');
        } else {
            document.body.classList.remove('sensory-mode');
        }
    }, [isSensoryMode]);

    const toggleSensoryMode = () => {
        setIsSensoryMode(prev => !prev);
    };

    return (
        <SensoryModeContext.Provider value={{ isSensoryMode, toggleSensoryMode }}>
            {children}
        </SensoryModeContext.Provider>
    );
};
