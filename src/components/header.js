import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <i className="fas fa-tractor"></i>
          <h1>Agri-Saarthi</h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-home"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/recommend" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-seedling"></i> Recommend
              </NavLink>
            </li>
            <li>
              <NavLink to="/detect" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-bug"></i> Detect
              </NavLink>
            </li>
            <li>
              <NavLink to="/chatbot" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-robot"></i> Chatbot
              </NavLink>
            </li>
            <li>
              <NavLink to="/irrigation" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-tint"></i> Irrigation
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;