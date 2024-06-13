import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginScreen: React.FC = () => {
  // États pour stocker le mot de passe, les erreurs, l'animation de secousse et l'état de chargement
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hook de navigation pour rediriger l'utilisateur après connexion
  const navigate = useNavigate();

  // Mot de passe correct stocké dans les variables d'environnement
  const correctPassword = import.meta.env.VITE_MDPADMIN;

  // Effet pour vérifier le mot de passe et naviguer vers la page d'accueil si correct
  useEffect(() => {
    if (password === correctPassword) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    }
  }, [password, correctPassword, navigate]);

  // Fonction pour gérer l'événement de pression de touche
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (password !== correctPassword) {
        // Si le mot de passe est incorrect, déclenche l'animation de secousse et affiche une erreur
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setIsError(true);

        // Enlève le focus de l'input pour réinitialiser l'état de l'erreur
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      } else {
        // Si le mot de passe est correct, affiche le chargement et navigue vers la page d'accueil
        setIsLoading(true);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      }
    }
  };

  return (
    <div className="loginScreenPage">
      <div className={`content ${isLoading ? "blur" : ""}`}>
        {/* Affiche le fond d'écran de la page de connexion */}
        <img
          src="images/loginScreen.webp"
          className="wallpaper"
          alt="Wallpaper"
        />

        <div className="loginScreenInsert">
        <h3 className="login-screen-infos-txt" id="portfolio"> portfolio </h3>

          {/* Affiche l'avatar et le nom complet */}
          <img src="pp/avatar.png" className="pp" alt="Avatar" />
          <h1 className="fullName">Pierre Weber </h1>
          <h2 className="login-screen-infos-txt" id="job"> Développeur Web </h2>

          {/* Champ de saisie pour le mot de passe avec gestion des erreurs et animations */}
          <input
            className={`password ${isError ? "error" : ""} ${
              shake ? "shake" : ""
            }`}
            type="password"
            placeholder={isError ? "Code incorrect" : "Code confidentiel"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Bouton pour se connecter en tant qu'invité */}
          <button
            className="loginLink"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                navigate("/Home");
              }, 1000);
            }}
          >
            Se connecter en tant qu'invité
          </button>
        </div>
      </div>
      {/* Affiche le spinner de chargement et un message de bienvenue si en cours de chargement */}
      {isLoading && (
        <div className="loadingContainer">
          <LoadingSpinner />
          <span className="welcomeMessage">Bienvenue</span>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
