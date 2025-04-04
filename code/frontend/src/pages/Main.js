import React from "react";
import calendarIcon from "../img/calendarIcon.png";
import checkmark from "../img/checkmark.png";
import notification from "../img/notification.png";
import meeting from "../img/meeting.png";
import features from "../img/features.png";
import butterfly from "../img/butterfly.png";
import girl_cries from "../img/girl_cries.png"
import '../fonts/fonts.css';

const Main = () => {
  return (
    <div style={styles.container}>
      <section style={{ ...styles.section1, ...styles.section }}>
        <div style={styles.section1Left}>
          <h1 style={{ ...styles.title, ...styles.title1 }}>Управляйте всеми мероприятиями в одном месте</h1>
          <p style={{ ...styles.text, ...styles.text1 }}>Организуйте или записывайтесь на концерты, встречи, и любые другие активности!</p>
          <div style={styles.buttons1}>
            <a style={styles.loginButton} href="/auth/registration">Войти</a>
            <a style={styles.aboutButton} href="/podrobnee">Подробнее</a>
          </div>
        </div>
        <img src={meeting} style={styles.section1Img} alt="meeting" />
      </section>

      <section style={{ ...styles.section2, ...styles.section }}>
        <div style={styles.advantagesContainer}>
          <div style={styles.advantageItem}>
            <img src={calendarIcon} alt="calendar icon" style={styles.advantageImg} />
            <h3 style={styles.advantageTitle}>Календарь событий</h3>
          </div>
          <div style={styles.advantageItem}>
            <img src={checkmark} alt="checkmark icon" style={styles.advantageImg} />
            <h3 style={styles.advantageTitle}>Отслеживание посещаемости</h3>
          </div>
          <div style={styles.advantageItem}>
            <img src={notification} alt="notification icon" style={styles.advantageImg} />
            <h3 style={styles.advantageTitle}>Напоминания о мероприятиях</h3>
          </div>
        </div>
      </section>

      <section style={{ ...styles.section3, ...styles.section }}>
        <div style={styles.section3Content}>
        <img src={features} alt="features" style={styles.section3Img} />
          <div style={styles.section3Text}>
            <h2 style={styles.section3Title}>Мы предлагаем удобный инструмент для организаторов</h2>
            <p style={styles.section3Description}>Быстрое создание и редактирование мероприятий, управление участниками и конечно же куча свага!</p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.section4, ...styles.section }}>
        <div style={styles.section4Content}>
          <div style={styles.section4Left}>
            <h2 style={styles.section4Title}>Организовать мероприятие легче с нашим сервисом</h2>
            <p style={styles.section4Text}>Никто не пришел на фан встречу? С нами такой проблемы не будет!</p>
          </div>
          <div style={styles.section4Middle}>
            <img src={girl_cries} alt="girl_cries" style={styles.girlCriesImg} />
          </div>
          <div style={styles.section4Right}>
            <img src={butterfly} alt="butterfly" style={styles.butterflyLeft} />
            <a href="/organize" style={styles.startButton}>НАЧАТЬ ИСПОЛЬЗОВАНИЕ</a>
            <img src={butterfly} alt="butterfly" style={styles.butterflyRight} />
          </div>
        </div>
      </section>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "Montserrat",
    overflowX: 'hidden', // Чтобы избежать горизонтальной прокрутки
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '40px 160px',
  },
  logo: {
    height: '30px', // Примерная высота логотипа
  },
  headerRight: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
  },
  headerLink: {
    textDecoration: 'none',
    color: '#3D6D8E',
    fontSize: '20px',
    fontWeight: '500',
  },
  headerButton: {
    backgroundColor: '#CEDEFF',
    color: 'black',
    border: '3.5px solid black',
    borderRadius: '100px',
    padding: '15px 40px',
    fontSize: '20px',
    fontWeight: '500',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: "28px",
    marginTop: "13px",
    color: "#3D6D8E",
    fontWeight: "500",
    lineHeight: '120%',
  },
  title: {
    fontSize: "56px",
    marginTop: "0",
    marginBottom: "0",
    color: "#20516F",
    fontWeight: "700",
    lineHeight: '110%',
  },
  section: {
    paddingLeft: "160px",
    paddingRight: "160px",
    paddingBottom: '80px',
  },
  section1: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: "100px",
  },
  section1Left: {
    maxWidth: '650px',
  },
  text1: {
    width: "100%",
    height: "auto",
    marginBottom: "0"
  },
  title1: {
    width: "100%",
    height: "auto",
    marginBottom: '30px',
  },
  buttons1: {
    display: "flex",
    gap: "36px",
    fontSize: "28px",
    textTransform: "uppercase",
    fontWeight: "500",
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
    height: '60px',
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
    height: '60px',
  },
  section1Img: {
    maxWidth: '50%',
    height: 'auto',
    marginBottom: "-61px",
    marginTop: "0px",
  },

  section2: {
    paddingTop: '80px',
    paddingBottom: '120px',
  },
  advantagesContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  advantageItem: {
    textAlign: 'center',
    maxWidth: "280px",
  },
  advantageImg: {
    width: "100px",
    height: "100px",
    marginBottom: '20px',
  },
  advantageTitle: {
    textAlign: "center",
    fontSize: "28px",
    marginTop: "0",
    fontWeight: "500",
    color: "#3D6D8E",
    lineHeight: '1.2',
  },

  section3: {
    paddingTop: '100px',
    paddingBottom: '100px',
  },
  section3Content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section3Text: {
    maxWidth: '550px',
  },
  section3Title: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#20516F',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  section3Description: {
    fontSize: '24px',
    color: '#3D6D8E',
    fontWeight: '500',
    lineHeight: '1.3',
  },
  section3Img: {
    maxWidth: '45%',
    height: 'auto',
  },

  section4: {
    paddingTop: '100px',
    paddingBottom: '100px',
  },
  section4Content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  section4Left: {
    marginBottom: '60px',
    maxWidth: '800px',
  },
  section4Title: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#20516F',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  section4Text: {
    fontSize: '24px',
    color: '#3D6D8E',
    fontWeight: '500',
    lineHeight: '1.3',
  },
  section4Right: {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
  },
  startButton: {
    backgroundColor: '#CEDEFF',
    color: 'black',
    border: '3.5px solid black',
    borderRadius: '100px',
    padding: '20px 60px',
    fontSize: '28px',
    fontWeight: '500',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  butterflyLeft: {
    height: '60px',
  },
  butterflyRight: {
    height: '60px',
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '40px 160px',
    fontSize: '16px',
    color: '#354A77',
  },
  footerLeft: {
    // Стили для левой части футера
  },
  footerRight: {
    display: 'flex',
    gap: '30px',
  },
  footerLink: {
    textDecoration: 'none',
    color: '#354A77',
  },
  footerText: {
    margin: 0,
  }
};

export default Main;