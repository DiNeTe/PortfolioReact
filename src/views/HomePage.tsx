import { useWindowActions } from "../hooks/useWindowActions";

import StartMenuHandler from "../components/StartMenuHandler";
import Windows from "../components/Windows";
import Taskbar from "../components/Taskbar";
import PortfolioContent from "../components/PortfolioContent";
import ContactForm from "../components/ContactForm";
import AboutContent from "../components/AboutContent";
import IcoPdfCv from "../components/IcoPdfCv";

const Home: React.FC = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowDimensions = { width: 800, height: 450 };
  const initialX = (windowWidth - windowDimensions.width) / 2;
  const initialY = (windowHeight - windowDimensions.height) / 2;

  const initialState = {
    "about-window": {
      x: initialX,
      y: initialY,
      width: windowDimensions.width,
      height: windowDimensions.height,
      minimized: false,
      open: true,
      zIndex: 1,
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

  const {
    windowsState,
    bringToFront,
    handleClick,
    handleClose,
    handleMinimize,
    updatePosition,
    updateSize,
  } = useWindowActions(initialState);

  return (
    <section id="desktop">
      <StartMenuHandler />
      <img src="./images/wallpaper1.webp" id="wallpaper" alt="Wallpaper" />
      <Taskbar handleClick={handleClick} bringToFront={bringToFront} />

      <IcoPdfCv />

      {Object.keys(windowsState).map(
        (windowId) =>
          windowsState[windowId].open && (
            <Windows
              key={windowId}
              id={windowId}
              header={
                windowId === "about-window"
                  ? "A propos de moi"
                  : windowId === "portfolio-window"
                  ? "Mon portfolio"
                  : "Me contacter"
              }
              contentId={
                windowId === "contact-window" ? "contact-window-content" : undefined
              }
              content={
                windowId === "about-window" 
                ? (
                  <>
                    <div id="about-content">
                      <AboutContent />
                      <div id="about-avatar">
                        <img id="pp-about " src="/pp/avatar.png" />
                      </div>
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
