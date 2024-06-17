import { useState, useEffect } from 'react';

export type WindowId = 'about-window' | 'skills-window' | 'portfolio-window' | 'contact-window';

const getInitialState = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowDimensions = { width: 800, height: 450 };
  const initialX = (windowWidth - windowDimensions.width) / 2;
  const initialY = (windowHeight - windowDimensions.height) / 2;

  const initialStateDesktop: Record<WindowId, any> = {
    'about-window': {
      x: initialX - 50,
      y: initialY - 50,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: true,
      zIndex: 1,
    },
    'skills-window': {
      x: initialX,
      y: initialY,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    'portfolio-window': {
      x: initialX + 50,
      y: initialY + 50,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    'contact-window': {
      x: initialX + 100,
      y: initialY + 100,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: false,
      zIndex: 0,
    },
  };

  const heightWindowsMobile = window.innerHeight - 103;

  const initialStateMobile: Record<WindowId, any> = {
    'about-window': {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: heightWindowsMobile,
      minimized: false,
      open: false,
      zIndex: 10,
    },
    'skills-window': {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: heightWindowsMobile,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    'portfolio-window': {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: heightWindowsMobile,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    'contact-window': {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: heightWindowsMobile,
      minimized: false,
      open: false,
      zIndex: 0,
    },
  };

  return windowWidth <= 800 ? initialStateMobile : initialStateDesktop;
};

export const useInitialState = () => {
  const [initialState, setInitialState] = useState(getInitialState());

  useEffect(() => {
    const handleResize = () => {
      setInitialState(getInitialState());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return initialState;
};
