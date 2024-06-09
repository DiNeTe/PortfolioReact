import { useState, useEffect } from 'react';

export const useWindowLifecycle = (onClose: () => void, onMinimize: () => void) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);

  useEffect(() => {
    if (isMinimizing) {
      return;
    }

    if (!isClosing) {
      setIsHidden(false);
    }
  }, [isMinimizing, isClosing]);

   // useEffect se déclenche à chaque fois que isClosing, isMinimizing ou isHidden change
  useEffect(() => {
  }, [isClosing, isMinimizing, isHidden]);


  // Fonction handleClose pour gérer la fermeture de la fenêtre
  const handleClose = () => {
    console.log("Closing window");
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Fonction handleMinimize pour gérer la minimisation de la fenêtre
  const handleMinimize = () => {
    console.log("Minimizing window");
    setIsMinimizing(true);
    setTimeout(() => {
      console.log("Window minimized");
      onMinimize();
      setIsMinimizing(false);
      setIsHidden(true);
    }, 300);
  };

  return { isHidden, isClosing, isMinimizing, handleClose, handleMinimize };
};
