import { useState, useEffect } from 'react';

// Hook personnalisé pour gérer le cycle de vie d'une fenêtre
export const useWindowLifecycle = (onClose: () => void, onMinimize: () => void) => {
  // État pour suivre si la fenêtre est cachée, en cours de fermeture ou de minimisation
  const [isHidden, setIsHidden] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);

  // Effet pour gérer l'affichage de la fenêtre en fonction des états de fermeture et de minimisation
  useEffect(() => {
    if (isMinimizing) {
      return;
    }

    if (!isClosing) {
      setIsHidden(false);
    }
  }, [isMinimizing, isClosing]);

  // Effet vide qui se déclenche à chaque fois que isClosing, isMinimizing ou isHidden change
  useEffect(() => {
  }, [isClosing, isMinimizing, isHidden]);

  // Fonction pour gérer la fermeture de la fenêtre
  const handleClose = () => {
    console.log("Closing window");
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // Appelle la fonction de rappel pour la fermeture
      setIsClosing(false);
    }, 300);
  };

  // Fonction pour gérer la minimisation de la fenêtre
  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      onMinimize(); // Appelle la fonction de rappel pour la minimisation
      setIsMinimizing(false);
      setIsHidden(true); // Définit l'état de la fenêtre comme cachée
    }, 300);
  };

  // Retourne les états et fonctions pour gérer le cycle de vie de la fenêtre
  return { isHidden, isClosing, isMinimizing, handleClose, handleMinimize };
};
