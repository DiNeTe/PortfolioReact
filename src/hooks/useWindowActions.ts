import { useState } from 'react';

// Interface pour définir l'état d'une fenêtre individuelle
interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  open: boolean;
  zIndex: number;
}

// Interface pour définir l'état de toutes les fenêtres
interface WindowsState {
  [key: string]: WindowState;
}

// Hook personnalisé pour gérer les actions des fenêtres
const useWindowActions = (initialState: WindowsState) => {
  // État local pour stocker l'état de toutes les fenêtres
  const [windowsState, setWindowsState] = useState<WindowsState>(initialState);

  // Fonction pour mettre à jour l'état d'une fenêtre spécifique
  const setWindowState = (id: string, newState: Partial<WindowState>) => {
    setWindowsState((prevState: WindowsState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        ...newState,
      },
    }));
  };

  // Ouvre une fenêtre et la restaure si elle est minimisée
  const handleClick = (id: string) => {
    setWindowState(id, { open: true, minimized: false });
  };

  // Ferme une fenêtre
  const handleClose = (id: string) => {
    setWindowState(id, { open: false });
  };

  // Minimise une fenêtre
  const handleMinimize = (id: string) => {
    setWindowState(id, { open: false, minimized: true });
  };

  // Amene une fenêtre au premier plan
  const bringToFront = (id: string) => {
    const maxZIndex = Math.max(...Object.values(windowsState).map((window) => window.zIndex));
    setWindowState(id, { zIndex: maxZIndex + 1 });
  };

  // Met à jour la position d'une fenêtre
  const updatePosition = (id: string, x: number, y: number) => {
    setWindowState(id, { x, y });
  };

  // Met à jour la taille d'une fenêtre
  const updateSize = (id: string, width: number, height: number) => {
    setWindowState(id, { width, height });
  };

  // Fermer toutes les fenêtres
  const handleCloseAll = () => {
    const newState = Object.keys(windowsState).reduce((acc, id) => {
      acc[id] = { ...windowsState[id], open: false };
      return acc;
    }, {} as WindowsState);
    setWindowsState(newState);
  };

  // Retourne les fonctions et l'état des fenêtres pour utilisation
  return {
    windowsState,
    bringToFront,
    handleClick,
    handleClose,
    handleMinimize,
    updatePosition,
    updateSize,
    handleCloseAll,
  };
};

export default useWindowActions;
