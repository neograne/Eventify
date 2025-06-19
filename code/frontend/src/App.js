import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import Main from './pages/Main';
import DevListPages from './pages/DevListPages';
import EventsList from './pages/EventsList';
import EventInfo from './pages/EventInfo';
import Profile from './pages/Profile';
import About from './pages/About';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import OrganizedEvent from './pages/OrganizedEvent';


import background_butterfly from "./img/background_butterfly.svg";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  
  const isBackgroundPage = [
    '/auth/login',
    '/auth/registration',
  ].includes(location.pathname);

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vh',

      backgroundImage: isBackgroundPage ? `url(${background_butterfly})` : 'none',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: "no-repeat",
      
    }}>
      <Header />
      <Routes>
        <Route path="/profile/event" element={<OrganizedEvent />} />
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registration" element={<RegistrationForm />} />
        <Route path="/list" element={<EventsList />} />
        <Route path="/list/event-info" element={<EventInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/dev/list-pages" element={<DevListPages />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;





// import React, { useState } from 'react';

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Стили
//   const styles = {
//     page: {
//       margin: 0,
//       padding: 0,
//       fontFamily: 'sans-serif',
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       textAlign: 'center',
//       backgroundColor: '#f4f4f4',
//       transition: 'all 0.3s ease',
//     },
//     button: {
//       padding: '10px 20px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       marginTop: '20px',
//       border: 'none',
//       backgroundColor: '#007bff',
//       color: 'white',
//       borderRadius: '5px',
//     },
//     modalOverlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.3)',
//       backdropFilter: 'blur(6px)', // 🔥 Размытие фона
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//     },
//     modal: {
//       backgroundColor: 'rgba(255, 255, 255, 0.95)',
//       padding: '30px',
//       borderRadius: '8px',
//       width: '300px',
//       boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//       textAlign: 'center',
//     },
//   };

//   return (
//     <div style={styles.page}>
//       <h1>Добро пожаловать на главную страницу</h1>
//       <p>Это пример React-страницы с модальным окном.</p>

//       <button style={styles.button} onClick={() => setIsModalOpen(true)}>
//         Открыть окно
//       </button>

//       {isModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modal}>
//             <h2>Информационное окно</h2>
//             <p>Привет! Это модальное окно. Фон за ним теперь размыт.</p>
//             <button style={styles.button} onClick={() => setIsModalOpen(false)}>
//               Закрыть
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;