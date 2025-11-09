import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const transitions = {
  fade:   { bg: 'bg-black', opacity: [0, 1, 0] },
  flash:  { bg: 'bg-white', opacity: [0, 1, 0] },
  black:  { bg: 'bg-black', opacity: [1, 1, 0] },
  white:  { bg: 'bg-white', opacity: [1, 1, 0] },
  slide:  { bg: 'bg-black', x: ['-100%', 0, '100%'] },
  zoom:   { bg: 'bg-black', scale: [0, 2, 3] }
};

export default function TransitionOverlay({
  active,
  type = 'fade',
  duration = 600
}) {
  const t = transitions[type] || transitions.fade;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={`fixed inset-0 z-[999] ${t.bg}`}
          initial={{
            opacity: t.opacity ? t.opacity[0] : 1,
            x: t.x ? t.x[0] : 0,
            scale: t.scale ? t.scale[0] : 1
          }}
          animate={{
            opacity: t.opacity ? t.opacity[1] : 1,
            x: t.x ? t.x[1] : 0,
            scale: t.scale ? t.scale[1] : 1
          }}
          exit={{
            opacity: t.opacity ? t.opacity[2] : 0,
            x: t.x ? t.x[2] : 0,
            scale: t.scale ? t.scale[2] : 1
          }}
          transition={{ duration: duration / 1000 }}
        />
      )}
    </AnimatePresence>
  );
}
