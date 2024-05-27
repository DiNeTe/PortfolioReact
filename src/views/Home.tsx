import React, { useState } from 'react';
import Windows from "../components/Windows";
import Icon from "../components/Icons";
import BitcoinPrice from '../components/BitcoinPrice'; // Import the BitcoinPrice component
import CurrentTime from '../components/CurrentTime'; // Import the CurrentTime component
import Typewriter from '../components/Typewriter'; // Import the Typewriter component
import useWindowState from '../hooks/useWindowState';

const Home: React.FC = () => {
  const initialState = {
    'about-window': { x: 0, y: 0, width: 600, height: 400, minimized: false },
    'portfolio-window': { x: 0, y: 0, width: 600, height: 400, minimized: false },
    'contact-window': { x: 0, y: 0, width: 600, height: 400, minimized: false },
  };

  const { windowsState, toggleMinimize, updatePosition, updateSize } = useWindowState(initialState);
  const [openWindow, setOpenWindow] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setOpenWindow(id);
    toggleMinimize(id);
  };

  const handleClose = () => {
    setOpenWindow(null);
  };

  return (
    <section id="desktop">
      <img src="./images/wallpaper1.webp" id="wallpaper" />
      <section id="taskbar">
        <div className="taskbar-left">
          <img src="./images/logoW11.png" id="logo-win" />
          <div id="start-menu">
            <ul>
              <img src="./images/avatar.png" id="avatar" />
              <li>Projet 1</li>
              <li>Projet 2</li>
              <li>Projet 3</li>
            </ul>
          </div>
        </div>
        <div className="taskbar-center">
          <nav id="nav">
            <ul id="nav-list">
              <Icon
                dataTitle="A propos de moi"
                imgSrc="/icons/about-icon.png"
                alt="A propos"
                id="about-window"
                onClick={() => handleClick('about-window')}
              />
              <Icon
                dataTitle="Mon portfolio"
                imgSrc="/icons/projects-icon.png"
                alt="Projets"
                id="portfolio-window"
                onClick={() => handleClick('portfolio-window')}
              />
              <Icon
                dataTitle="Me contacter"
                imgSrc="/icons/contact-icon.png"
                alt="Contact"
                id="contact-window"
                onClick={() => handleClick('contact-window')}
              />
            </ul>
          </nav>
        </div>
        <div className="taskbar-right">
          <BitcoinPrice /> {/* Use the BitcoinPrice component here */}
          <div id="volume-control">
            <img src="/images/volume.png" alt="Volume" id="volume-icon" />
          </div>
          <CurrentTime /> {/* Use the CurrentTime component here */}
        </div>
      </section>

      {Object.keys(windowsState).map(windowId => (
        openWindow === windowId && !windowsState[windowId].minimized && (
          <Windows
            key={windowId}
            id={windowId}
            header={windowId === 'about-window' ? 'A propos de moi' : windowId === 'portfolio-window' ? 'Mon portfolio' : 'Me contacter'}
            content={
              windowId === 'about-window'
                ? <Typewriter text="Depuis toujours passionné par l'informatique, j'ai constamment exploré et expérimenté avec les technologies. Aujourd'hui, je me tourne vers le développement web avec une grande motivation. Mon intérêt se porte sur l'IA, le Web3 et la blockchain. Je suis déterminé à contribuer activement à l'expansion du Web3 et à participer à l'innovation numérique." />
                : windowId === 'portfolio-window'
                  ? 'Ici se trouvent mes projets de développement web...'
                  : ''
            }
            showForm={windowId === 'contact-window'}
            onClose={handleClose}
            onDragStop={(_e, d) => updatePosition(windowId, d.x, d.y)}
            onResizeStop={(_e, _direction, ref, _delta, position) => updateSize(windowId, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10))}
          />
        )
      ))}
    </section>
  );
};

export default Home;
