import TypewriterEffect from "./TypewriterEffect";
import Draggable from "react-draggable";
import { useRef } from "react";

const AboutContent: React.FC = () => {
  const draggableRef = useRef(null);

  return (
    <>
      <TypewriterEffect
        className="typewriter-about"
        text="Depuis toujours, je suis animé par une passion insatiable pour l'informatique. J'adore créer, concevoir et imaginer des projets, et surtout, les voir prendre vie. Chaque nouvelle technologie est une opportunité pour moi d'explorer et d'innover. Aujourd'hui, je m'investis avec une immense motivation dans le développement web. Mon envie de développer et d'apprendre sans cesse me pousse à relever de nouveaux défis et à explorer des horizons technologiques inédits."
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
