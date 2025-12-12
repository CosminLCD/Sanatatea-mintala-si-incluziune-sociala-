// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Importăm Layout-ul nou
import MainLayout from './components/layout/MainLayout';

// Importăm Paginile
import Home from './pages/Home';
import Login from './features/auth/Login';       // <--- Import nou
import Register from './features/auth/Register'; // <--- Import nou
import Resources from './pages/Resources'; // Asigură-te că fișierul există sau comentează linia
import Contact from './pages/Contact';   // Asigură-te că fișierul există sau comentează linia
import Dashboard from './pages/Dashboard'; // Asigură-te că fișierul există sau comentează linia
import ApplySpecialist from './pages/ApplySpecialist'; // Asigură-te că fișierul există sau comentează linia
import ApplyONG from './pages/ApplyONG';
import Specialists from './pages/Specialists'; // Asigură-te că fișierul există sau comentează linia
import SpecialistDetails from './pages/SpecialistDetails';

function App() {
  return (
    <div className="App">
      {/* Învelim totul în Layout. Acesta va afișa Header-ul automat. */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resurse" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          {/* Definim rutele pentru autentificare */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Poți adăuga și alte rute aici */}
          <Route path="/apply-specialist" element={<ApplySpecialist />} />
          <Route path="/apply-ong" element={<ApplyONG />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/specialist/:id" element={<SpecialistDetails />} />
          <Route path="*" element={<h2>404 | Pagină negăsită</h2>} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;