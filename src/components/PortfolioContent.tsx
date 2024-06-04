import { useAppDependencies } from "../app/context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Project } from "../data/Project";
import Tag from "./Tag";

const PortfolioContent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectDataSource } = useAppDependencies();
  const navigate = useNavigate();

  const CoverClick = (id: string) => {
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
    <div className="portfolio-content">
      <ul>
        {projects.map((project: Project) => (
          <li key={project.id} className="project-item" onClick={() => CoverClick(project.id)}>
            <div className="project-container">
            <div className="project-header">
              <div className="project-title">
              <div id="tag-container-window">
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
              />
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
