import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Project } from "../data/Project";
import { useAppDependencies } from "../app/context";

import Tag from "../components/Tag";
import SlideShow from "../components/SlideShow";
import Icon from "../components/Icons";

import TypewriterEffect from "../components/TypewriterEffect";

const ProjectPage: React.FC = () => {
  // hook utilisé pourobtenir l'id du projet.
  const { id } = useParams<{ id: string }>();
  // Utilisation des dépendances de l'application pour récupérer les données
  const { projectDataSource } = useAppDependencies();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const foundProject = await projectDataSource.fetchOne(id!);
      setProject(foundProject);

      const manyProjects = await projectDataSource.fetchMany();
      setAllProjects(manyProjects);

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

  const currentIndex = allProjects.findIndex((proj) => proj.id === id);
  const prevProjectIndex =
    (currentIndex - 1 + allProjects.length) % allProjects.length;
  const nextProjectIndex = (currentIndex + 1) % allProjects.length;

  const prevProject = allProjects[prevProjectIndex];
  const nextProject = allProjects[nextProjectIndex];

  return (
    <div className="project-page">
      <div className="project-header">
        <NavLink to="/home" className="back-arrow">
          ← Retour à l'accueil
        </NavLink>
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
        <div id="tag-container">
          {project.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="project-body">
        <SlideShow images={project.pictures} />
        <div className="description-container">
          <TypewriterEffect
            className="typewriter-project-page"
            text={project.description}
          />
        </div>
      </div>
      <div className="github-link">
        <Icon
          dataTitle="code source"
          imgSrc="/icons/github.png"
          alt="Lien vers GitHub"
          id="github-ico"
          onClick={() => {
            window.open(project.linkGH, "_blank");
          }}
        />
      </div>
      <div className="project-footer">
        <div className="prev-project-container">
          {prevProject && (
            <NavLink
              to={`/project/${prevProject.id}`}
              className="prev-project-button"
            >
              {`← Projet précédent`}
            </NavLink>
          )}
        </div>
        <div className="next-project-container">
          {nextProject && (
            <NavLink
              to={`/project/${nextProject.id}`}
              className="next-project-button"
            >
              {`Projet suivant  →`}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
