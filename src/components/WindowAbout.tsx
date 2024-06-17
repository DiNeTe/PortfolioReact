import TypewriterEffect from "./TypewriterEffect";
import Draggable from "react-draggable";
import { useRef } from "react";

const AboutContent: React.FC = () => {
  const draggableRef = useRef(null);

  return (
    <>
      <TypewriterEffect
        className="typewriter-about"
        text="Depuis toujours passionné par l'informatique, j'ai constamment exploré et expérimenté avec les technologies. Aujourd'hui, je me tourne vers le développement web avec une grande motivation. Mon intérêt se porte sur l'IA, le Web3 et la blockchain. Je suis déterminé à contribuer activement à l'expansion du Web3 et à participer à l'innovation numérique."
      />
      <Draggable nodeRef={draggableRef}>
        <div ref={draggableRef}>
          <img id="pp-about" src="/pp/avatar_clear.png" alt="Avatar" />
        </div>
      </Draggable>
    </>
  );
};

export default AboutContent;
