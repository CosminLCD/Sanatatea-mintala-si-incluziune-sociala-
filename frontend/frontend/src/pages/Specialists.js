import React, { useState, useEffect } from 'react';
import './style/Specialists.css'; 
import { FaMapMarkerAlt, FaStar, FaCheckCircle } from 'react-icons/fa';
//import { Link } from 'react-router-dom'; // Asigură-te că ai importat Link
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom'; // 1. Importăm useNavigate

const Specialists = () => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Inițializăm funcția de navigare

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch('/api/specialists/public/');
        const data = await response.json();
        setSpecialists(data);
      } catch (error) {
        console.error("Eroare:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialists();
  }, []);

  // Funcție pentru a extrage inițiala (ex: "Costel" -> "C")
  const getInitials = (firstName, lastName) => {
    if (firstName) return firstName.charAt(0).toUpperCase();
    if (lastName) return lastName.charAt(0).toUpperCase();
    return "S"; // S de la Specialist dacă nu are nume
  };
  // 3. Funcția "Paznic" 👮‍♂️
  const handleDetailsClick = (id) => {
    const token = localStorage.getItem('access_token');

    if (token) {
        // CAZ A: Are cont -> Îl lăsăm să vadă detaliile
        navigate(`/specialist/${id}`);
    } else {
        // CAZ B: Nu are cont -> Îl trimitem la Login
        // Opțional: Poți pune un alert('Trebuie să fii logat pentru a vedea detaliile.');
        navigate('/login');
    }
  };

  // Funcție ajutătoare pentru a verifica dacă e URL valid sau relativ
  const getImageUrl = (url) => {
      if (!url) return null;
      // Dacă url-ul e deja complet (http...), îl returnăm
      if (url.startsWith('http')) return url;
      // Altfel, nu îl folosim (sau îi punem prefixul backend-ului dacă e nevoie)
      return url; 
  };

  if (loading) return <div className="loading-container">Se încarcă lista...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Specialiștii Noștri 🩺</h1>
        <p>Experți verificați gata să te ajute.</p>
      </div>

      <div className="specialists-list">
        {specialists.length > 0 ? (
          specialists.map((spec) => (
            <div key={spec.id} className="specialist-card-horizontal">
              
              {/* --- ZONA 1: POZA sau INIȚIALA (Stânga) --- */}
              <div className="card-avatar">
                {spec.profile_photo ? (
                    <img 
                        src={spec.profile_photo} 
                        alt="Profile" 
                        onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} // Dacă poza dă eroare, o ascundem și arătăm inițiala
                    />
                ) : null}
                
                {/* Fallback cu Inițiala (se vede dacă nu e poză) */}
                <div className="avatar-placeholder" style={{display: spec.profile_photo ? 'none' : 'flex'}}>
                    {getInitials(spec.first_name, spec.last_name)}
                </div>
              </div>
              
              {/* --- ZONA 2: INFORMAȚII (Mijloc) --- */}
              <div className="card-info">
                <div className="info-header">
                    <h3>
                        {spec.first_name ? `Dr. ${spec.first_name} ${spec.last_name}` : spec.specialization}
                        {spec.is_verified && <FaCheckCircle className="verified-icon"/>}
                    </h3>
                    <div className="rating-badge">
                        <FaStar className="star-icon" /> 5.0
                    </div>
                </div>

                <p className="spec-role">{spec.specialization}</p>
                
                <div className="spec-location">
                    <FaMapMarkerAlt /> {spec.offers_online ? "Disponibil Online & Fizic" : spec.address || "România"}
                </div>

                {/* Tag-uri (similare cu cele din poza ta) */}
                <div className="spec-tags">
                    <span className="tag">Psihoterapie</span>
                    <span className="tag">Anxietate</span>
                    <span className="tag">Consiliere</span>
                </div>
              </div>

              {/* --- ZONA 3: BUTOANE (Dreapta) --- */}
              <div className="card-actions">
               <Button 
                    className="btn-details" 
                    onClick={() => handleDetailsClick(spec.id)}
                    style={{width: '100%'}} // Opțional: ca să arate bine
                >
                    Detalii
                </Button>
              </div>

            </div>
          ))
        ) : (
          <p className="no-data">Momentan nu există specialiști aprobați.</p>
        )}
      </div>
    </div>
  );
};

export default Specialists;