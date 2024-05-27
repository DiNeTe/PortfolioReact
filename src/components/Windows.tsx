import React, { useState, useEffect } from 'react';
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
};

const Windows: React.FC<WindowsProps> = ({
  header, children, content, id, apiData, showForm, onClose, onDragStop, onResizeStop
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [size, setSize] = useState({ width: window.innerWidth * 0.6, height: window.innerHeight * 0.6 });
  const [position, setPosition] = useState({ x: (window.innerWidth * 0.2), y: (window.innerHeight * 0.2) });

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

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="window-header"
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
        onDragStop(e, d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: ref.style.width, height: ref.style.height });
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
      <div className="window" id={id}>
        <div className="window-header">
          <h3>{header}</h3>
          <div className="window-controls">
            <button className="fullscreen-button" onClick={toggleFullscreen}>
              {isFullscreen ? '↙️' : '↖️'}
            </button>
            <button className="close-button" onClick={onClose}>&times;</button>
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
