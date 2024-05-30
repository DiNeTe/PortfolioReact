import { useAppDependencies } from "../app/context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Project } from "../data/Project";
import Tag from "./Tag";

const PortfolioContent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  // Utilisation des dépendances de l'application pour récupérer les données
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
    <div>
      <ul>
        {projects.map((project: Project) => (
          <li key={project.id} className="project-item">
            <div className="project-header">
              <div className="project-title">
                <h2>{project.title}</h2>
                <div id="tag-container">
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
            <img
              className="cover-project"
              src={project.cover}
              alt={project.title}
              onClick={() => CoverClick(project.id)}/>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioContent;
