import { useAppDependencies } from "../app/context";
import { useState, useEffect } from "react";
import { Skill } from "../data/Interfaces";
import Tag from "./Tag";

const SkillsContent: React.FC = () => {
  // État local pour stocker la liste des compétences
  const [skills, setSkills] = useState<Skill[]>([]);

  // Récupération des dépendances de l'application, incluant la source de données des compétences
  const { projectDataSource } = useAppDependencies();

  // Effet pour charger les compétences lors du montage du composant
  useEffect(() => {
    async function initPage() {
      // Récupère la liste des compétences à partir de la source de données
      const skills = await projectDataSource.fetchManySkill();
      // Met à jour l'état avec les compétences récupérées
      setSkills(skills);
    }
    // Appelle la fonction pour initialiser la page
    initPage();
  }, [projectDataSource]);

  return (
    <div id="skills-container-window">
      {skills.map((skill: Skill) => (
        <div key={skill.id} className="skill-item">
          <div className="skill-logo-container">
            <div className="skill-img">
              <img src={skill.image} alt={skill.name} />
            </div>
          </div>
          <div className="tags-container">
            {skill.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsContent;
