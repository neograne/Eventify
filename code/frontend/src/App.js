import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import Main from './pages/Main';
import DevListPages from './pages/DevListPages';
import EventsList from './pages/EventsList';
import EventInfo from './pages/EventInfo';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Это гарантирует, что контейнер будет как минимум высотой с viewport
      }}>
        <Header />
        <main style={{
          flex: 1 // Это заставляет main занимать всё доступное пространство
        }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/registration" element={<RegistrationForm />} />
            <Route path="/list" element={<EventsList />} />
            <Route path="/list/event-info" element={<EventInfo />} />
            <Route path="/dev/list-pages" element={<DevListPages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;