import React from 'react';
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
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registration" element={<RegistrationForm />} />
        <Route path="/list" element={<EventsList />} />
        <Route path="/list/event-info" element={<EventInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/dev/list-pages" element={<DevListPages />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
