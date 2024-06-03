import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // Utiliser import.meta.env pour Vite
  const correctPassword = import.meta.env.VITE_CORRECT_PASSWORD;

  useEffect(() => {
    if (password === correctPassword) {
      // Utiliser useNavigate pour la redirection
      navigate('/Home');
    }
  }, [password, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (password !== correctPassword) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setIsError(true);
      }
    }
  };

  return (
    <div className="loginScreenPage">
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
        <NavLink to="/Home" className="loginLink">
          Se connecter en tant qu'invité
        </NavLink>
      </div>
    </div>
  );
};

export default LoginScreen;
