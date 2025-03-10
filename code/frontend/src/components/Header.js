import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav style={styles.container}>
        <Link style={styles.item} to="/">Главная</Link>
        <Link style={styles.item} to="/reg">Зарегистрироваться</Link>
        <Link style={styles.item} to="/login">Войти</Link>
        <Link style={styles.item} to="/new-meeting">Создать митинг</Link>
        <Link style={styles.item} to="/new-meeting/add-speaker">Добавить спикера</Link>
    </nav>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "right",
    height: "50px",
    border: "2px solid #ccc",
  },
  item: {
    fontSize: "16px", // Восстанавливаем размер шрифта
    marginRight: "10px", // Расстояние между элементами
  },
}

export default Header;