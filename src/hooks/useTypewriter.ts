import { useState, useEffect } from 'react';

// Hook personnalisé pour l'effet Typewriter
const useTypewriter = (text: string, speed: number = 50): string => {
  // État pour stocker le texte affiché progressivement
  const [displayText, setDisplayText] = useState<string>('');
  // Variable pour accumuler le texte complet
  let fullText = '';

  // Utilisation d'un effet pour gérer l'affichage progressif du texte
  useEffect(() => {
    let index = 0; // Index actuel dans le texte
    const intervalId = setInterval(() => {
      if (index < text.length) {
        // Ajoute le caractère suivant au texte complet
        fullText += text[index];
      } else {
        // Arrête l'intervalle une fois le texte complet affiché
        clearInterval(intervalId);
      }

      // Met à jour l'état du texte affiché
      setDisplayText(fullText);

      // Incrémente l'index pour le prochain caractère
      index++;
    }, speed);

    // Nettoie l'intervalle lors du démontage du composant ou changement de dépendances
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
