import React from 'react';
import logo from '../img/logo.svg';
import '../fonts/fonts.css';

const Header = () => {
  return (
    <nav style={styles.container}>
      <div style={styles.box}>
        <a href="/" style={styles.logo}>
          <img style={styles.img} src={logo} alt="logo"/>
          <text style={styles.name}><i>EVENTIFY</i></text>
        </a>
        <ul style={styles.horizontalList}>
          <li style={styles.item}><a style={styles.a} href="/list">Мероприятия</a></li>
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
    width: "100%",

    fontSize: "30px",
    fontFamily: "Montserrat",
    marginTop: "27px",
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
    height: "60px",
    width: "83.333%",
    minWidth: "740px",
    boxShadow: "0 7px 15px #00000040",
    borderRadius: "1000px",
    backgroundColor: "#FCFCFC",
  },
  logo: {
    display: "flex",
    alignItems: 'center',
    marginLeft: "20px",
    fontSize: "36px",
    textDecoration: "none",
    color: "inherit",
    fontFamily: "Barlow Condensed",

    color: "#3D6D8E",
    
  },
  a: {
    color: "inherit"
  },
  img: {
    width: "82px",
    height: "82px",
    paddingTop: "13px",
    //backgroundColor: "red",
  },
}

export default Header;