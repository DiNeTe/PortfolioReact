import React from 'react';
import useTypewriter from './useTypewriter';

type TypewriterEffectProps = {
  text: string;
  speed?: number;
};

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed = 50 }) => {
  const displayText = useTypewriter(text, speed);

  return (
    <div className="typewriter">
      <span>{displayText}</span>
      <span className="typewriter-cursor">|</span>
    </div>
  );
};

export default TypewriterEffect;
