import React from "react";
import meeting from "../img/meeting.png";
import butterfly_right from "../img/butterfly_right.svg";
import butterfly_left from "../img/butterfly_left.svg";
import logo from "../img/logo 3.svg"
import '../fonts/fonts.css';

const Main = () => {
  return (
    <div style={styles.container}>
        <div style={{...styles.section1, ...styles.section}}>
            <img src={butterfly_right} style={styles.butterfly_right}/>
            <h2 style={styles.title}>Что такое Eventify?</h2>
            <p style={styles.text}>Мы создаём веб-приложение для структурирования организационных моментов при планировании и проведении мероприятий. Оно отлично подойдёт как для студентов-организаторов, так и для любителей участвовать в чём-то новом</p>
        </div>

        <div style={{textAlign: "center"}}>
            <img src={logo} alt="logo" style={styles.picture} />
            <div style={{...styles.section2, ...styles.section}}>
              <h2 style={styles.title}>Что мы предлагаем?</h2>
              <p style={styles.text}>Широкий список возможностей в одном месте: регистрация участников, отслеживание посещаемости, календарь событий, лента мероприятий и многое другое</p>
            </div>
        </div>

        <div style={{...styles.section3, ...styles.section}}>
            <img src={butterfly_left} style={styles.butterfly_left}/>
            <h2 style={styles.title}>Почему именно мы?</h2>
            <p style={styles.text}>Наша команда ориентируется на потребности студентов, ведь мы сами ими являемся и понимаем, какого труда стоит проводить мероприятия. Наша задача - упростить этот процесс. Также мы открыты к предложениям по улучшению Eventify, и вы всегда можете связаться с нами!</p>
        </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    fontFamily: "Montserrat",
    overflowX: 'hidden',
    justifyContent: "space-evenly", // можно заменить на "center", если нужно
    color: "#20516F",
    gap: "57px",
    padding: "0 123px"
  },

  section: {
    border: "3px solid #3D6D8E",
    borderRadius: "40px",
    width: "520px",
    position: 'relative',
  },

  title: {
    fontSize: "36px",
    width: "475px",
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: "center"
  },

  text: {
    fontSize: "24px",
    lineHeight: "48px",
    width: "475px",
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: "center"
  },
  
  section1: {
    height: "570px"
  },

  section2: {
    height: "437px"

  },

  section3: {
    height: "570px",
    bottom: "auto"

  },

  picture: {
    height: "370px",
    marginTop: "-60px",
    marginBottom: "-60px",
  },

  butterfly_right: { 
    position: 'absolute',
    left: "-65px",
    top: "-85px",
  },

  butterfly_left: {
    position: 'absolute',
    left: "470px",
    top: "-120px",
  },

};

export default Main;