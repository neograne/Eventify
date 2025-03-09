import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/login">Регистрация</Link>
        </li>
        <li>
          <Link to="/new-meeting">Создать митинг</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;