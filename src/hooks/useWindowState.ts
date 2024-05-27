import { useState } from 'react';

type WindowDetails = {
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
};

type WindowState = {
  [key: string]: WindowDetails;
};

const useWindowState = (initialState: WindowState) => {
  const [windowsState, setWindowsState] = useState<WindowState>(initialState);

  const toggleMinimize = (id: string) => {
    setWindowsState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        minimized: !prevState[id].minimized
      }
    }));
  };

  const updatePosition = (id: string, x: number, y: number) => {
    setWindowsState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        x,
        y
      }
    }));
  };

  const updateSize = (id: string, width: number, height: number) => {
    setWindowsState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        width,
        height
      }
    }));
  };

  return {
    windowsState,
    toggleMinimize,
    updatePosition,
    updateSize
  };
};

export default useWindowState;
