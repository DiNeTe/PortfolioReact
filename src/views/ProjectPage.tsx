import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Project } from "../data/Project";
import { useAppDependencies } from "../app/context";

import Tag from "../components/Tag";
import SlideShow from "../components/SlideShow";

const ProjectPage: React.FC = () => {
    // hook utilisé pour  obtenir l'id du projet.
    const { id } = useParams<{ id: string }>();
    // Utilisation des dépendances de l'application pour récupérer les données
    const { projectDataSource } = useAppDependencies();
    const [project, setProject] = useState<Project | undefined>(
      undefined
    );
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
    <h1>{project.title}</h1>
    <SlideShow images={project.pictures} />
    <p>{project.description}</p>
    <div id="tag-container">
      {project.tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </div>
  </div>
);
};

export default ProjectPage;