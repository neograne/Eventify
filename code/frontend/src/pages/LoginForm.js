import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { ReactComponent as MailIcon } from '../img/mail_icon.svg';
import { ReactComponent as LockIcon } from '../img/password_icon.svg';
import { ReactComponent as EyeIcon } from '../img/eye_icon.svg';
import { ReactComponent as EyeSlashIcon } from '../img/eye_slash_icon.svg';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { useEffectAuthCheck } = useAuth();
  
  useEffectAuthCheck(true, true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Вход в аккаунт</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              placeholder="Введите пароль"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={styles.input}
              required
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility}
              style={styles.passwordToggle}
            >
              {showPassword ? <EyeSlashIcon style={{...styles.icon, left: "-35px"}} /> : <EyeIcon style={{...styles.icon, left: "-35px"}} />}
            </button>
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Войти
        </button>
        <div style={styles.buttons}>
          <div>
            <p>Нет аккаунта?</p> 
            <a style={styles.a} href="/auth/registration"><p>Зарегистрироваться</p></a>
          </div>
          <div>
            <p>Забыли пароль?</p> 
            <a style={styles.a} href="/auth/reset-password"><p>Восстановить</p></a>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    placeItems: 'center',
    margin: "0 auto",
    marginTop: "95px",
    width: "800px",
    height: "588px",
    border: "3px solid #20516F",
    borderRadius: "40px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    color: "#20516F"
  },
  title: {
    fontSize: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "575px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#20516F',
    fontSize: '16px',
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
  buttons: {
    display: "flex",
    gap: "100px",
    marginTop: '20px',
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
};

export default LoginForm;