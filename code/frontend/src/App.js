import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import NewCompetition from './pages/NewMeetingForm';
import Login from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import AddSpeakerForm from './pages/AddSpeakerForm';
import Main from './pages/Main';
import DevListPages from './pages/DevListPages';
import EventsList from './pages/EventsList';
import EventInfo from './pages/EventInfo';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<div><Header/> <Main /> <Footer/></div>} />
            <Route path="/profile" element={<div><Header/> <Profile /> <Footer/></div>} />
            <Route path="/auth/login" element={<div><Header/> <Login /> <Footer/></div>} />
            <Route path="/auth/registration" element={<div><Header/> <RegistrationForm /> <Footer/></div>} />
            <Route path="/new-meeting" element={<div><Header/> <NewCompetition /> <Footer/></div>} />
            <Route path="/new-meeting/add-speaker" element={<div><Header/> <AddSpeakerForm /> <Footer/></div>} />
            <Route path="/list" element={<div><Header/> <EventsList /> <Footer/></div>} />
            <Route path="/list/event-info" element={<div><Header/> <EventInfo /> <Footer/></div>} />
            
            <Route path="/dev/list-pages" element={<DevListPages />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}


export default App;
