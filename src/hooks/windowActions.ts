import useWindowState from "./useWindowState";

export const useWindowActions = (initialState: any) => {
    const { windowsState, bringToFront, toggleMinimize, updatePosition, updateSize, setWindowState } = useWindowState(initialState);
  // Fonction pour ouvrir une fenêtre spécifique
  const handleClick = (id: string) => {
    setWindowState(id, { open: true, minimized: false });
  };

  // Fonction pour fermer une fenêtre spécifique
  const handleClose = (id: string) => {
    setWindowState(id, { open: false });
  };

  // Fonction pour minimiser une fenêtre spécifique
  const handleMinimize = (id: string) => {
    toggleMinimize(id, { open: false });
  };

  return { windowsState, bringToFront ,handleClick, handleClose, handleMinimize, updatePosition, updateSize };
};