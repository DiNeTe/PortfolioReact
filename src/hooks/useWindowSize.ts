import { useState, useEffect } from 'react';

export const useWindowSize = (initialWidth: number, initialHeight: number) => {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.2,
    y: window.innerHeight * 0.2,
  });

  const toggleFullscreen = (isFullscreen: boolean) => {
    if (isFullscreen) {
      setSize({
        width: window.innerWidth * 0.6,
        height: window.innerHeight * 0.6,
      });
      setPosition({ x: window.innerWidth * 0.2, y: window.innerHeight * 0.2 });
    } else {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size.width, size.height]);

  return { size, position, setSize, setPosition, toggleFullscreen };
};
