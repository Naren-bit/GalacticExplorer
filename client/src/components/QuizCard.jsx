/**
 * QuizCard Component
 * Individual quiz question with animated feedback
 */

import { motion } from 'framer-motion';

const QuizCard = ({
    question,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    showResult,
    onSelectAnswer
}) => {
    const getButtonStyle = (index) => {
        if (!showResult) {
            return selectedAnswer === index
                ? 'bg-cosmic-purple/50 border-cosmic-purple'
                : 'bg-glass-light border-transparent hover:bg-glass-medium';
        }

        if (index === question.correctAnswer) {
            return 'bg-green-500/30 border-green-500';
        }

        if (selectedAnswer === index && index !== question.correctAnswer) {
            return 'bg-red-400/30 border-red-400';
        }

        return 'bg-glass-light border-transparent opacity-50';
    };

    return (
        <motion.div
            className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-cosmic-cyan font-medium">
                    Question {currentIndex + 1} of {totalQuestions}
                </span>
                <div className="flex gap-1">
                    {Array.from({ length: totalQuestions }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-colors ${i <= currentIndex ? 'bg-cosmic-purple' : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 leading-relaxed">
                {question.question}
            </h2>

            {/* Answer options */}
            <div className="grid gap-4">
                {question.options.map((option, index) => (
                    <motion.button
                        key={index}
                        onClick={() => !showResult && onSelectAnswer(index)}
                        disabled={showResult}
                        className={`w-full p-5 rounded-2xl text-left text-lg font-medium
                       border-2 transition-all duration-300
                       min-h-[60px] flex items-center
                       ${getButtonStyle(index)}
                       ${!showResult ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                    >
                        <span className="mr-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                        {showResult && index === question.correctAnswer && (
                            <span className="ml-auto text-2xl">✓</span>
                        )}
                        {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                            <span className="ml-auto text-2xl">✗</span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Explanation (shown after answering) */}
            {showResult && (
                <motion.div
                    className="mt-6 p-4 rounded-xl bg-cosmic-purple/20 border border-cosmic-purple/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-lg">
                        <span className="font-semibold text-cosmic-violet">💡 Did you know? </span>
                        {question.explanation}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default QuizCard;
