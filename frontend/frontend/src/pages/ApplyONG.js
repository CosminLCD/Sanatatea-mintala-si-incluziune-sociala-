// frontend/src/pages/ApplyONG.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './style/Dashboard.css'; // Atenție la calea corectă către CSS!

const ApplyONG = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Câmpurile specifice ONG
  const [formData, setFormData] = useState({
    organization_name: '',
    cui: '', // Codul Fiscal
    description: '',
    address: '',
    phone_number: '',
    email_public: '',
    website: '',
    facebook: '',
    instagram: '',
    tiktok: ''
  });

  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const dataToSend = new FormData();
    
    // Adăugăm textul
    Object.keys(formData).forEach(key => {
        dataToSend.append(key, formData[key]);
    });

    // Adăugăm logo-ul
    if (logo) {
        dataToSend.append('logo', logo);
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/api/apply-ong/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: dataToSend,
      });

      if (response.ok) {
        alert("Profilul ONG a fost înregistrat! Urmează validarea. 🎉");
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error(data);
        setError("Eroare la trimitere. Verifică toate câmpurile.");
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
        <h2 style={{color: '#f57c00', marginBottom: '20px'}}>Înscrie Instituție / ONG 🤝</h2>
        <p className="mb-4">Alătură-te rețelei noastre pentru a ajuta comunitatea.</p>

        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* --- Secțiunea 1: Detalii Organizație --- */}
          <h4 className="section-title">1. Despre Organizație</h4>
          
          <div className="form-group">
            <label>Numele Organizației</label>
            <input type="text" name="organization_name" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>CUI (Cod Unic de Înregistrare)</label>
            <input type="text" name="cui" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Misiune și Obiective (Descriere)</label>
            <textarea name="description" rows="4" onChange={handleChange} required className="w-100 p-2" style={{borderRadius:'10px', border:'1px solid #ccc'}}></textarea>
          </div>

          <div className="form-group">
            <label>Adresa Sediului</label>
            <input type="text" name="address" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Logo Organizație</label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>

          {/* --- Secțiunea 2: Contact --- */}
          <h4 className="section-title mt-4">2. Date de Contact</h4>
          
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
                <label>Facebook</label>
                <input type="url" name="facebook" onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
                <label>Instagram</label>
                <input type="url" name="instagram" onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-100 mt-4" style={{backgroundColor: '#f57c00', borderColor: '#f57c00'}} disabled={loading}>
            {loading ? 'Se trimite...' : 'Trimite Aplicația'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplyONG;