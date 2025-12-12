// frontend/src/pages/ApplySpecialist.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './style/Dashboard.css'; // Refolosim stilurile existente

const ApplySpecialist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Starea pentru toate câmpurile
  const [formData, setFormData] = useState({
    specialization: '',
    license_code: '',
    experience_years: 0,
    description: '',
    offers_online: false,
    offers_physical: false,
    address: '',
    phone_number: '',
    email_public: '',
    website: '',
    linkedin: '',
    facebook: '',
    whatsapp: '',
    tiktok: ''
  });

  // Stare separată pentru fișier (poză)
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Gestionăm schimbările în input-urile text și checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Gestionăm încărcarea pozei
  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Construim pachetul de date (FormData)
    const dataToSend = new FormData();
    
    // Adăugăm toate câmpurile text
    Object.keys(formData).forEach(key => {
        dataToSend.append(key, formData[key]);
    });

    // Adăugăm poza doar dacă a fost selectată
    if (profilePhoto) {
        dataToSend.append('profile_photo', profilePhoto);
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/api/apply-specialist/', {  // <--- Slash la final!
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            // NOTĂ: Nu punem 'Content-Type': 'application/json' aici, 
            // browserul va pune automat tipul corect pentru fișiere (multipart/form-data)
        },
        body: dataToSend,
      });

      if (response.ok) {
        alert("Aplicația a fost trimisă cu succes! 🎉");
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error(data);
        setError("A apărut o eroare. Verifică dacă ai completat toate câmpurile obligatorii.");
      }
    } catch (err) {
      setError("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card" style={{maxWidth: '800px', margin: '0 auto'}}>
        <h2 style={{color: '#00796b', marginBottom: '20px'}}>Aplică pentru cont de Specialist 🩺</h2>
        <p className="mb-4">Completează profilul profesional pentru a fi verificat.</p>

        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* --- Secțiunea 1: Detalii Profesionale --- */}
          <h4 className="section-title">1. Detalii Profesionale</h4>
          
          <div className="form-group">
            <label>Specializare (ex: Psiholog Clinician)</label>
            <input type="text" name="specialization" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Cod de Parafă / Certificare (pentru validare)</label>
            <input type="text" name="license_code" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Ani de Experiență</label>
            <input type="number" name="experience_years" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descriere Profesională</label>
            <textarea name="description" rows="4" onChange={handleChange} required className="w-100 p-2" style={{borderRadius:'10px', border:'1px solid #ccc'}}></textarea>
          </div>

          <div className="form-group">
            <label>Poză de Profil (Profesională)</label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>

          {/* --- Secțiunea 2: Mod de lucru --- */}
          <h4 className="section-title mt-4">2. Mod de lucru</h4>
          <div className="checkbox-group" style={{display:'flex', gap:'20px', marginBottom:'15px'}}>
            <label>
                <input type="checkbox" name="offers_online" checked={formData.offers_online} onChange={handleChange} />
                {' '} Ofer ședințe Online
            </label>
            <label>
                <input type="checkbox" name="offers_physical" checked={formData.offers_physical} onChange={handleChange} />
                {' '} Ofer ședințe Fizic
            </label>
          </div>

          {formData.offers_physical && (
            <div className="form-group">
                <label>Adresa Cabinetului</label>
                <input type="text" name="address" onChange={handleChange} />
            </div>
          )}

          {/* --- Secțiunea 3: Contact --- */}
          <h4 className="section-title mt-4">3. Date de Contact Publice</h4>
          
          <div className="form-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
            <div className="form-group">
                <label>Telefon</label>
                <input type="text" name="phone_number" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Email Public</label>
                <input type="email" name="email_public" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Website</label>
                <input type="url" name="website" onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
                <label>LinkedIn</label>
                <input type="url" name="linkedin" onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
                <label>Facebook</label>
                <input type="url" name="facebook" onChange={handleChange} placeholder="https://..." />
          </div>
            <div className="form-group">
                <label>WhatsApp</label>
                <input type="url" name="whatsapp" onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
                <label>TikTok</label>
                <input type="url" name="tiktok" onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-100 mt-4" disabled={loading}>
            {loading ? 'Se trimite...' : 'Trimite Aplicația'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplySpecialist;