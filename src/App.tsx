import React, { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { inject } from '@vercel/analytics';

// Inject the Vercel Analytics script
inject();

const App: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPromotion, setShowInstallPromotion] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallPromotion(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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
          <div className="install-banner">
            <p>Installer l'application ?</p>
            <button onClick={handleInstallClick}>Installer</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;