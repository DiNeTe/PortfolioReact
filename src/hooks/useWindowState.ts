import { useState } from "react";

// Définition du type pour les détails d'une fenêtre
type WindowDetails = {
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  open: boolean;
  zIndex: number;
};

// Définition du type pour l'état des fenêtres, chaque fenêtre étant identifiée par un string
type WindowState = {
  [key: string]: WindowDetails;
};

const useWindowState = (initialState: WindowState) => {
  const [windowsState, setWindowsState] = useState<WindowState>(initialState);
  const [maxZIndex, setMaxZIndex] = useState(Object.keys(initialState).length); // Initialiser avec le nombre de fenêtres

  const bringToFront = (id: string) => {
    setWindowsState((prevState) => {
      const newMaxZIndex = maxZIndex + 1;
      setMaxZIndex(newMaxZIndex);

      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          zIndex: newMaxZIndex,
        },
      };
    });
  };

  // Fonction pour basculer l'état minimisé d'une fenêtre
  const toggleMinimize = (id: string, newState: Partial<WindowDetails>) => {
    setWindowsState((prevState) => ({
      ...prevState, // Conserve l'état précédent
      [id]: {
        ...prevState[id], // Conserve les propriétés de la fenêtre ciblée
        minimized: !prevState[id].minimized,
        ...newState, // Applique les nouvelles propriétés
      },
    }));
  };

  // Fonction pour mettre à jour la position d'une fenêtre
  const updatePosition = (id: string, x: number, y: number) => {
    setWindowsState((prevState) => ({
      ...prevState, // Conserve l'état précédent
      [id]: {
        ...prevState[id], // Conserve les propriétés de la fenêtre ciblée
        x, // MAJ position x
        y, // MAJ position y
      },
    }));
  };

  // Fonction pour mettre à jour la taille d'une fenêtre
  const updateSize = (id: string, width: number, height: number) => {
    setWindowsState((prevState) => ({
      ...prevState, // Conserver l'état précédent
      [id]: {
        ...prevState[id], // Conserve les propriétés de la fenêtre ciblée
        width, // MAJ largeur
        height, // MAJ hauteur
      },
    }));
  };

  // Fonction pour mettre à jour l'état d'une fenêtre avec de nouvelles propriétés
  const setWindowState = (id: string, newState: Partial<WindowDetails>) => {
    setWindowsState((prevState) => ({
      ...prevState, // Conserve l'état précédent
      [id]: {
        ...prevState[id], // Conserve les propriétés de la fenêtre ciblée
        ...newState, // Applique les nouvelles propriétés
      },
    }));
  };

  // Retourne l'état des fenêtres et les fonctions pour le gérer
  return {
    windowsState, // L'état des fenêtres
    bringToFront, // Fonction pour mettre une fenêtre au premier plan
    toggleMinimize, // Fonction pour basculer l'état minimisé d'une fenêtre
    updatePosition, // Fonction pour mettre à jour la position d'une fenêtre
    updateSize, // Fonction pour mettre à jour la taille d'une fenêtre
    setWindowState, // Fonction pour mettre à jour l'état d'une fenêtre avec de nouvelles propriétés
  };
};

export default useWindowState;
