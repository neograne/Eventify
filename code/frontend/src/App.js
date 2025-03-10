import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import NewCompetition from './pages/NewMeetingForm';
import Login from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import AddSpeakerForm from './pages/AddSpeakerForm';
import Main from './pages/Main';


const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<RegistrationForm />} />
          <Route path="/new-meeting" element={<NewCompetition />} />
          <Route path="/new-meeting/add-speaker" element={<AddSpeakerForm />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
