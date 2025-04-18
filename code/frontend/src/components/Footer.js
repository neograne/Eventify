import React from 'react';
import teamLogo from '../img/teamLogo.png';

const Footer = () => {
  return (
    <nav style={styles.container}>
        <a href="/git">
          <img style={styles.logo} src={teamLogo}/>
        </a>
        <a style={styles.item} href="/about">О продукте</a>
        <a style={styles.item} href="/faq">FAQ</a>
        <a style={styles.item} href="/contacts">Contact us</a>
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

  logo: {
    width: "68px",
  }
}

export default Footer;