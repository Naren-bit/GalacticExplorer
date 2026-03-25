/**
 * SpeakButton Component
 * Text-to-speech button for reading content aloud
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { speak, stopSpeaking, isSpeechSupported } from '../utils/textToSpeech';

const SpeakButton = ({ text, className = '' }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    if (!isSpeechSupported()) {
        return null; // Don't render if not supported
    }

    const handleClick = () => {
        if (isSpeaking) {
            stopSpeaking();
            setIsSpeaking(false);
        } else {
            setIsSpeaking(true);
            speak(text, () => setIsSpeaking(false));
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center
                  bg-cosmic-purple/30 hover:bg-cosmic-purple/50 transition-colors
                  ${isSpeaking ? 'ring-2 ring-cosmic-purple' : ''} ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
            title={isSpeaking ? 'Stop' : 'Read aloud'}
        >
            <span className="text-lg">{isSpeaking ? '⏹️' : '🔊'}</span>
        </motion.button>
    );
};

export default SpeakButton;
