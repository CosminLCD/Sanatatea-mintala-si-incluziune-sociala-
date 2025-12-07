// frontend/src/components/ui/Button.js
import React from 'react';
import './Button.css'; // Vom crea stilurile imediat

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', // 'primary', 'secondary', 'outline'
  type = 'button',
  className = '',
  disabled = false
}) => {
  return (
    <button 
      type={type}
      className={`ui-btn ui-btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      // ARIA pentru accesibilitate (dacă e dezactivat)
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;