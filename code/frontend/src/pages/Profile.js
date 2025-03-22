import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <nav>
      <h1>Профиль</h1>
      <ul>
        <li><h3>Инфа в профиле (имя фамилия и т.д.)</h3></li>
        <li><h3>Организованные меро</h3></li>
        <li><h3>Меро, в которых приянял участие</h3></li>
      </ul>
    </nav>
  );
};

const styles = {
  container: {

  },
}

export default Profile;