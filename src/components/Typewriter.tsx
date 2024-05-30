import React, { useEffect, useState } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
};

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (index < text.length) {
          return prev + text[index];
        } else {
          clearInterval(intervalId);
          return prev;
        }
      });
      index++;
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
