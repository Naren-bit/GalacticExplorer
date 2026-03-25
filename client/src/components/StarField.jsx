/**
 * StarField Component - Enhanced Background
 * Beautiful animated space background with nebula, stars, and particles
 */

import { useMemo } from 'react';
import './StarField.css';

const StarField = () => {
    // Generate random stars
    const stars = useMemo(() => {
        return Array.from({ length: 80 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() < 0.3 ? 'star-large' : Math.random() < 0.6 ? 'star' : 'star-small',
            delay: `${Math.random() * 5}s`,
        }));
    }, []);

    return (
        <div className="stars-container" aria-hidden="true">
            {/* Multi-layer gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, #0a0a1a 0%, #111827 50%, #0f172a 100%)
          `,
                }}
            />

            {/* Animated nebula clouds */}
            <div className="nebula nebula-1" />
            <div className="nebula nebula-2" />
            <div className="nebula nebula-3" />

            {/* Star field */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`star ${star.size}`}
                    style={{
                        left: star.left,
                        top: star.top,
                        animationDelay: star.delay,
                    }}
                />
            ))}

            {/* Shooting stars */}
            <div className="shooting-star shooting-star-1" />
            <div className="shooting-star shooting-star-2" />

            {/* Floating particles */}
            <div className="particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StarField;
