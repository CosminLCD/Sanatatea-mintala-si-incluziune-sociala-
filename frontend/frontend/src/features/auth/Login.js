// frontend/src/features/auth/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Importăm Link
import Button from '../../components/ui/Button';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    try {
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        console.log("Login reușit!");
        navigate('/');
        window.location.reload();
      } else {
        setError('Nume de utilizator sau parolă incorectă.');
      }
    } catch (err) {
      setError('A apărut o eroare de conexiune.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Autentificare</h2>
        <p>Bine ai venit înapoi pe Nexum!</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nume Utilizator</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Parolă</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <Button type="submit" variant="primary" className="w-100">
            Intră în Cont
          </Button>
        </form>

        {/* 2. Secțiunea Nouă: Link către Înregistrare */}
        <div className="auth-footer">
          <p>
            Nu ai cont?{' '}
            <Link to="/register" className="auth-link">
              Înregistrează-te acum
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;