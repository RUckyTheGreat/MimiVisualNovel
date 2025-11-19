import { useState, useEffect } from 'react';

export default function useSceneTransition(currentLine) {
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionType, setTransitionType] = useState(null);
  const [transitionDuration, setTransitionDuration] = useState(600);

  useEffect(() => {
    const transition = currentLine?.transition;
    const transitionKey = currentLine?.transitionKey;

    if (!transition || !transitionKey) {
      setTransitionType(null);
      setTransitionActive(false);
      return;
    }

    const parsed = typeof transition === 'string'
      ? { type: transition, duration: 600 }
      : { type: transition.type || 'fade', duration: transition.duration || 600 };

    setTransitionType(parsed.type);
    setTransitionDuration(parsed.duration);
    setTransitionActive(true);

    const timer = setTimeout(() => {
      setTransitionActive(false);
    }, parsed.duration);

    return () => clearTimeout(timer);
  }, [currentLine?.transitionKey, currentLine?.transition]);

  return { transitionActive, transitionType, transitionDuration };
}
