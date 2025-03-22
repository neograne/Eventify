import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <nav style={styles.container}>
        <Link style={styles.item} to="/faq">FAQ</Link>
        <Link style={styles.item} to="/about">About</Link>
        <Link style={styles.item} to="/contacts">Связь с разработчиком</Link>
        <Link style={styles.item} to="/git-hub">Git Hub проекта</Link>
        <Link style={styles.item} to="/lol">лол</Link>
    </nav>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    height: "50px",


    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
  },
  item: {
    fontSize: "16px", // Восстанавливаем размер шрифта
    marginRight: "10px", // Расстояние между элементами
    color: "white",
  },
}

export default Footer;