import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CharacterSprite dengan movement dari JSON
 * @param {string} name - Nama karakter
 * @param {string} image - Nama file image (public/assets/sprites)
 * @param {string} position - left | right | center
 * @param {string} movement - bounce | slide-left | slide-right | fade
 */
function CharacterSprite({ name, image, position = 'center', movement = 'fade' }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!image) return null;

  const imageUrl = image.startsWith('http') ? image : `/assets/sprites/${image}`;

  const positionClasses = (() => {
    switch (position) {
      case 'left': return 'left-8';
      case 'right': return 'right-8';
      case 'center':
      default: return 'left-1/2 -translate-x-1/2';
    }
  })();

  const handleError = (e) => {
    console.error(`Failed to load character sprite: ${imageUrl}`);
    setImageError(true);
    setIsLoading(false);
    e.target.style.opacity = '0.3';
    e.target.style.filter = 'grayscale(100%)';
  };

  const handleLoad = () => {
    setIsLoading(false);
    console.log(`Character sprite loaded successfully: ${imageUrl}`);
  };

  // Variants Framer Motion untuk movement
  const variants = {
    initial: () => {
      switch (movement) {
        case 'bounce':
          return { y: [20, -30, 0], opacity: 1 };
        case 'slide-left':
          return { x: [-200, 0], opacity: 1 };
        case 'slide-right':
          return { x: [200, 0], opacity: 1 };
        case 'fade':
        default:
          return { opacity: 0 };
      }
    },
    animate: () => {
      switch (movement) {
        case 'bounce':
          return { y: [20, -30, 0], transition: { duration: 0.8, ease: 'easeOut' } };
        case 'slide-left':
        case 'slide-right':
          return { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } };
        case 'fade':
        default:
          return { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } };
      }
    },
  };

  return (
    <div className="absolute bottom-0 w-full pointer-events-none z-20">
      {/* Loading placeholder */}
      {isLoading && !imageError && (
        <div className={`absolute bottom-0 ${positionClasses} text-white text-4xl animate-pulse z-30`}>
          ⏳
        </div>
      )}

      {!imageError && (
        <motion.img
          src={imageUrl}
          alt={name}
          className={`absolute bottom-0 h-[85vh] max-h-[800px] object-contain ${positionClasses}`}
          onError={handleError}
          onLoad={handleLoad}
          initial="initial"
          animate="animate"
          variants={variants}
          custom={movement}
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div className={`absolute ${positionClasses} bottom-1/3 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm z-30`}>
          ⚠️ Failed to load {name}
        </div>
      )}
    </div>
  );
}

export default CharacterSprite;
