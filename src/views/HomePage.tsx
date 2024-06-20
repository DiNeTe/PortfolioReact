import React, { useRef } from "react";
import Draggable from "react-draggable";

import useWindowActions from "../hooks/useWindowActions";
import { useInitialState, WindowId } from "../hooks/useInitialState";

import Windows from "../components/Windows";
import IcoPdfCv from "../components/IcoPdfCv";
import StartMenu from "../components/StartMenu";
import Taskbar from "../components/Taskbar";
import CurrentTime from "../components/CurrentTime";
import AboutContent from "../components/WindowAbout";
import PortfolioContent from "../components/WindowPortfolio";
import SkillsContent from "../components/WindowSkills";
import ContactForm from "../components/WindowContact";

const Home: React.FC = () => {
  const initialState = useInitialState();
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

  const handleWindowClick = (windowId: WindowId) => {
    if (window.innerWidth <= 500) {
      // Ferme toutes les autres fenêtres en mode mobile
      Object.keys(windowsState).forEach((id) => {
        if (id !== windowId) {
          handleClose(id as WindowId);
        }
      });
    }
    bringToFront(windowId);
  };

  const handlePdfClick = () => {
    window.open("/cv.pdf", "_blank");
  };

  const draggableRef = useRef(null);

  return (
    <section id="desktop">
      <StartMenu />

      <Taskbar
        handleClick={handleTaskbarClick}
        bringToFront={bringToFront}
        handleCloseAll={handleCloseAll}
      />

      <Draggable nodeRef={draggableRef}>
        <div
          ref={draggableRef}
          onClick={handlePdfClick}
          onTouchStart={handlePdfClick}
          className="pdf-icon"
          role="button"
          tabIndex={0}
          aria-label="Télécharger mon CV en PDF"
        >
          <IcoPdfCv />
        </div>
      </Draggable>

      <CurrentTime className="desktop" />

      {Object.keys(windowsState).map(
        (windowId) =>
          windowsState[windowId as WindowId].open && (
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
              onClose={() => handleClose(windowId as WindowId)}
              onMinimize={() => handleMinimize(windowId as WindowId)}
              onDragStop={(_e, d) =>
                updatePosition(windowId as WindowId, d.x, d.y)
              }
              onResizeStop={(_e, _direction, ref, _delta) =>
                updateSize(
                  windowId as WindowId,
                  parseInt(ref.style.width, 10),
                  parseInt(ref.style.height, 10)
                )
              }
              initialSize={{
                width: windowsState[windowId as WindowId].width,
                height: windowsState[windowId as WindowId].height,
              }}
              initialPosition={{
                x: windowsState[windowId as WindowId].x,
                y: windowsState[windowId as WindowId].y,
              }}
              zIndex={windowsState[windowId as WindowId].zIndex}
              bringToFront={() => handleWindowClick(windowId as WindowId)}
            >
              {windowId === "about-window" && <AboutContent />}
              {windowId === "skills-window" && <SkillsContent />}
              {windowId === "portfolio-window" && <PortfolioContent />}
              {windowId === "contact-window" && <ContactForm />}
            </Windows>
          )
      )}
    </section>
  );
};

export default Home;
