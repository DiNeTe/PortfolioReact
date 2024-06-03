import { useState, useEffect } from 'react';

const useTypewriter = (text: string, speed: number = 50): string => {
  const [displayText, setDisplayText] = useState<string>('');
  let fullText = '';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        fullText += text[index];
      } else {
        clearInterval(intervalId);
      }

      setDisplayText(fullText);

      index++;
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
