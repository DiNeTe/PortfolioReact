import { useState, useEffect } from 'react';

// Hook personnalisé pour gérer la taille et la position d'une fenêtre
export const useWindowSize = (initialWidth: number, initialHeight: number) => {
  // État pour stocker la taille de la fenêtre
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  // État pour stocker la position de la fenêtre
  const [position, setPosition] = useState({
    x: (window.innerWidth - initialWidth) / 2,
    y: (window.innerHeight - initialHeight) / 2,
  });

  // Effet pour recentrer la fenêtre lors du redimensionnement de la fenêtre du navigateur
  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
      });
    };

    // Ajoute un écouteur d'événement pour le redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('resize', handleResize);
  }, [size.width, size.height]);

  // Retourne les états et les fonctions pour mettre à jour la taille et la position
  return { size, position, setSize, setPosition };
};
