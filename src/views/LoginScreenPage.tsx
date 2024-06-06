import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const correctPassword = import.meta.env.VITE_CORRECT_PASSWORD;

  useEffect(() => {
    if (password === correctPassword) {
      setIsLoading(true);
      setTimeout(() => {
        navigate('/Home');
      }, 1000);
    }
  }, [password, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (password !== correctPassword) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setIsError(true);

        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      } else {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/Home');
        }, 1000);
      }
    }
  };

  return (
    <div className="loginScreenPage">
      <div className={`content ${isLoading ? 'blur' : ''}`}>
        <img src="images/loginScreen.webp" className="wallpaper" alt="Wallpaper" />
        
        <div className="loginScreenInsert"> 
          <img src="pp/avatar.png" className="pp" alt="Avatar" />
          <span className="fullName">Pierre Weber</span>
          <input 
            className={`password ${isError ? 'error' : ''} ${shake ? 'shake' : ''}`} 
            type="password" 
            placeholder={isError ? "Code incorrect" : "Code confidentiel"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="loginLink"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                navigate('/Home');
              }, 1000);
            }}
          >
            Se connecter en tant qu'invité
          </button>
        </div>
      </div>
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
