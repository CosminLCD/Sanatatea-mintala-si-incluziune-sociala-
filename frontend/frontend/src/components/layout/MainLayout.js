// frontend/src/components/layout/MainLayout.js
import React from 'react';
import Header from '../Header'; // Ajustează calea dacă e nevoie (Header e în ../Header sau ../../components/Header)
// Notă: Dacă Header e în src/components/Header.js, calea corectă e '../Header'

const MainLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Header />
      
      <main className="main-content">
        {/* Aici va fi "injectat" conținutul fiecărei pagini (Home, Contact, etc.) */}
        {children}
      </main>

      {/* Aici vom adăuga și un Footer mai târziu */}
      <footer style={{ textAlign: 'center', padding: '20px', fontSize: '0.8rem', opacity: 0.6 }}>
        &copy; {new Date().getFullYear()} Nexum - Platformă de Sănătate Mintală
      </footer>
    </div>
  );
};

export default MainLayout;