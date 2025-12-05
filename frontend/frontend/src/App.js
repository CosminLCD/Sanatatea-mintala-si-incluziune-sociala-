import React from 'react';
import './App.css'; // Încă avem nevoie să importăm fișierul CSS
import { Routes, Route } from 'react-router-dom'; // Importăm componentele necesare pentru rutare

import Header from './components/Header'; // Importăm componenta Header
import Home from './pages/Home'; // Importăm pagina Home
import Resources from './pages/Resources'; // Importăm pagina Resources
import Contact from './pages/Contact'; // Importăm pagina Contact 

function App() {
  return (
    <div className="App">
     <Header /> {/* 2. Folosim componentul Header */}
      <main>
        <Routes> {/* 3. Zona unde se schimbă conținutul */}
          <Route path="/" element={<Home />} />
          <Route path="/resurse" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          {/* Rută de rezervă pentru 404 (dacă adresa nu se potrivește) */}
          <Route path="*" element={<h2>404 | Pagină negăsită</h2>} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;