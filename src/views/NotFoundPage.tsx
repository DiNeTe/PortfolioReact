import { Link } from "react-router-dom";

// composant fonctionnel React
const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <span className="error-code">404</span>
      <span className="error-text">
        Oups! La page que vous demandez n'existe pas.
      </span>
      <Link to="/home" className="home-link">
        Retourner sur la page d'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
