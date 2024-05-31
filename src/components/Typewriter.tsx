import React, { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
};

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  let fullText = "";
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        fullText += text[index];
      } else {
        clearInterval(intervalId);
      }

      setDisplayedText(fullText);

      index++;
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
