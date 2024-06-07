import { useAppDependencies } from "../app/context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Project } from "../data/Project";
import Tag from "./Tag";

const PortfolioContent: React.FC = () => {
  // État local pour stocker la liste des projets
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Récupération des dépendances de l'application, incluant la source de données des projets
  const { projectDataSource } = useAppDependencies();
  
  // Hook de navigation pour rediriger l'utilisateur
  const navigate = useNavigate();

  // Fonction pour gérer le clic sur la couverture du projet
  const CoverClick = (id: string) => {
    // Navigation vers la page de détails du projet avec l'ID correspondant
    navigate(`/project/${id}`);
  };

  // Effet pour charger les projets lors du montage du composant
  useEffect(() => {
    async function initPage() {
      // Récupère la liste des projets à partir de la source de données
      const projects = await projectDataSource.fetchMany();
      // Met à jour l'état avec les projets récupérés
      setProjects(projects);
    }
    // Appelle la fonction pour initialiser la page
    initPage();
  }, [projectDataSource]);

  return (
    <div className="portfolio-content">
      {/* Liste des projets */}
      <ul>
        {projects.map((project: Project) => (
          // Élément de la liste pour chaque projet
          <li key={project.id} className="project-item" onClick={() => CoverClick(project.id)}>
            <div className="project-container">
              <div className="project-header">
                <div className="project-title">
                  {/* Conteneur des tags du projet */}
                  <div id="tag-container-window">
                    {project.tags.map((tag, index) => (
                      // Composant Tag pour chaque tag du projet
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </div>
              {/* Image de couverture du projet */}
              <img
                className="cover-project"
                src={project.cover}
                alt={project.title}
              />
              {/* Superposition avec le titre du projet */}
              <div className="project-overlay">
                <h2>{project.title}</h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioContent;
