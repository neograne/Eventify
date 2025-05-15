import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../img/user_icon.svg';
import { ReactComponent as MailIcon } from '../img/mail_icon.svg';
import { ReactComponent as LockIcon } from '../img/password_icon.svg';
import { ReactComponent as EyeIcon } from '../img/eye_icon.svg';
import { ReactComponent as EyeSlashIcon } from '../img/eye_slash_icon.svg';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    username: '' 
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const navigate = useNavigate();
  // const { useEffectAuthCheck } = useAuth();

  // useEffectAuthCheck(true, true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username
        }),
        credentials: 'include',
      });
      
      if (response.status === 200) {
        navigate('/profile');
      } else {
        setErrorMessage('Эта почта или логин уже зарегистрированы');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Произошла ошибка при регистрации');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Имя:
          </label>
          <div style={styles.inputContainer}>
            <UserIcon style={styles.icon} />
            <input
              type="text"
              id="username"
              value={formData.username}
              placeholder="Введите имя"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={styles.input}
              required
            />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <div style={styles.inputContainer}>
            <MailIcon style={styles.icon} />
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Введите email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.input}
              required
            />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Пароль:
          </label>
          <div style={styles.inputContainer}>
            <LockIcon style={styles.icon} />
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              value={formData.password}
              placeholder="Введите пароль"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={styles.input}
              required
            />
            <button 
              type="button" 
              onClick={() => togglePasswordVisibility('password')}
              style={styles.passwordToggle}
            >
              {showPassword.password ? <EyeSlashIcon style={{...styles.icon, left: "-35px"}} /> : <EyeIcon style={{...styles.icon, left: "-35px"}} />}
            </button>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>
            Повторите пароль:
          </label>
          <div style={styles.inputContainer}>
            <LockIcon style={styles.icon} />
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Повторите пароль"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              style={styles.input}
              required
            />
            <button 
              type="button" 
              onClick={() => togglePasswordVisibility('confirmPassword')}
              style={styles.passwordToggle}
            >
              {showPassword.confirmPassword ? <EyeSlashIcon style={{...styles.icon, left: "-35px"}} /> : <EyeIcon style={{...styles.icon, left: "-35px"}} />}
            </button>
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Зарегистрироваться
        </button>
        <div style={styles.loginLink}>
          <p style={{marginTop: "15px", marginBottom: "0px"}}>Уже есть аккаунт?</p> 
          <a style={styles.a} href="/auth/login">Войти</a>
        </div>
      </form>

      {showError && (
        <div style={styles.errorPopup}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    placeItems: 'center',
    margin: "0 auto",
    width: "800px",
    height: "726px",
    border: "3px solid #20516F",
    borderRadius: "40px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    color: "#20516F"
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "575px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    display: "block",
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '21px',
    transform: 'translateY(-50%)',
    color: '#737373',
  },
  input: {
    padding: "0 67px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    height: "60px",
    boxSizing: 'border-box',
  },
  passwordToggle: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#20516F',
    fontSize: '16px',
    padding: '0',
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#3D6D8E",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    height: "70px",
    marginTop: '20px',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: '0px',
    textAlign: 'center',
    fontSize: '16px',
  },
  a: {
    color: "#000000",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: '5px',
    '&:hover': {
      textDecoration: 'underline',
    }
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