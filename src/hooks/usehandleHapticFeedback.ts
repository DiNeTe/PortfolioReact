import { useCallback } from 'react';

export const useHapticFeedback = () => {
  const handleHapticFeedback = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }, []);

  return { handleHapticFeedback };
};