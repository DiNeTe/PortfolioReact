import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Icon from "./Icons";
import BitcoinPrice from "./BitcoinPrice";
import CurrentTime from "./CurrentTime";
import { useAppDependencies } from "../app/context";
import { Project } from "../data/Project";

interface TaskbarProps {
  handleClick: (id: string) => void;
  bringToFront: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ handleClick, bringToFront }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectDataSource } = useAppDependencies();

  // Hook de navigation
  const navigate = useNavigate();
  // Fonction pour gérer le clic sur une carte
  const CoverClick = (id: string) => {
    // navigue vers la page de détail de l'hébergement
    navigate(`/project/${id}`);
  };

  useEffect(() => {
    async function initPage() {
      const projects = await projectDataSource.fetchMany();
      setProjects(projects);
    }
    initPage();
  }, [projectDataSource]);

  return (
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
                {projects.map((project, index) => (
                  <li key={index} onClick={() => CoverClick(project.id)}>{project.title}
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
};

export default Taskbar;
