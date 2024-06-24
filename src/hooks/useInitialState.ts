import { useState, useEffect } from 'react';

// Définition du type WindowId pour identifier les différentes fenêtres
export type WindowId = 'about-window' | 'skills-window' | 'portfolio-window' | 'contact-window';

// Fonction pour obtenir l'état initial des fenêtres
const getInitialState = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowDimensions = { width: 800, height: 450 };
  const initialX = (windowWidth - windowDimensions.width) / 2;
  const initialY = (windowHeight - windowDimensions.height) / 2;

  // État initial des fenêtres pour un affichage de bureau (desktop)
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

  // Hauteur des fenêtres en mode mobile
  const heightWindowsMobile = window.innerHeight - 103;

  // État initial des fenêtres pour un affichage mobile
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

  // Retourne l'état initial en fonction de la largeur de la fenêtre
  return windowWidth <= 800 ? initialStateMobile : initialStateDesktop;
};

// Hook personnalisé pour gérer l'état initial des fenêtres
export const useInitialState = () => {
  const [initialState, setInitialState] = useState(getInitialState());

  // Effet pour mettre à jour l'état des fenêtres lors du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setInitialState(getInitialState());
    };

    // Ajout d'un écouteur d'événement pour gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);
    return () => {
      // Nettoyage de l'écouteur d'événement lors du démontage du composant
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return initialState;
};
