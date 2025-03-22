import React from 'react';
import logo from '../img/logo.png';
import '../fonts/fonts.css';

const Header = () => {
  return (
    <nav style={styles.container}>
      <div style={styles.box}>
        <a href="/" style={styles.logo}>
          <img src={logo} alt="logo" width={49} height={49}/>
          <text style={styles.name}>Eventify</text>
        </a>
        <ul style={styles.horizontalList}>
          <li style={styles.item}><a style={styles.a} href="/list">Мероприятия</a></li>
          <li style={styles.item}><a style={styles.a} href="/about-product">О продукте</a></li>
          <li style={styles.item}><a style={styles.a} href="/auth/login">Войти</a></li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    height: "132px",
    width: "100%",
    borderBottom: "1px solid #354A77",

    fontSize: "30px",
    fontFamily: "Montserrat",
  },
  horizontalList: {
    display: "flex",
    listStyle: "none",
    marginRight: "48px",
  },
  item: {
    marginLeft: "41px",
    color: "black",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    height: "80px",
    width: "83.333%",
    minWidth: "740px",
    boxShadow: "0 7px 15px #00000040",
    borderRadius: "1000px",
    backgroundColor: "#FCFCFC",
  },
  logo: {
    display: "flex",
    alignItems: 'center',
    margin: "42px",
    fontSize: "36px",
    textDecoration: "none",
    color: "inherit",
    gap: "14px",
  },
  a: {
    textDecoration: "none",
    color: "inherit"
  },
}

export default Header;