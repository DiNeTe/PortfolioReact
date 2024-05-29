import Icon from "./Icons";
import BitcoinPrice from "./BitcoinPrice";
import CurrentTime from "./CurrentTime";

interface TaskbarProps {
  handleClick: (id: string) => void;
  bringToFront: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ handleClick, bringToFront }) => (
  <section id="taskbar">
    <div className="taskbar-left">
      <img src="./images/logoW11.png" id="logo-win" alt="Windows Logo" />
      <div id="start-menu">
        <div id="start-menu-lateral-bar">
          <img src="./pp/avatar.png" id="avatar" alt="Avatar" />
          <a href="/">
            <img src="/icons/shutdown.png" id="shutdown" alt="Shutdown" />
          </a>
        </div>
        <div id="start-menu-content">
          <ul>
            <li>Projet 1</li>
            <li>Projet 2</li>
            <li>Projet 3</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="taskbar-center">
      <nav id="nav">
        <ul id="nav-list">
          <Icon
            dataTitle="A propos de moi"
            imgSrc="/icons/about-icon.png"
            alt="A propos"
            id="about-window"
            onClick={() => {
              handleClick("about-window");
              bringToFront("about-window");
            }}
          />
          <Icon
            dataTitle="Mon portfolio"
            imgSrc="/icons/projects-icon.png"
            alt="Projets"
            id="portfolio-window"
            onClick={() => {
              handleClick("portfolio-window");
              bringToFront("portfolio-window");
            }}
          />
          <Icon
            dataTitle="Me contacter"
            imgSrc="/icons/contact-icon.png"
            alt="Contact"
            id="contact-window"
            onClick={() => {
              handleClick("contact-window");
              bringToFront("contact-window");
            }}
          />
        </ul>
      </nav>
    </div>
    <div className="taskbar-right">
      <BitcoinPrice />
      <div id="volume-control">
        <img src="/images/volume.png" alt="Volume" id="volume-icon" />
      </div>
      <CurrentTime />
    </div>
  </section>
);

export default Taskbar;
