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

  // Effet pour gérer l'affichage des compétences au défilement
  useEffect(() => {
    const skillsContainer = document.getElementById('skills-container');

    const handleScroll = () => {
      const skillContents = document.querySelectorAll('.skill-content');
      skillContents.forEach((content) => {
        // Obtient la position de chaque élément par rapport au haut de la fenêtre
        const contentTop = content.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (contentTop < windowHeight -150 && contentTop > -90) {
          content.classList.add('visible');
        } else {
          content.classList.remove('visible');
        }
      });
    };

    if (skillsContainer) {
        // Ajoute l'écouteur d'événements 'scroll' pour appeler handleScroll lors du défilement
      skillsContainer.addEventListener('scroll', handleScroll);
      console.log("Scroll event listener added");

      // Déclenche l'événement 'scroll' initialement après un court délai pour s'assurer que tous les éléments sont montés
      setTimeout(() => {
        handleScroll();
        skillsContainer.dispatchEvent(new Event('scroll'));
      }, 100);

       // Fonction de nettoyage pour retirer l'écouteur d'événements lors du démontage du composant ou du changement de 'skills'
      return () => {
        skillsContainer.removeEventListener('scroll', handleScroll);
        console.log("Scroll event listener removed");
      };
    }
  }, [skills]);

  return (
    <>
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
                  <Tag key={index} className="skill-tag">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SkillsContent;
