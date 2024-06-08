import { useState } from 'react';

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  open: boolean;
  zIndex: number;
}

interface WindowsState {
  [key: string]: WindowState;
}

const useWindowActions = (initialState: WindowsState) => {
  const [windowsState, setWindowsState] = useState<WindowsState>(initialState);

  const setWindowState = (id: string, newState: Partial<WindowState>) => {
    setWindowsState((prevState: WindowsState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        ...newState,
      },
    }));
  };

  const handleClick = (id: string) => {
    setWindowState(id, { open: true, minimized: false });
  };

  const handleClose = (id: string) => {
    setWindowState(id, { open: false });
  };

  const handleMinimize = (id: string) => {
    setWindowState(id, { open: false, minimized: true });
  };

  const bringToFront = (id: string) => {
    const maxZIndex = Math.max(...Object.values(windowsState).map((window) => window.zIndex));
    setWindowState(id, { zIndex: maxZIndex + 1 });
  };

  const updatePosition = (id: string, x: number, y: number) => {
    setWindowState(id, { x, y });
  };

  const updateSize = (id: string, width: number, height: number) => {
    setWindowState(id, { width, height });
  };

  const handleCloseAll = () => {
    const newState = Object.keys(windowsState).reduce((acc, id) => {
      acc[id] = { ...windowsState[id], open: false };
      return acc;
    }, {} as WindowsState);
    setWindowsState(newState);
  };

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
