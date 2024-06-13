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

  return (<>
    <img src="./images/skills.webp" id="skill-wallpaper" alt="Wallpaper de la fenêtre compétences" />

    <div id="skills-container">
      {skills.map((skill) => (
        
        <div key={skill.id} className="skill-card">
          
          <div className="skill-content">
            
            <div className="skill-header">
              <div className="skill-logo">
                <img src={skill.image} alt={skill.name} />
              </div>
              <div className="skill-info">
                <p>{skill.description}</p>
              </div>
            </div>
            <div className="skill-tag">
              {skill.tags.map((tag, index) => (
                <Tag 
                key={index}
                className="skill-tag"
                >{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      ))}

                <img src="./images/skills.webp" id="skill-wallpaper" alt="Wallpaper de la fenêtre compétences" />

    </div></>
  );
};
export default SkillsContent;
