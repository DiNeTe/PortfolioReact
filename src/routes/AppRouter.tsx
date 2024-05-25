import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import LoginScreen from '../views/LoginScreen';


const AppRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/Home" element={<Home/>} />
    </Routes>
  );
};

export default AppRouter;
