import { useEffect } from 'react';

const StartMenuHandler: React.FC = () => {
  useEffect(() => {
    const logoWin = document.getElementById('logo-win');
    const startMenu = document.getElementById('start-menu');

    const handleLogoClick = () => {
      if (!startMenu) return;
      startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
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

  return null;
};

export default StartMenuHandler;
