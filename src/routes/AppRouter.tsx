import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import Home from '../views/Home';
import LoginScreen from '../views/LoginScreen';

const AppRouter: React.FC = () => {
  const location = useLocation();
  const [routeKeys, setRouteKeys] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setRouteKeys((prevKeys) => ({
      ...prevKeys,
      [location.pathname]: uuidv4(),
    }));
  }, [location.pathname]);

  const currentKey = routeKeys[location.pathname] || 'default';

  console.log('Location pathname:', location.pathname);
  console.log('Current key:', currentKey);

  return (
    <SwitchTransition>
      <CSSTransition
        key={currentKey} // Utiliser une clé unique générée
        timeout={300}
        classNames="fade"
      >
        <div className="transition-wrapper">
          <Routes location={location}>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppRouter;