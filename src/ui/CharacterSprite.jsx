import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * CharacterSprite / SceneEntity renderer dengan movement dari JSON
 * @param {string} name - Nama entitas
 * @param {string} image - Nama file image (public/assets/sprites)
 * @param {string|object} position - left | center | right | custom object
 * @param {string} movement - bounce | slide-left | slide-right | fade
 * @param {number} layer - z-index
 * @param {number} scale - multiplier tinggi (1 = karakter penuh)
 * @param {number} offsetY - geser vertikal (px)
 * @param {'character'|'object'} variant - tipe entitas
 * @param {boolean} isFocused - highlight speaker
 */
function CharacterSprite({
  name,
  image,
  position = 'center',
  movement = 'fade',
  layer = 20,
  scale = 1,
  offsetY = 0,
  variant = 'character',
  isFocused = true,
  assetType = 'sprites',
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!image) return null;

  const imageUrl = useMemo(() => {
    if (image.startsWith('http')) return image;
    const folder = (() => {
      switch (assetType) {
        case 'bg':
          return 'bg';
        case 'ui':
          return 'ui';
        default:
          return 'sprites';
      }
    })();
    return `/assets/${folder}/${image}`;
  }, [assetType, image]);

  const positionClasses = (() => {
    if (typeof position === 'string') {
      switch (position) {
        case 'left':
          return 'left-8';
        case 'right':
          return 'right-8';
        case 'center':
        default:
          return 'left-1/2 -translate-x-1/2';
      }
    }
    return '';
  })();

  const { customStyle, baseBottom } = useMemo(() => {
    if (typeof position !== 'object') return { customStyle: {}, baseBottom: 0 };
    const {
      left,
      right,
      x,
      y = 0,
      translateX = '-50%',
      translateY = '0%',
    } = position;

    const style = {
      transform: `translate(${translateX}, ${translateY})`,
    };

    if (typeof left !== 'undefined') style.left = left;
    if (typeof right !== 'undefined') style.right = right;
    if (typeof x !== 'undefined') style.left = x;
    return {
      customStyle: style,
      baseBottom: typeof y === 'number' ? y : 0,
    };
  }, [position]);

  const handleError = (e) => {
    console.error(`Failed to load character sprite: ${imageUrl}`);
    setImageError(true);
    setIsLoading(false);
    if (e?.target) {
      e.target.style.opacity = '0.3';
      e.target.style.filter = 'grayscale(100%)';
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    console.log(`Character sprite loaded successfully: ${imageUrl}`);
  };

  const baseHeightVh = variant === 'character' ? 85 : 45;
  const computedHeightVh = Math.min(baseHeightVh * scale, 110);

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

  const focusClass = isFocused ? 'drop-shadow-2xl opacity-100' : 'opacity-60';

  return (
    <div
      className="absolute bottom-0 w-full pointer-events-none"
      style={{ zIndex: layer }}
    >
      {/* Loading placeholder */}
      {isLoading && !imageError && (
        <div
          className={`absolute bottom-0 ${positionClasses} text-white text-4xl animate-pulse`}
          style={customStyle}
        >
          ⏳
        </div>
      )}

      {!imageError && (
        <motion.img
          src={imageUrl}
          alt={name}
          className={`absolute bottom-0 object-contain ${positionClasses} ${focusClass}`}
          style={{
            ...customStyle,
            height: `${computedHeightVh}vh`,
            maxHeight: `${computedHeightVh * 10}px`,
            bottom: baseBottom + offsetY,
          }}
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
        <div
          className={`absolute ${positionClasses} bottom-1/3 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm`}
          style={customStyle}
        >
          ⚠️ Failed to load {name}
        </div>
      )}
    </div>
  );
}

export default CharacterSprite;
