import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => (
  <nav>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/project/1">Project 1</Link></li>
      <li><Link to="/project/2">Project 2</Link></li>
      <li><Link to="/project/3">Project 3</Link></li>
      <li><Link to="/project/4">Project 4</Link></li>
      <li><Link to="/project/5">Project 5</Link></li>
    </ul>
  </nav>
);

export default Navigation;
