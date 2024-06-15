import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHapticFeedback } from "../hooks/usehandleHapticFeedback";

import Icon from "./Icons";
import BitcoinPrice from "./BitcoinPrice";
import CurrentTime from "./CurrentTime";
import { useAppDependencies } from "../app/context";
import { Project } from "../data/Interfaces";

interface TaskbarProps {
  handleClick: (id: string) => void;
  bringToFront: (id: string) => void;
  handleCloseAll: () => void; // Ajout de handleCloseAll
}

const Taskbar: React.FC<TaskbarProps> = ({
  handleClick,
  bringToFront,
  handleCloseAll,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectDataSource } = useAppDependencies();

  // Hook de navigation
  const navigate = useNavigate();
  // Fonction pour gérer le clic sur une photo de couverture
  const CoverClick = (id: string) => {
    // navigue vers la page de détail des projets
    navigate(`/project/${id}`);
  };

  useEffect(() => {
    async function initPage() {
      const projects = await projectDataSource.fetchMany();
      setProjects(projects);
    }
    initPage();
  }, [projectDataSource]);

  const { handleHapticFeedback } = useHapticFeedback();

  return (
    <section id="taskbar">
      <div className="taskbar-left">
        <img src="/icons/logoW11.png" id="logo-win" alt="Windows Logo" />
        <div id="start-menu">
          <div id="start-menu-lateral-bar">
            <img src="/pp/avatar.png" id="avatar" alt="Avatar" />
            <NavLink to="/">
              <img src="/icons/shutdown.png" id="shutdown" alt="Shutdown" />
            </NavLink>
          </div>
          <div id="start-menu-content">
            <ul>
              {projects.map((project, index) => (
                <li key={index} onClick={() => CoverClick(project.id)}>
                  {project.title}
                </li>
              ))}
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
              id="about-window-ico"
              onClick={() => {
                handleHapticFeedback();
                handleClick("about-window");
                bringToFront("about-window");
              }}
            />
            <Icon
              dataTitle="Mes compétences"
              imgSrc="/icons/skill.png"
              alt="Mes compétences"
              id="skill-window-ico"
              onClick={() => {
                handleHapticFeedback();
                handleClick("skills-window");
                bringToFront("skills-window");
              }}
            />
            <Icon
              dataTitle="Accueil"
              imgSrc="/icons/homeButton.png"
              alt="Close all windows"
              id="home-button"
              onClick={() => {
                handleHapticFeedback();
                handleCloseAll(); // Appel direct à handleCloseAll
              }}
            />
            <Icon
              dataTitle="Mon portfolio"
              imgSrc="/icons/projects-icon.png"
              alt="Projets"
              id="portfolio-window-ico"
              onClick={() => {
                handleHapticFeedback();
                handleClick("portfolio-window");
                bringToFront("portfolio-window");
              }}
            />
            <Icon
              dataTitle="Me contacter"
              imgSrc="/icons/contact-icon.png"
              alt="Contact"
              id="contact-window-ico"
              onClick={() => {
                handleHapticFeedback();
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
          <img src="/icons/volume.png" alt="Volume" id="volume-icon" />
        </div>
        <CurrentTime />
      </div>
    </section>
  );
};

export default Taskbar;
