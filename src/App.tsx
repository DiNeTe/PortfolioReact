import React, { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { inject } from '@vercel/analytics';

// Inject the Vercel Analytics script
inject();

const App: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPromotion, setShowInstallPromotion] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>('');

  useEffect(() => {
    if (location.pathname === '/Home') {
      console.log(location.pathname)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Show the install promotion after 2 seconds
      setTimeout(() => {
        setAnimationClass('show');
        setShowInstallPromotion(true);

        // Hide the install promotion after 5 seconds with fade out effect
        setTimeout(() => {
          setAnimationClass('hide');
          setTimeout(() => {
            setShowInstallPromotion(false);
            setAnimationClass(''); // Reset animation class for next time
          }, 1000); // Match the duration of the CSS transition
        }, 5000);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }
  }, [location.pathname]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
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