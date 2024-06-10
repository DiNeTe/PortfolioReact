import { useRef } from 'react';

const useTouchableClick = (onClick: () => void) => {
  const timerRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Empêche les événements tactiles d'être interprétés comme des gestes de défilement
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(onClick, 300);
  };

  const handleClick = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    onClick();
  };

  const cancelTouch = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return {
    handleClick,
    handleTouchStart,
    cancelTouch,
  };
};

export default useTouchableClick;
