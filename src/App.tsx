import { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { inject } from '@vercel/analytics';

// Injecte le script Vercel Analytics
inject();

const App: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPromotion, setShowInstallPromotion] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>('');

  useEffect(() => {      
      // Gestionnaire pour l'événement 'beforeinstallprompt'
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);

        // Affiche la demande d'installation après 2 secondes
        setTimeout(() => {
          setAnimationClass('show');
          setShowInstallPromotion(true);

          // Cache la demande d'installation après 5 secondes avec un effet de fondu
          setTimeout(() => {
            setAnimationClass('hide');
            setTimeout(() => {
              setShowInstallPromotion(false);
              setAnimationClass(''); // Réinitialise la classe d'animation
            }, 1000); // Durée de la transition CSS
          }, 5000);
        }, 2000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Nettoyage de l'écouteur d'événement lors du démontage du composant
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    
  }, [location.pathname]);

  // Fonction pour gérer le clic sur le bouton d'installation
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
        } else {
        }
        setDeferredPrompt(null);
        setShowInstallPromotion(false);
      });
    }
  };

  return (
    <div className="app">
      <main>
        <AppRouter />
        <SpeedInsights />
        {showInstallPromotion && (
          <div className={`install-banner ${animationClass}`}>
            <p>Installer l'application ?</p>
            <button onClick={handleInstallClick}>Installer</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
