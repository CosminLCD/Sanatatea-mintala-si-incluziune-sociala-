import React from 'react';
import { NavLink } from 'react-router-dom';
// Importăm pictogramele necesare (folosim setul FontAwesome și Remix)
import { FaHeart, FaHome, FaUserMd, FaRobot, FaUsers, FaBrain } from 'react-icons/fa';

import './Header.css'; // Vom crea acest fișier CSS imediat
import Button from './ui/Button'; // 1. Importăm componenta nouă

function Header() {
  return (
    <header className="navbar">
      {/* 1. Zona de Logo */}
      <div className="navbar-logo">
        <div className="logo-icon-circle">
            <FaHeart className="logo-icon" />
        </div>
        <span className="logo-text">Nexum</span>
      </div>

      {/* 2. Zona de Navigare (Meniul din mijloc) */}
      <nav className="navbar-links">
        {/* NavLink adaugă automat clasa "active" când suntem pe pagina respectivă */}
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <FaHome className="link-icon" /> Acasă
        </NavLink>

         <NavLink to="/asistent" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <FaRobot className="link-icon" /> Asistent AI
        </NavLink>

        <NavLink to="/specialisti" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <FaUserMd className="link-icon" /> Specialiști
        </NavLink>

        <NavLink to="/comunitate" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <FaUsers className="link-icon" /> Comunitate
        </NavLink>
        
        <NavLink to="/planificator" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <FaBrain className="link-icon" /> Planificator
        </NavLink>
      </nav>
        {/* 3. Zona de Acțiuni Utilizator */}
      <div className="navbar-actions">
        {/* Înlocuim <button> vechi cu componenta <Button> */}
        <Button variant="primary" onClick={() => console.log("Click pe cont")}>
            Contul Meu
        </Button>
      </div>
    </header>
  );
}

export default Header;