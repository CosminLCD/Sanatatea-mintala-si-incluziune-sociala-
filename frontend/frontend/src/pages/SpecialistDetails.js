import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import './style/SpecialistDetails.css'; // Imediat facem și CSS-ul

const SpecialistDetails = () => {
  const { id } = useParams(); // Luăm ID-ul din URL
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/specialists/public/${id}/`);
        if (response.ok) {
            const data = await response.json();
            setSpecialist(data);
        } else {
            console.error("Nu am găsit specialistul.");
        }
      } catch (error) {
        console.error("Eroare:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading-container">Se încarcă profilul...</div>;
  if (!specialist) return <div className="error-container">Specialistul nu a fost găsit.</div>;

  // Funcție pentru inițiale (backup la poză)
  const getInitials = (first, last) => {
      if (first) return first.charAt(0);
      return "S";
  };

  return (
    <div className="details-page-container">
      {/* --- HEADER CU POZA ȘI NUME --- */}
      <div className="details-header">
        <div className="header-avatar">
            {specialist.profile_photo ? (
                <img src={specialist.profile_photo} alt="Profile" />
            ) : (
                <div className="header-initials">{getInitials(specialist.first_name, specialist.last_name)}</div>
            )}
        </div>
        
        <div className="header-info">
            <h1>
                {specialist.first_name ? `Dr. ${specialist.first_name} ${specialist.last_name}` : specialist.specialization}
                {specialist.is_verified && <FaCheckCircle className="verified-icon-large"/>}
            </h1>
            <p className="header-role">{specialist.specialization}</p>
            <div className="header-location">
                <FaMapMarkerAlt /> {specialist.offers_online ? "Disponibil Online & Fizic" : specialist.address}
            </div>
        </div>
        
        <div className="header-actions">
            <div className="rating-box"><FaStar /> 5.0</div>
            <button className="btn-contact-large">Programează o Ședință</button>
        </div>
      </div>

      {/* --- CONȚINUT PRINCIPAL --- */}
      <div className="details-grid">
          
          {/* Coloana Stângă: Descriere */}
          <div className="details-main">
              <section className="info-section">
                  <h3>Despre Mine</h3>
                  <p className="description-text">{specialist.description}</p>
              </section>

              <section className="info-section">
                  <h3>Competențe și Servicii</h3>
                  <div className="tags-list">
                      <span className="detail-tag">Psihoterapie</span>
                      <span className="detail-tag">Dezvoltare Personală</span>
                      <span className="detail-tag">Consiliere</span>
                      {/* Aici poți adăuga dinamic dacă ai câmpuri */}
                  </div>
              </section>
          </div>

          {/* Coloana Dreaptă: Contact & Info */}
          <div className="details-sidebar">
              <div className="sidebar-card">
                  <h3>Informații Contact</h3>
                  <div className="contact-item">
                      <FaPhone className="icon-green"/> 
                      <span>{specialist.phone_number}</span>
                  </div>
                  {specialist.email_public && (
                    <div className="contact-item">
                        <FaEnvelope className="icon-green"/> 
                        <span>{specialist.email_public}</span>
                    </div>
                  )}
                  {specialist.website && (
                    <div className="contact-item">
                        <FaGlobe className="icon-green"/> 
                        <a href={specialist.website} target="_blank" rel="noreferrer">Website Personal</a>
                    </div>
                  )}
              </div>

              <div className="sidebar-card">
                  <h3>Detalii Profesionale</h3>
                  <p><strong>Parafă:</strong> {specialist.license_code}</p>
                  <p><strong>Experiență:</strong> {specialist.experience_years} ani</p>
              </div>
          </div>
      </div>
      
      <div className="back-link">
          <Link to="/specialists">← Înapoi la listă</Link>
      </div>
    </div>
  );
};

export default SpecialistDetails;