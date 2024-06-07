import { useState, useEffect } from 'react';

// Hook personnalisé pour gérer la taille et la position de la fenêtre
export const useWindowSize = (initialWidth: number, initialHeight: number) => {
  // État pour la taille de la fenêtre, initialisé avec les dimensions passées en paramètres
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  // État pour la position de la fenêtre, initialisé pour centrer la fenêtre dans l'écran
  const [position, setPosition] = useState({
    x: (window.innerWidth - initialWidth) / 2,
    y: (window.innerHeight - initialHeight) / 2,
  });

  // Effet pour mettre à jour la position de la fenêtre lors du redimensionnement de la fenêtre du navigateur
  useEffect(() => {
    // Fonction de gestion du redimensionnement
    const handleResize = () => {
      setPosition({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
      });
    };

    // Ajout de l'écouteur d'événement pour le redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('resize', handleResize);
  }, [size.width, size.height]);

  // Retourne la taille, la position et les fonctions pour mettre à jour ces états
  return { size, position, setSize, setPosition };
};
