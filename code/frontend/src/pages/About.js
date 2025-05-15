import React from "react";
import meeting from "../img/meeting.png";
import butterfly1 from "../img/butterfly1.svg";
import butterfly2 from "../img/butterfly2.svg";
import logo from "../img/logo.svg"
import '../fonts/fonts.css';

const Main = () => {
  return (
    <div style={styles.container}>
        <div style={{...styles.section1, ...styles.section}}>
            <h2 style={styles.title}>Что такое Eventify?</h2>
            <p style={styles.text}>Мы создаём веб-приложение для структурирования организационных моментов при планировании и проведении мероприятий. Оно отлично подойдёт как для студентов-организаторов, так и для любителей участвовать в чём-то новом</p>
        </div>

        <div style={{...styles.section2, ...styles.section}}>
            <h2 style={styles.title}>Что мы предлагаем?</h2>
            <p style={styles.text}>Широкий список возможностей в одном месте: регистрация участников, отслеживание посещаемости, календарь событий, лента мероприятий и многое другое</p>
        </div>

        <div style={{...styles.section3, ...styles.section}}>
            <h2 style={styles.title}>Почему именно мы?</h2>
            <p style={styles.text}>Наша команда ориентируется на потребности студентов, ведь мы сами ими являемся и понимаем, какого труда стоит проводить мероприятия. Наша задача - упростить этот процесс. Также мы открыты к предложениям по улучшению Eventify, и вы всегда можете связаться с нами!</p>
        </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "Montserrat",
    overflowX: 'hidden',
    gap: "10px",
  },

  section: {
    border: "12px solid #CEDEFF",

  },

  title: {
    fontSize: "36px"
  },

  text: {
    fontSize: "24px"
  }

};

export default Main;