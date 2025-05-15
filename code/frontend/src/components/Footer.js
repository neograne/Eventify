import React from 'react';
import teamLogo from '../img/teamLogo.png';

const Footer = () => {
  return (
    <nav style={styles.container}>
        <a href="/git" style={styles.logo}>
          <img src={teamLogo} width={50} alt="Team Logo"/>
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
    width: "100%",
    fontFamily: "Montserrat",
    height: "70px",
    color: "white",
    gap: "813px",
    backgroundColor: "#20516F",
    marginTop: 'auto',

  },
  list: {
    display: "flex",
    gap: "57px",
    listStyle: "none",
    alignItems: 'center',
  },
  
  item: {
    marginRight: "10px",
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
    fontSize: "24px",
  },
}

export default Footer;