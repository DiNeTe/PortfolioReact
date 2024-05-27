import React, { useEffect, useState } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number; // Speed in milliseconds
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

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
