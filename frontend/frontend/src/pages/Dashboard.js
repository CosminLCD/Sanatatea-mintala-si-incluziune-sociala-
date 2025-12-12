import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FaUserMd, FaBuilding, FaKey, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';
import '../pages/style/Dashboard.css'; // Asigură-te că ai acest fișier CSS

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Stări pentru Modalul de Parolă
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch('/api/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  // Funcția de schimbare parolă
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    
    try {
        const response = await fetch('/api/users/change-password/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData),
        });

        const data = await response.json();

        if (response.ok) {
            setPasswordMessage({ type: 'success', text: 'Parola a fost schimbată!' });
            setTimeout(() => {
                setShowPasswordModal(false);
                setPasswordMessage({ type: '', text: '' });
                setPasswordData({ old_password: '', new_password: '' });
            }, 2000);
        } else {
            // Extragem eroarea (ori old_password ori generală)
            const errorText = data.old_password ? data.old_password[0] : 'Eroare la schimbare.';
            setPasswordMessage({ type: 'error', text: errorText });
        }
    } catch (err) {
        setPasswordMessage({ type: 'error', text: 'Eroare de server.' });
    }
  };

  if (loading) return <div className="loading-screen">Se încarcă profilul...</div>;
  if (!user) return <div className="error-screen">Eroare la încărcare.</div>;

  return (
    <div className="dashboard-container">
      {/* --- MODAL PENTRU PAROLĂ --- */}
      {showPasswordModal && (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Schimbă Parola</h3>
                    <FaTimes className="close-icon" onClick={() => setShowPasswordModal(false)} />
                </div>
                {passwordMessage.text && (
                    <div className={`message ${passwordMessage.type}`}>{passwordMessage.text}</div>
                )}
                <form onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label>Parola Veche</label>
                        <input 
                            type="password" 
                            value={passwordData.old_password}
                            onChange={(e) => setPasswordData({...passwordData, old_password: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Parola Nouă</label>
                        <input 
                            type="password" 
                            value={passwordData.new_password}
                            onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-100">Salvează</Button>
                </form>
            </div>
        </div>
      )}

      <div className="dashboard-header">
        <h1>Salut, {user.username}! 👋</h1>
        <p>Gestionează contul și implicarea ta în platformă.</p>
      </div>

      <div className="dashboard-content">
        {/* --- PROFIL --- */}
        <div className="profile-section">
          <div className="dashboard-card profile-card">
            <h3>Datele Tale</h3>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.email}</p>
                <div className="badges">
                    {user.is_patient && <span className="badge patient">Membru 🌱</span>}
                    {user.is_specialist && <span className="badge specialist">Specialist 🩺</span>}
                    {user.is_ong && <span className="badge ong">ONG/Firmă 🤝</span>}
                </div>
            </div>
            
            <div className="profile-actions">
                <Button variant="outline">Editează Profil</Button>
                {/* Butonul care deschide modalul */}
                <Button 
                    variant="outline" 
                    className="btn-password" 
                    onClick={() => setShowPasswordModal(true)}
                >
                    <FaKey style={{ marginRight: '8px' }}/> Schimbă Parola
                </Button>
            </div>
          </div>
        </div>

        {/* --- APLICAȚII --- */}
        <div className="applications-section">
          {/* ... în interiorul cardului specialist-card ... */}                   
            <h2>Extinde-ți rolul</h2>
            <div className="applications-grid">
                {!user.is_specialist && (
                    <div className="dashboard-card app-card specialist-card">
                        <div className="icon-wrapper"><FaUserMd /></div>
                        <h3>Ești Specialist?</h3>
                        <p>Psihologi, Psihiatri, Nutriționiști.</p>
                        {/* ... în interiorul cardului specialist-card ... */}

                        <Link to="/apply-specialist">  {/* <--- Adaugă acest Link */}
                            <Button variant="primary" className="w-100">Aplică ca Specialist</Button>
                        </Link>                        {/* <--- Și închide-l aici */}
                    </div>
                )}
                {!user.is_ong && (
                    <div className="dashboard-card app-card ong-card">
                        <div className="icon-wrapper"><FaBuilding /></div>
                        <h3>Reprezinți un ONG?</h3>
                        <p>Organizații și firme partenere.</p>
                        {/* ... în interiorul cardului ong-card ... */}
                          <Link to="/apply-ong">  {/* <--- Adaugă Link-ul */}
                            <Button variant="primary" className="w-100">Înscrie Instituție</Button>
                          </Link>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;