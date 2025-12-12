// frontend/src/components/Header.js
import React, { useState, useEffect } from 'react'; // 1. Importăm hooks
import { NavLink, Link, useNavigate } from 'react-router-dom'; // Adăugăm useNavigate
// Importăm pictogramele necesare (folosim setul FontAwesome și Remix)
import { FaHeart, FaHome, FaUserMd, FaRobot, FaUsers, FaBrain } from 'react-icons/fa';

import './Header.css'; // Vom crea acest fișier CSS imediat
import Button from './ui/Button'; // 1. Importăm componenta nouă

function Header() {
  const [click, setClick] = useState(false);
  // 2. Stare pentru a ști dacă e logat
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // 3. Verificăm token-ul la încărcarea componentei
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    // Dacă token-ul există, înseamnă că e logat (!! transformă string-ul în boolean true/false)
    setIsLoggedIn(!!token); 
  }, []);

  // Funcție opțională pentru Logout (o vom lega mai târziu de un buton)
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login');
    window.location.reload(); // Reîncărcăm pagina pentru a curăța starea
  };
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

        <NavLink to="/specialists" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
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
        {/* 4. ZONA DINAMICĂ: Aici facem magia */}
        <div className="navbar-actions">
          {isLoggedIn ? (
            // CAZUL 1: Utilizatorul ESTE logat -> Arătăm "Contul Meu"
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Link to="/dashboard"> {/* Sau /profil */}
                  <Button variant="primary">Contul Meu</Button>
                </Link>
                {/* Opțional: Un buton mic de Logout */}
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: '0.9rem' }}>
                    Ieșire
                </button>
            </div>
          ) : (
            // CAZUL 2: Utilizatorul NU este logat -> Arătăm Login / Register
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login">
                <Button variant="outline">Autentificare</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Înregistrare</Button>
              </Link>
            </div>
          )}
        </div>
    </header>
  );
}

export default Header;