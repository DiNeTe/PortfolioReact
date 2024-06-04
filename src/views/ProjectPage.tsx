import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Project } from "../data/Project";
import { useAppDependencies } from "../app/context";

import Tag from "../components/Tag";
import SlideShow from "../components/SlideShow";

import TypewriterEffect from "../components/TypewriterEffect";

const ProjectPage: React.FC = () => {
  // hook utilisé pourobtenir l'id du projet.
  const { id } = useParams<{ id: string }>();
  // Utilisation des dépendances de l'application pour récupérer les données
  const { projectDataSource } = useAppDependencies();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const foundProject = await projectDataSource.fetchOne(id!);
      setProject(foundProject);
      setLoading(false);
    }
    init();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  // Rendu principal du composant
  return (
    <div className="project-page">
      <div className="project-header">
        <NavLink to="/home" className="back-arrow">
          ← Retour à l'accueil
        </NavLink>
        <div className="link-container">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="title-project"
          >
            <h1 className="title-project">{project.title}</h1>
            <img
              className="link-ico"
              src="/icons/link.png"
              alt="Lien vers le projet"
            />
          </a>
          <a
            href={project.linkGH}
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <img
              className="github-ico"
              src="/icons/github.png"
              alt="Lien vers GitHub"
            />
          </a>
        </div>
        <div id="tag-container">
          {project.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="project-body">
        <SlideShow images={project.pictures} />
        <div className="description-container">
          <TypewriterEffect text={project.description} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
