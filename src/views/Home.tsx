import React, { useEffect } from 'react';
import Windows from "../components/Windows";
import Icon from "../components/Icons";
import BitcoinPrice from '../components/BitcoinPrice';
import CurrentTime from '../components/CurrentTime';
import Typewriter from '../components/Typewriter';
import useWindowState from '../hooks/useWindowState';

const Home: React.FC = () => {
  const initialState = {
    'about-window': { x: 0, y: 0, width: 600, height: 400, minimized: false, open: true },
    'portfolio-window': { x: 0, y: 0, width: 600, height: 400, minimized: false, open: false },
    'contact-window': { x: 0, y: 0, width: 600, height: 400, minimized: false, open: false },
  };

  const { windowsState, toggleMinimize, updatePosition, updateSize, setWindowState } = useWindowState(initialState);

  useEffect(() => {
    const logoWin = document.getElementById('logo-win');
    const startMenu = document.getElementById('start-menu');

    const handleLogoClick = () => {
      if (!startMenu) return;
      if (startMenu.style.display === 'flex') {
        startMenu.style.display = 'none';
      } else {
        startMenu.style.display = 'flex';
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (startMenu && !startMenu.contains(event.target as Node) && logoWin && !logoWin.contains(event.target as Node)) {
        startMenu.style.display = 'none';
      }
    };

    if (logoWin) {
      logoWin.addEventListener('click', handleLogoClick);
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      if (logoWin) {
        logoWin.removeEventListener('click', handleLogoClick);
      }
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  console.log('Rendering Home');

  const handleClick = (id: string) => {
    setWindowState(id, { open: true, minimized: false });
  };

  const handleClose = (id: string) => {
    setWindowState(id, { open: false });
  };

  const handleMinimize = (id: string) => {
    toggleMinimize(id);
  };

  return (
    <section id="desktop">
      <img src="./images/wallpaper1.webp" id="wallpaper" alt="Wallpaper" />
      <section id="taskbar">
        <div className="taskbar-left">
          <img src="./images/logoW11.png" id="logo-win" alt="Windows Logo" />
          <div id="start-menu">
            <ul>
              <img src="./pp/avatar.png" id="avatar" alt="Avatar" />
              <a href="/" id="username">deconnexion</a>
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
          <BitcoinPrice />
          <div id="volume-control">
            <img src="/images/volume.png" alt="Volume" id="volume-icon" />
          </div>
          <CurrentTime />
        </div>
      </section>

      {Object.keys(windowsState).map(windowId => (
        windowsState[windowId].open && (
          <Windows
            key={windowId}
            id={windowId}
            header={windowId === 'about-window' ? 'A propos de moi' : windowId === 'portfolio-window' ? 'Mon portfolio' : 'Me contacter'}
            content={
              windowId === 'about-window'
                ? <Typewriter text="Deepuis toujours passionné par l'informatique, j'ai constamment exploré et expérimenté avec les technologies. Aujourd'hui, je me tourne vers le développement web avec une grande motivation. Mon intérêt se porte sur l'IA, le Web3 et la blockchain. Je suis déterminé à contribuer activement à l'expansion du Web3 et à participer à l'innovation numérique." />
                : windowId === 'portfolio-window'
                  ? 'Ici se trouvent mes projets de développement web...'
                  : ''
            }
            showForm={windowId === 'contact-window'}
            onClose={() => handleClose(windowId)}
            onMinimize={() => handleMinimize(windowId)}
            onDragStop={(_e, d) => updatePosition(windowId, d.x, d.y)}
            onResizeStop={(_e, _direction, ref, _delta) => updateSize(windowId, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10))}
          />
        )
      ))}
    </section>
  );
};

export default Home;
