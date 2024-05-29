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

  useEffect(() => {
    console.log("Window state:", { isClosing, isMinimizing, isHidden });
  }, [isClosing, isMinimizing, isHidden]);

  const handleClose = () => {
    console.log("Closing window");
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset isClosing after closing
    }, 300);
  };

  const handleMinimize = () => {
    console.log("Minimizing window");
    setIsMinimizing(true);
    setTimeout(() => {
      console.log("Window minimized");
      onMinimize();
      setIsMinimizing(false);
      setIsHidden(true); // Set isHidden to true after minimization
    }, 300);
  };

  return { isHidden, isClosing, isMinimizing, handleClose, handleMinimize };
};
