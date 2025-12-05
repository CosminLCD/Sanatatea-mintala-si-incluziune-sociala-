// În frontend/src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importăm componentul Link

function Header() {
  return (
    <header className="App-header">
      <div className="logo">🧠 Platforma Inclusiv</div>
      <nav>
        {/* 2. Schimbăm <a> în <Link> și href în to */}
        <Link to="/">Acasă</Link>
        <Link to="/resurse">Resurse</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;