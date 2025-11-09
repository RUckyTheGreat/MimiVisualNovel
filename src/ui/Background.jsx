import React, { useState, useEffect } from 'react';

/**
 * Komponen untuk menampilkan gambar latar belakang adegan dengan efek visual halus.
 * @param {object} props
 * @param {string} props.image - Filename gambar (misalnya: 'forest_day.jpg').
 * @param {number} props.overlay - Opacity overlay gelap (0-100).
 */
function Background({ image, overlay = 0 }) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (image) {
            setIsLoading(true);
            setImageError(false);
        }
    }, [image]);

    // Path gambar (support both relative paths and full URLs)
    const imageUrl = image ? (image.startsWith('http://') || image.startsWith('https://') 
        ? image 
        : `/assets/bg/${image}`) : null;

    useEffect(() => {
        if (!imageUrl) return;
        
        const handleImageLoad = () => {
            setIsLoading(false);
            console.log(`Background loaded successfully: ${imageUrl}`);
        };

        const handleImageError = () => {
            console.error(`Failed to load background: ${imageUrl}`);
            setIsLoading(false);
            setImageError(true);
        };

        // Create a hidden image element to check if it loads
        const img = new window.Image();
        img.onload = handleImageLoad;
        img.onerror = handleImageError;
        img.src = imageUrl;
        
        // Cleanup
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [imageUrl]);

    // If no image provided, show beautiful placeholder
    if (!image) {
        return (
            <div className="relative w-full h-full overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="text-8xl mb-4">🎨</div>
                            <div className="text-2xl font-bold mb-2">Add Your Background Image!</div>
                            <div className="text-lg opacity-80">Place images in <code className="bg-black/50 px-2 py-1 rounded">public/assets/bg/</code></div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none"></div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden bg-gray-900">
            {/* Loading indicator */}
            {isLoading && imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center z-15">
                    <div className="text-white text-6xl animate-pulse">🌄</div>
                </div>
            )}

            {/* Background image with scale effect */}
            <div
                className={`absolute inset-0 w-full h-full bg-cover bg-center 
                          transition-all duration-1000 ease-in-out z-0
                          ${isLoading && imageUrl ? 'opacity-0' : 'opacity-100 animate-fadeIn'}`}
                style={{ 
                    backgroundImage: imageError ? 'none' : imageUrl ? `url(${imageUrl})` : 'none',
                    backgroundColor: imageError ? '#1a1a2e' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                }}
            >
                {imageError && imageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                        <div className="text-white text-center">
                            <div className="text-6xl mb-4">🖼️</div>
                            <div className="text-lg">Background image not available</div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Dark overlay untuk readability */}
            {overlay > 0 && !imageError && imageUrl && (
                <div 
                    className="absolute inset-0 bg-black z-10 transition-opacity duration-500"
                    style={{ opacity: overlay / 100 }}
                ></div>
            )}
            
            {/* Subtle vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-b 
                          from-transparent via-transparent to-black/30 z-10
                          pointer-events-none"></div>
        </div>
    );
}

export default Background;
