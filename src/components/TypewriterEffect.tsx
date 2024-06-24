import React from "react";
import useTypewriter from "../hooks/useTypewriter";

type TypewriterEffectProps = {
  text: string;
  speed?: number;
  className?: string;
};

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 15,
  className = "",
}) => {
  const displayText = useTypewriter(text, speed);

  return (
    <div className={`typewriter ${className}`}>
      <span>{displayText}</span>
      <span className="typewriter-cursor">|</span>
    </div>
  );
};

export default TypewriterEffect;
