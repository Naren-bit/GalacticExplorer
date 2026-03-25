/**
 * NasaApod Component
 * Displays NASA Astronomy Picture of the Day
 * Always shows the section with fallback content
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NasaApod = () => {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchApod = async () => {
            try {
                setLoading(true);
                // NASA's free demo API key
                const response = await fetch(
                    'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
                );

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                setApod(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching NASA APOD:', err);
                setError('Unable to load NASA Picture of the Day');
            } finally {
                setLoading(false);
            }
        };

        fetchApod();
    }, []);

    // Use hdurl if available, fallback to url
    const imageUrl = apod?.hdurl || apod?.url;

    return (
        <motion.div
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🛰️</span>
                    <span className="text-sm font-medium text-cosmic-cyan">NASA Picture of the Day</span>
                    {apod?.date && (
                        <span className="text-xs text-white/40 ml-auto">{apod.date}</span>
                    )}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="p-8 text-center">
                    <div className="w-8 h-8 border-2 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-white/50 text-sm">Loading from NASA...</p>
                </div>
            ) : error ? (
                <div className="p-8 text-center">
                    <span className="text-4xl mb-4 block">🚀</span>
                    <p className="text-white/60 text-sm">{error}</p>
                    <p className="text-white/40 text-xs mt-2">NASA's API may be temporarily unavailable</p>
                </div>
            ) : apod ? (
                <>
                    {/* Image or Video */}
                    <div className="relative bg-black/30" style={{ minHeight: '200px' }}>
                        {apod.media_type === 'video' ? (
                            <iframe
                                src={apod.url}
                                title={apod.title}
                                className="w-full aspect-video"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                {/* Loading placeholder */}
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-space-900/50">
                                        <div className="text-center">
                                            <div className="w-8 h-8 border-2 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                            <p className="text-white/40 text-xs">Loading image...</p>
                                        </div>
                                    </div>
                                )}
                                <img
                                    src={imageUrl}
                                    alt={apod.title}
                                    className={`w-full h-auto max-h-[400px] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                    onError={(e) => {
                                        console.log('Image failed to load:', imageUrl);
                                        // Show fallback
                                        e.target.style.display = 'none';
                                        setImageLoaded(true);
                                    }}
                                />
                            </>
                        )}
                    </div>

                    {/* Title and Description */}
                    <div className="p-4">
                        <h3 className="font-display font-bold text-lg mb-2 text-white">{apod.title}</h3>
                        <p className="text-white/60 text-sm line-clamp-3">
                            {apod.explanation}
                        </p>
                        {apod.copyright && (
                            <p className="text-white/30 text-xs mt-2">© {apod.copyright}</p>
                        )}
                    </div>
                </>
            ) : null}
        </motion.div>
    );
};

export default NasaApod;
