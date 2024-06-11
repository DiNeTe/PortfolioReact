import { useCallback } from 'react';

export const useHapticFeedback = () => {
  const handleHapticFeedback = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  return { handleHapticFeedback };
};