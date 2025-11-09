import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SceneTextBox → untuk teks narasi tengah layar dengan full blur background.
 * Bisa diatur posisinya (center / top / bottom).
 */
function SceneTextBox({ text, position = "center" }) {
  const alignClass = {
    top: "items-start pt-32",
    center: "items-center",
    bottom: "items-end pb-32",
  }[position];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`absolute inset-0 flex ${alignClass} justify-center backdrop-blur-lg bg-black/30 z-20`}
      >
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-3xl text-white font-light leading-relaxed text-center max-w-4xl px-10 drop-shadow-lg"
        >
          {text}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

export default SceneTextBox;
