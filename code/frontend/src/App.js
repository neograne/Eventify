import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import NewMeeting from './pages/NewMeeting/NewMeeting';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/new-meeting" element={<NewMeeting />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
