import React from "react";
import calendar from "../img/calendar.png";
import calendarIcon from "../img/calendarIcon.png";
import '../fonts/fonts.css';

const Main = () => {
  return (
    <div style={styles.container}>

      <section style={{...styles.section1, ...styles.section}}>
        <div>
          <h1 style={{...styles.title, ...styles.title1}}>Управляйте всеми мероприятиями в одном месте</h1>
          <p style={{...styles.text, ...styles.text1}}>Организуйте или записывайтесь на концерты, встречи, и любые другие активности!</p>
          <div style={styles.buttons1}>
            <a style={styles.loginButton} href="/login">Войти</a>
            <a style={styles.aboutButton} href="/podrobnee">Подробнее</a>
          </div>
        </div>
        <img src={calendar} style={styles.img} alt="img"/>
      </section>

      <section style={{...styles.section2, ...styles.section}}>
        <ul style={styles.advantageList}>
          <li style={styles.advantageItem}>
            <img style={styles.advantageImg} src={calendarIcon} alt="advantage"/>
            <h3 style={styles.advantageText}>У нас пиздец какой удобный календарь</h3>
          </li>
          <li style={styles.advantageItem}>
            <img style={styles.advantageImg} src={calendarIcon} alt="advantage"/>
            <h3 style={styles.advantageText}>Поём тоже неплохо</h3>
          </li>
          <li style={styles.advantageItem}>
            <img style={styles.advantageImg} src={calendarIcon} alt="advantage"/>
            <h3 style={styles.advantageText}>А шашлыки мы как готовим ууууу</h3>
          </li>
        </ul>
        {/* <h1 style={{...styles.title, ...styles.title2}}>Управляйте всеми мероприятиями в одном месте</h1> */}
        {/* <p style={{...styles.text, ...styles.text2}}>Организуйте или записывайтесь на концерты, встречи, и любые другие активности!</p> */}
        {/* <img src={calendar} style={styles.img} alt="img"/> */}
      </section>

      <section style={{...styles.section3, ...styles.section}}>
        <h1 style={{...styles.title, ...styles.title3}}>Управляйте всеми мероприятиями в одном месте</h1>
        <p style={{...styles.text, ...styles.text3}}>Организуйте или записывайтесь на концерты, встречи, и любые другие активности!</p>
        <img src={calendar} style={styles.img} alt="img"/>
      </section>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "Montserrat",
  },
  text: {
    fontSize: "28px",
    marginTop: "13px",
    color: "#3D6D8E",
    fontWeight: "500",
  },
  title: {
    fontSize: "56px",
    marginTop: "0",
    marginBottom: "0",
    color: "#20516F",
    fontWeight: "700",
  },
  section: {
    borderBottom: "1px solid #354A77",
    paddingLeft: "160px",
  },
  img: {
    marginBottom: "61px",
    marginTop: "-27px",
  },

  section1: {
    display: "flex",
    gap: "254px",
    paddingTop: "140px",
  },
  text1: {
    width: "650px",
    height: "95px",
    lineHeight: "120%",
    marginBottom: "0"
  },
  title1: {
    width: "650px",
    height: "220px",
  },
  buttons1: {
    display: "flex",
    gap: "36px",
    fontSize: "28px",
    textTransform: "uppercase",
    fontWeight: "500",
    
    height: "93px",
    
    marginTop: "54px",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CEDEFF",
    borderRadius: "100px",
    border: "3.5px solid black",
    textDecoration: "none",
    color: "black",

    width: "244px",

  },
  aboutButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "100px",
    border: "3.5px solid black",
    textDecoration: "none",
    color: "black",

    width: "244px",
  },

  advantageList: {
    display: "flex",
    justifyContent: "center",
    gap: "199px",
    listStyle: "none",  
    marginTop: "0",
    paddingTop: "85px",
  },
  advantageItem: {
    textAlign: 'center',
    width: "278px",
    height: "249px",

  },
  advantageImg: {
    width: "100px",
    height: "100px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",

  },
  advantageText: {
    textAlign: "center",
    lineHeight: "100%",
    fontSize: "28px",
    marginTop: "19px",
    height: "130px",
    fontWeight: "500",
    letterSpacing: 2.5,
    lineHeight: 1.24,
    color: "#3D6D8E",

  },

  section2: {
    height: "915px",
    
  },
  text2: {
    width: "752px",
  },
  title2: {
    width: "752px",
  },

  section3: {
    
  },
  text3: {
    width: "752px",
  },
  title3: {
    width: "752px",
  },
};
  
export default Main;