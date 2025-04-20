import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [showError, setShowError] = useState(false); // Состояние для отображения ошибки
  const navigate = useNavigate();

  const { useEffectAuthCheck } = useAuth();

  useEffectAuthCheck(true, true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      if (response.status === 200) {
        navigate('/profile');
      } if (response.status === 500) {
        ;
      }else {
        setShowError(true); // Показываем ошибку, если статус не 200
        setTimeout(() => setShowError(false), 3000); // Автоматическое скрытие через 3 секунды
      }
    } catch (error) {
      console.error('Error:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Поля формы остаются без изменений */}
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Имя:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Зарегистрироваться
        </button>
      </form>

      {/* Всплывающее окно с ошибкой */}
      {showError && (
        <div style={styles.errorPopup}>
          Эта почта или логин уже зарегестрированы
        </div>
      )}
    </div>
  );
};

// Стили для компонента
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    width: "95%",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  errorPopup: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ff4444',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, top: 0 },
    to: { opacity: 1, top: '20px' }
  }
};

export default RegistrationForm;