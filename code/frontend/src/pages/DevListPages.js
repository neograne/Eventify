import React from 'react';
import { Link } from 'react-router-dom';

const DevListPages = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/">/</Link></li>
            <li><Link to="/auth/login">/auth/login</Link></li>
            <li><Link to="/auth/reg">/auth/reg</Link></li>
            <li><Link to="/about">/about</Link></li>
            <li><Link to="/list">/list</Link></li>
            <li><Link to="/list/event-info">/list/event-info</Link></li>
            
        </ul>
    </nav>
  );
};

const styles = {
  container: {

  },
}

export default DevListPages;