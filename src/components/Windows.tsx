import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';

type WindowsProps = {
  header: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  id?: string;
  apiData?: any;
  showForm?: boolean;
  onClose: () => void;
  onDragStop: (e: any, d: any) => void;
  onResizeStop: (e: any, direction: any, ref: any, delta: any, position: any) => void;
  onMinimize: () => void;
};

const Windows: React.FC<WindowsProps> = ({
  header, children, content, id, apiData, showForm, onClose, onDragStop, onResizeStop, onMinimize
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [size, setSize] = useState({ width: window.innerWidth * 0.6, height: window.innerHeight * 0.6 });
  const [position, setPosition] = useState({ x: (window.innerWidth * 0.2), y: (window.innerHeight * 0.2) });

  const windowRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setSize({ width: window.innerWidth * 0.6, height: window.innerHeight * 0.6 });
      setPosition({ x: (window.innerWidth * 0.2), y: (window.innerHeight * 0.2) });
      setIsFullscreen(false);
    } else {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
      setIsFullscreen(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isFullscreen) {
        setPosition({ x: (window.innerWidth - size.width) / 2, y: (window.innerHeight - size.height) / 2 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen, size.width, size.height]);

  const handleClose = () => {
    console.log('Closing window');
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Correspond à la durée de l'animation CSS
  };

  const handleMinimize = () => {
    console.log('Minimizing window');
    setIsMinimizing(true);
    setTimeout(() => {
      console.log('Window minimized');
      onMinimize();
      setIsMinimizing(false); // Reset state after animation
      setIsHidden(true); // Hide the window after minimizing
    }, 300); // Correspond à la durée de l'animation CSS
  };

  useEffect(() => {
    if (!isMinimizing && !isClosing) {
      setIsHidden(false); // Ensure the window is visible when not minimizing or closing
    }
  }, [isMinimizing, isClosing]);

  useEffect(() => {
    console.log('Window state:', { isClosing, isMinimizing, isHidden });
  }, [isClosing, isMinimizing, isHidden]);

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-header"
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
        onDragStop(e, d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) });
        setPosition(position);
        onResizeStop(e, direction, ref, delta, position);
      }}
      enableResizing={{
        bottom: true,
        bottomRight: true,
        bottomLeft: true,
        top: true,
        topRight: true,
        topLeft: true,
        left: true,
        right: true,
      }}
    >
      <div
        ref={windowRef}
        className={`window ${isClosing ? 'window-closing' : ''} ${isMinimizing ? 'window-minimizing' : ''} ${isHidden ? 'window-hidden' : ''}`}
        id={id}
      >
        <div className="window-header">
          <h3>{header}</h3>
          <div className="window-controls">
            <button className="fullscreen-button" onClick={toggleFullscreen}>
              <img src={isFullscreen ? "/icons/enlarge2.png" : "/icons/reduce2.png"} alt={isFullscreen ? "Réduire" : "Agrandir"} />
            </button>
            <button className="minimize-button" onClick={handleMinimize}>-</button>
            <button className="close-button" onClick={handleClose}>&times;</button>
          </div>
        </div>
        <div className="window-content">
          {content && <div className="animated-text">{content}</div>}
          {apiData && (
            <div className="api-data">
              {JSON.stringify(apiData)}
            </div>
          )}
          {showForm && (
            <form className="contact-form">
              <label htmlFor="name">Nom:</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required />
              <button type="submit">Envoyer</button>
            </form>
          )}
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Windows;
