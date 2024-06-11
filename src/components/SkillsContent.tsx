import { useAppDependencies } from "../app/context";
import { useState, useEffect } from "react";
import { Skill } from "../data/Interfaces";
import Tag from "./Tag";

const SkillsContent: React.FC = () => {
  // État local pour stocker la liste des projets
  const [skills, setskills] = useState<Skill[]>([]);

  // Récupération des dépendances de l'application, incluant la source de données des projets
  const { projectDataSource } = useAppDependencies();

  // Effet pour charger les projets lors du montage du composant
  useEffect(() => {
    async function initPage() {
      // Récupère la liste des projets à partir de la source de données
      const skills = await projectDataSource.fetchManySkill();
      // Met à jour l'état avec les projets récupérés
      setskills(skills);
    }
    // Appelle la fonction pour initialiser la page
    initPage();
  }, [projectDataSource]);

  return (
    <div id="skills-container-window">
      {skills.map((skill: Skill) => (
        <div key={skill.id} className="skill-item">

          <div className="tags-container">
            {skill.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
          <div className="skill-img">
            <img src={skill.image} alt={skill.name}/>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsContent;
