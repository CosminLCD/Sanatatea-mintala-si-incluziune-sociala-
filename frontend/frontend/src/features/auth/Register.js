// frontend/src/features/auth/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import './Login.css'; // Folosim aceleași stiluri ca la Login

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validare simplă: parolele să fie identice
    if (formData.password !== formData.confirm_password) {
      setError('Parolele nu coincid.');
      return;
    }

    try {
      // Trimitem datele la Django pentru a crea utilizatorul
      // Notă: Vom ajusta backend-ul imediat ca să accepte crearea de useri aici
      const response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
        }),
      });

      if (response.ok) {
        console.log("Înregistrare reușită!");
        navigate('/login'); // Îl trimitem la login după înregistrare
      } else {
        const data = await response.json();
        // Afișăm eroarea primită de la server (ex: username deja existent)
        setError('Eroare la înregistrare. Verifică datele.'); 
        console.error(data);
      }
    } catch (err) {
      setError('A apărut o eroare de conexiune.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Creează Cont</h2>
        <p>Alătură-te comunității Nexum</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nume Utilizator</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Parolă</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Confirmă Parola</label>
            <input type="password" name="confirm_password" onChange={handleChange} required />
          </div>

          <Button type="submit" variant="primary" className="w-100">
            Înregistrează-te
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Ai deja cont?{' '}
            <Link to="/login" className="auth-link">
              Loghează-te aici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;