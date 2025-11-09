import { useState, useEffect } from 'react';

export default function useSceneTransition(currentLine) {
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionType, setTransitionType] = useState('fade');

  useEffect(() => {
    if (!currentLine) return;

    const type = currentLine.transition || 'fade';
    setTransitionType(type);

    setTransitionActive(true);
    const timer = setTimeout(() => setTransitionActive(false), 600);

    return () => clearTimeout(timer);
  }, [currentLine]);

  return { transitionActive, transitionType };
}
