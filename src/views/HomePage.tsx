import useWindowActions from "../hooks/useWindowActions";
import Draggable from "react-draggable";
import StartMenuHandler from "../components/StartMenuHandler";
import Windows from "../components/Windows";
import Taskbar from "../components/Taskbar";
import PortfolioContent from "../components/PortfolioContent";
import ContactForm from "../components/ContactForm";
import AboutContent from "../components/AboutContent";
import IcoPdfCv from "../components/IcoPdfCv";
import CurrentTime from "../components/CurrentTime";

const Home: React.FC = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowDimensions = { width: 800, height: 450 };
  const initialX = (windowWidth - windowDimensions.width) / 2;
  const initialY = (windowHeight - windowDimensions.height) / 2;

  const initialStateDesktop = {
    "about-window": {
      x: initialX - 50,
      y: initialY - 50,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: true,
      zIndex: 1,
    },
    "skills-window": {
      x: initialX,
      y: initialY,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    "portfolio-window": {
      x: initialX + 50,
      y: initialY + 50,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    "contact-window": {
      x: initialX + 100,
      y: initialY + 100,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: false,
      zIndex: 0,
    },
  };

  const initialStateMobile = {
    "about-window": {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight - 95,
      minimized: false,
      open: false,
      zIndex: 10,
    },
    "skills-window": {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight - 95,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    "portfolio-window": {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight - 95,
      minimized: false,
      open: false,
      zIndex: 0,
    },
    "contact-window": {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight - 95,
      minimized: false,
      open: false,
      zIndex: 0,
    },
  };

  // Sélection de l'état initial en fonction de la taille de l'écran
  const initialState =
    windowWidth <= 500 ? initialStateMobile : initialStateDesktop;

  const {
    windowsState,
    bringToFront,
    handleClick: handleTaskbarClick,
    handleClose,
    handleMinimize,
    updatePosition,
    updateSize,
    handleCloseAll,
  } = useWindowActions(initialState);

  // Empêche le clic pendant le drag
  let drag = false;
  let clickTimer: number;

  const handleDrag = () => {
    drag = true;
  };

  const handleStop = () => {
    setTimeout(() => {
      drag = false;
    }, 0);
  };

  const handlePdfClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (drag) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      clickTimer = window.setTimeout(() => {
        window.open("/cv.pdf", "_blank");
      }, 300);
    }
  };

  const cancelClick = () => {
    clearTimeout(clickTimer);
  };

  return (
    <section id="desktop">
      <StartMenuHandler />
      <img src="./images/wallpaper1.webp" id="wallpaper" alt="Wallpaper" />
      <Taskbar
        handleClick={handleTaskbarClick}
        bringToFront={bringToFront}
        handleCloseAll={handleCloseAll}
      />
      <Draggable onDrag={handleDrag} onStop={handleStop}>
        <div
          onClick={handlePdfClick}
          onTouchStart={handlePdfClick}
          onTouchEnd={cancelClick}
        >
          <IcoPdfCv />
        </div>
      </Draggable>

      <CurrentTime className="desktop" />

      {Object.keys(windowsState).map(
        (windowId) =>
          windowsState[windowId].open && (
            <Windows
              key={windowId}
              id={windowId}
              header={
                windowId === "about-window"
                  ? "A propos de moi"
                  : windowId === "skills-window"
                  ? "Mes compétences"
                  : windowId === "portfolio-window"
                  ? "Mon portfolio"
                  : "Me contacter"
              }
              contentId={
                windowId === "contact-window"
                  ? "contact-window-content"
                  : undefined
              }
              content={
                windowId === "about-window" ? (
                  <>
                    <div id="about-content">
                      <AboutContent />
                      <Draggable>
                          
                          <img id="pp-about" src="/pp/avatar.png" alt="Avatar" />
                      </Draggable>
                    </div>
                  </>
                ) : windowId === "portfolio-window" ? (
                  <PortfolioContent />
                ) : (
                  ""
                )
              }
              onClose={() => handleClose(windowId)}
              onMinimize={() => handleMinimize(windowId)}
              onDragStop={(_e, d) => updatePosition(windowId, d.x, d.y)}
              onResizeStop={(_e, _direction, ref, _delta) =>
                updateSize(
                  windowId,
                  parseInt(ref.style.width, 10),
                  parseInt(ref.style.height, 10)
                )
              }
              initialSize={{
                width: windowsState[windowId].width,
                height: windowsState[windowId].height,
              }}
              initialPosition={{
                x: windowsState[windowId].x,
                y: windowsState[windowId].y,
              }}
              zIndex={windowsState[windowId].zIndex}
              bringToFront={() => bringToFront(windowId)}
            >
              {windowId === "contact-window" && <ContactForm />}
            </Windows>
          )
      )}
    </section>
  );
};

export default Home;
