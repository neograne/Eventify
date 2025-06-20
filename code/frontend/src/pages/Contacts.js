import Misha from "../img/Misha.png"
import Dima from "../img/Dima.png"
import Almaz from "../img/Almaz.png"
import Vlad from "../img/Vlad.png"
import '../fonts/fonts.css';

const Main = () => {
  return (
    <div style={styles.container}>
        <div style={styles.headerContainer}>
          <h1 style={styles.team}>Команда “В IT И ВЫЙТИ”</h1>
          <a style={styles.githubButton} href="https://github.com/neograne/Eventify">GITHUB ПРОЕКТА</a>
        </div>

        <div style={styles.authors}>
            <div style={styles.section}>
              <img style={styles.img} src={Almaz} />
              <h2 style={styles.name}>Абаев Алмаз</h2>
              <h3 style={styles.role}>Тимлид</h3>

              <div style={styles.bottomContainer}>
                <a 
                  style={styles.githubLink} 
                  href="https://github.com/neograne"     
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://github.com/neograne    
                </a>
                <p style={styles.email}>tralalerotralala@urfu.ru</p>
              </div>
            </div>

            <div style={styles.section}>
              <img style={styles.img} src={Dima} />
              <h2 style={styles.name}>Дашкин Дмитрий</h2>
              <h3 style={styles.role}>Разработчик</h3>

              <div style={styles.bottomContainer}>
                <a 
                  style={styles.githubLink} 
                  href="https://github.com/Dimasiggs"     
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://github.com/Dimasiggs  
                </a>
                <p style={styles.email}>tralalerotralala@urfu.ru</p>
              </div>
            </div>

            <div style={styles.section}>
              <img style={styles.img} src={Misha}/>
              <h2 style={styles.name}>Новокшонов Михаил</h2>
              <h3 style={styles.role}>Дизайнер</h3>

              <div style={styles.bottomContainer}>
                <a 
                  style={styles.githubLink} 
                  href="https://github.com/Mishanou"     
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://github.com/Mishanou    
                </a>
                <p style={styles.email}>M.D.Novokshonov@urfu.ru</p>
              </div>
            </div>

            <div style={styles.section}>
              <img style={styles.img} src={Vlad} />
              <h2 style={styles.name}>Комков Владислав</h2>
              <h3 style={styles.role}>Аналитик</h3>

              <div style={styles.bottomContainer}>
                <a 
                  style={styles.githubLink} 
                  href="https://github.com/Tale1337"     
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://github.com/Tale1337
                </a>
                <p style={styles.email}>tralalerotralala@urfu.ru</p>
              </div>
            </div>
        </div>


    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Montserrat",
    overflowX: 'hidden',
    
  },
  team: {
    fontSize: "28px",
    color: "#20516F"
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 180px',
    boxSizing: 'border-box',
    width: '100%',
  },

  githubButton: {
    textDecoration: "none",
    width: "230px",
    height: "43px",
    backgroundColor: "#CEDEFF",
    border: "1px solid #20516F",
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#000",
    fontSize: "18px", 
  },

  authors: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: "space-evenly",
    color: "#20516F",
    gap: "57px",
    padding: "0 123px"
  },

  section: {
    border: "3px solid #3D6D8E",
    borderRadius: "40px",
    width: "348px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    padding: "40px 20px",
    boxSizing: "border-box",
    backgroundColor: "#F5F5F5",
    position: "relative",
  },

  img: {
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "8px",
    backgroundColor: "#fefdfa",
    border: "3px solid #3D6D8E",
  },

  name: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#20516F",
    marginBottom: "0px",
    marginTop: "0",
  },

  role: {
    fontSize: "18px",
    color: "#20516F",
    marginBottom: "auto",
    padding: "0",
  },

  bottomContainer: {
    position: "absolute",
    bottom: "38px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
  },

  githubLink: {
    fontSize: "18px",
    color: "#20516F",
    textDecoration: "none",
  },

  email: {
    fontSize: "18px",
    color: "#20516F",
    margin: "0",
  },
  
};

export default Main;