import { useState, useMemo } from 'react';
import chapter1Data from '../data/chapter1.json';

/**
 * Hook inti yang mengelola alur narasi, scene, dan dialog VN.
 * @param {string} chapterId - ID Chapter yang dimuat (saat ini hanya mendukung 'chapter1').
 */
export function useVNEngine(chapterId) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const chapterData = useMemo(() => {
    if (chapterId === 'chapter1') return chapter1Data;
    return [];
  }, [chapterId]);

  const extendedChapter = useMemo(() => [...chapterData, { type: 'endBuffer' }], [chapterData]);

  const currentLine = extendedChapter[currentIndex] || null;

  const movement = currentLine?.movement || 'fade';

  const nextLine = () => {
    if (currentIndex < extendedChapter.length - 1) {
      setCurrentIndex(i => i + 1);
      return true;
    }
    return false;
  };

  const isEndOfChapter = currentIndex >= extendedChapter.length - 1;

  return {
    currentLine,
    currentIndex,
    isEndOfChapter,
    nextLine,
    movement,
  };
}

export default useVNEngine;
