// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaBrain, FaUserMd } from 'react-icons/fa'; // Importăm iconițele
import Button from '../components/ui/Button'; // Butonul nostru reutilizabil
import '../pages/style/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Sănătatea ta mintală este prioritatea noastră</h1>
          <p className="hero-subtitle">
            Nexum combină inteligența artificială cu suportul uman pentru a-ți oferi
            echilibrul de care ai nevoie. Discută cu asistentul nostru sau găsește un specialist.
          </p>
          
          <div className="hero-buttons">
            <Link to="/asistent">
              <Button variant="primary">Vorbește cu AI</Button>
            </Link>
            <Link to="/resurse">
              <Button variant="outline">Află mai multe</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES PREVIEW --- */}
      <section className="features-preview">
        <h2>Ce îți oferă Nexum?</h2>
        <div className="cards-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="icon-bg"><FaRobot /></div>
            <h3>Asistent AI Empatic</h3>
            <p>Disponibil 24/7 pentru a te asculta și a-ți oferi recomandări personalizate.</p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="icon-bg"><FaBrain /></div>
            <h3>Planificator Smart</h3>
            <p>Algoritmi genetici care îți construiesc rutina perfectă pentru minte și trup.</p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="icon-bg"><FaUserMd /></div>
            <h3>Specialiști Verificați</h3>
            <p>Conectează-te cu specialiști și ONG-uri acreditate din zona ta.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;