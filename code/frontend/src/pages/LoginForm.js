import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // Состояния для хранения данных формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    console.log("Вход:", { email, password });
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Войти
        </button>
        <div style={styles.buttons}>
          <div>
            <p>Нет аккаунта?</p> 
            <a href="/auth/registration"><p>Зарегистрироваться</p></a>
          </div>
          <div>
            <p>Забыли пароль?</p> 
            <a href="/auth/reset-password"><p>Восстановить</p></a>
          </div>
        </div>
      </form>
    </div>
  );
};

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
  buttons: {
    display: "flex",
    gap: "100px"
  }
};

export default LoginForm;