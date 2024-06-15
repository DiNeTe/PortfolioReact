import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Project } from "../data/Interfaces";
import { useAppDependencies } from "../app/context";
// import { useHapticFeedback } from "../hooks/usehandleHapticFeedback";

import Tag from "../components/Tag";
import SlideShow from "../components/SlideShow";
import Icon from "../components/Icons";

import TypewriterEffect from "../components/TypewriterEffect";

const ProjectPage: React.FC = () => {
  // Hook utilisé pour obtenir l'id du projet depuis les paramètres de l'URL.
  const { id } = useParams<{ id: string }>();
  // Utilisation des dépendances de l'application pour récupérer les données du projet
  const { projectDataSource } = useAppDependencies();
  // États locaux pour stocker les données du projet, l'état de chargement et la liste de tous les projets
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // const { handleHapticFeedback } = useHapticFeedback();

  // Effet pour charger les données du projet lorsque l'id change
  useEffect(() => {
    async function init() {
      setLoading(true);

      // Récupère les données du projet spécifique
      const foundProject = await projectDataSource.fetchOne(id!);
      setProject(foundProject);

      // Récupère la liste de tous les projets
      const manyProjects = await projectDataSource.fetchMany();
      setAllProjects(manyProjects);

      setLoading(false);
    }
    init();
  }, [id, projectDataSource]);

  // Affiche un indicateur de chargement si les données sont en cours de récupération
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirige vers une page "not found" si le projet n'est pas trouvé
  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  // Trouve les index du projet actuel, du projet précédent et du projet suivant
  const currentIndex = allProjects.findIndex((proj) => proj.id === id);
  const prevProjectIndex =
    (currentIndex - 1 + allProjects.length) % allProjects.length;
  const nextProjectIndex = (currentIndex + 1) % allProjects.length;

  // Récupère les données des projets précédent et suivant
  const prevProject = allProjects[prevProjectIndex];
  const nextProject = allProjects[nextProjectIndex];

  return (
    <div className="project-page">
      <div className="project-header">
        {/* Lien de retour à la page d'accueil */}
        <NavLink to="/home" className="back-arrow">
          ← Retour à l'accueil
        </NavLink>
        {/* Lien vers le projet, avec une icône */}
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
        {/* Affichage des tags du projet */}
        <div id="tag-container">
          {project.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="project-body">
        {/* Diaporama des images du projet */}
        <SlideShow images={project.pictures} />
        {/* Description du projet avec effet machine à écrire */}
        <div className="description-container">
          <TypewriterEffect
            className="typewriter-project-page"
            text={project.description}
          />
        </div>
      </div>

      <div className="project-footer">
        <div className="nav-projects">
          {/* Lien vers le projet précédent, s'il existe */}
          <div className="prev-project-container">
            {prevProject && (
              <NavLink
                to={`/project/${prevProject.id}`}
                className="prev-project-button"
                // onClick={handleHapticFeedback}
              >
                {`<`}
              </NavLink>
            )}
          </div>
          {/* Lien vers le projet suivant, s'il existe */}
          <div className="next-project-container">
            {nextProject && (
              <NavLink
                to={`/project/${nextProject.id}`}
                className="next-project-button"
                // onClick={handleHapticFeedback}
              >
                {`>`}
              </NavLink>
            )}
          </div>
        </div>
        {/* Lien de retour à la page d'accueil */}
        <NavLink
          to="/home"
          id="home-button-project-page"
          // onClick={handleHapticFeedback}
        >
          <img
            src="/icons/homeButton.png"
            id="home-button-project-page-img"
            alt="Retour à l'accueil"
          />
        </NavLink>

        {/* Lien vers le code source du projet sur GitHub */}
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
      </div>
    </div>
  );
};

export default ProjectPage;
