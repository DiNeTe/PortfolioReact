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
    <button className="minimize-button" onClick={handleMinimize}>
    ‒
    </button>
    <button className="fullscreen-button" onClick={toggleFullscreen}>
      {isFullscreen ? "❐" : "□"}
    </button>
    <button className="close-button" onClick={handleClose}>
      x
    </button>
  </div>
);

export default WindowControls;
