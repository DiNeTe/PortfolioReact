import React, { useState, useRef,} from "react";
import { Rnd } from "react-rnd";
import { useWindowLifecycle } from "../hooks/useWindowLifecycle";
import WindowControls from "./WindowControls";

type WindowsProps = {
  header: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  id?: string;
  contentId?: string;
  apiData?: any;
  onClose: () => void;
  onDragStop: (e: any, d: any) => void;
  onResizeStop: (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any
  ) => void;
  onMinimize: () => void;
  initialSize: { width: number; height: number };
  initialPosition: { x: number; y: number };
  zIndex: number;
  bringToFront: () => void;
};

const Windows: React.FC<WindowsProps> = ({
  header,
  children,
  content,
  id,
  contentId,
  apiData,
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
  const [size, setSize] = useState({ width: initialSize.width, height: initialSize.height });
  const [position, setPosition] = useState(initialPosition);

  const { isHidden, isClosing, isMinimizing, handleClose, handleMinimize } = 
    useWindowLifecycle(onClose, onMinimize);

  const windowRef = useRef<HTMLDivElement>(null);

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const newFullscreen = !prev;
      if (newFullscreen) {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        setPosition({ x: 0, y: 0 });
      } else {
        const newSize = { width: window.innerWidth * 0.6, height: window.innerHeight * 0.6 };
        setSize(newSize);
        setPosition({
          x: (window.innerWidth - newSize.width) / 2,
          y: (window.innerHeight - newSize.height) / 2,
        });
      }
      return newFullscreen;
    });
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-header"
      onDragStart={() => {
        bringToFront();
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
        onDragStop(e, d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newSize = {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        };
        setSize(newSize);
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
        className={`window ${isClosing ? "window-closing" : ""} ${
          isMinimizing ? "window-minimizing" : ""
        } ${isHidden ? "window-hidden" : ""}`}
        id={id}
        onMouseDown={() => {
          bringToFront();
        }}
      >
        <div className="window-header">
          <h3>{header}</h3>
          <WindowControls
            isFullscreen={isFullscreen}
            toggleFullscreen={handleToggleFullscreen}
            handleMinimize={handleMinimize}
            handleClose={handleClose}
          />
        </div>
        <div className="window-content" id={contentId}>
          {content && <div className="animated-text">{content}</div>}
          {apiData && <div className="api-data">{JSON.stringify(apiData)}</div>}
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Windows;
