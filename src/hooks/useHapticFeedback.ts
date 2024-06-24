import { useCallback } from 'react';

// Hook personnalisé pour gérer le retour haptique
export const useHapticFeedback = () => {
  // Fonction pour déclencher le retour haptique
  const handleHapticFeedback = useCallback(() => {
    // Vérifie si la fonctionnalité de vibration est disponible dans le navigateur
    if (navigator.vibrate) {
      // Déclenche une vibration de 10 millisecondes
      navigator.vibrate(10);
    }
  }, []);

  return { handleHapticFeedback };
};
