/**
 * TextToSpeech Utility
 * Uses Web Speech API to read text aloud
 * Optimized for kids with slower rate and friendly pitch
 */

// Check if speech synthesis is supported
export const isSpeechSupported = () => {
    return 'speechSynthesis' in window;
};

// Speak text aloud
export const speak = (text, onEnd = null) => {
    if (!isSpeechSupported()) {
        console.warn('Speech synthesis not supported');
        return null;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;  // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher/friendly
    utterance.volume = 1;

    if (onEnd) {
        utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return utterance;
};

// Stop speaking
export const stopSpeaking = () => {
    if (isSpeechSupported()) {
        window.speechSynthesis.cancel();
    }
};

// Check if currently speaking
export const isSpeaking = () => {
    return isSpeechSupported() && window.speechSynthesis.speaking;
};
