import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useWindowSize } from '../hooks/useWindowSize';
import { useWindowLifecycle } from '../hooks/useWindowLifecycle';
import WindowControls from './WindowControls';

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
  initialSize: { width: number, height: number };
  initialPosition: { x: number, y: number };
  zIndex: number;
  bringToFront: () => void;
};

const Windows: React.FC<WindowsProps> = ({
  header,
  children,
  content,
  id,
  apiData,
  showForm,
  onClose,
  onDragStop,
  onResizeStop,
  onMinimize,
  initialSize,
  initialPosition,
  zIndex,
  bringToFront,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { size, position, setSize, setPosition, toggleFullscreen } = useWindowSize(initialSize.width, initialSize.height);
  const { isHidden, isClosing, isMinimizing, handleClose, handleMinimize } = useWindowLifecycle(onClose, onMinimize);

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-header"
      onDragStart={bringToFront}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
        onDragStop(e, d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
        setPosition(position);
        onResizeStop(e, direction, ref, delta, position);
      }}
      style={{ zIndex: zIndex }}
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
        className={`window ${isClosing ? "window-closing" : ""} ${isMinimizing ? "window-minimizing" : ""} ${isHidden ? "window-hidden" : ""}`}
        id={id}
        onMouseDown={bringToFront}
      >
        <div className="window-header" onClick={bringToFront}>
          <h3>{header}</h3>
          <WindowControls
            isFullscreen={isFullscreen}
            toggleFullscreen={() => {
              setIsFullscreen(!isFullscreen);
              toggleFullscreen(isFullscreen);
            }}
            handleMinimize={handleMinimize}
            handleClose={handleClose}
          />
        </div>
        <div className="window-content">
          {content && <div className="animated-text">{content}</div>}
          {apiData && <div className="api-data">{JSON.stringify(apiData)}</div>}
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
