import React from 'react';
import teamLogo from '../img/teamLogo.png';

const Footer = () => {
  return (
    <nav style={styles.container}>
        <a href="/git" style={styles.logo}>
          <img src={teamLogo} width={68}/>
          <p>В IT И ВЫЙТИ</p>
        </a>
        <ul style={styles.list}>
          <li><a style={styles.item} href="/about">О продукте</a></li>
          <li><a style={styles.item} href="/faq">FAQ</a></li>
          <li><a style={styles.item} href="/contacts">Contact us</a></li>
        </ul>
    </nav>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",

    fontFamily: "Montserrat",
    height: "100px",

    color: "white",
    textAlign: "center",
    gap: "813px",
    backgroundColor: "#20516F",
  },
  list: {
    display: "flex",
    gap: "57px",
    listStyle: "none",
  },
  
  item: {
    fontSize: "16px", // Восстанавливаем размер шрифта
    marginRight: "10px", // Расстояние между элементами
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
  },

  logo: {
    display: "flex",
    alignItems: 'center',
    gap: "21px",
    color: "white",
    textDecoration: "none",
    fontSize: "32px"
  },
}

export default Footer;