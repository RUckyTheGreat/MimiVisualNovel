import { useEffect, useState, useRef } from 'react';

/**
 * Hook efek mengetik seperti visual novel
 * @param {string} text - Teks yang akan diketik
 * @param {number} speed - Kecepatan per huruf (ms)
 */
export default function useTypewriter(text, speed = 35) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0); // simpan index huruf
  const intervalRef = useRef(null); // simpan interval supaya bisa dibersihkan

  useEffect(() => {
    // Bersihkan interval lama jika ada
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Reset state dan index
    setDisplayedText('');
    indexRef.current = 0;

    if (!text) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    intervalRef.current = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(indexRef.current));
      indexRef.current++;

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTyping(false);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return { displayedText, isTyping };
}
