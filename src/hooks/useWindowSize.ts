import { useState, useEffect } from 'react';

export const useWindowSize = (initialWidth: number, initialHeight: number) => {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [position, setPosition] = useState({
    x: (window.innerWidth - initialWidth) / 2,
    y: (window.innerHeight - initialHeight) / 2,
  });

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

  return { size, position, setSize, setPosition };
};
