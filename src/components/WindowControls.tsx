import React from 'react';

interface WindowControlsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  handleMinimize: () => void;
  handleClose: () => void;
}

const WindowControls: React.FC<WindowControlsProps> = ({
  isFullscreen,
  toggleFullscreen,
  handleMinimize,
  handleClose,
}) => (
  <div className="window-controls">
    <button className="fullscreen-button" onClick={toggleFullscreen}>
      <img src={isFullscreen ? "/icons/enlarge2.png" : "/icons/reduce2.png"} alt={isFullscreen ? "Réduire" : "Agrandir"} />
    </button>
    <button className="minimize-button" onClick={handleMinimize}>-</button>
    <button className="close-button" onClick={handleClose}>&times;</button>
  </div>
);

export default WindowControls;
