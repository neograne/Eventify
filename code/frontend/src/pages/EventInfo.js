import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <nav>
      <h1>Информация о мероприятии</h1>
      <ul>
        <ul>
          <li><h3>Дата время место</h3></li>
          <li><h3>Спикеры расписание</h3></li>
          <li><h3>Регистрация на меро</h3></li>
        </ul>

        <li><h3>Учет участников</h3></li>
        <li><h3>Сбор обратной связи</h3></li>
      </ul>


      
    </nav>
  );
};

const styles = {
  container: {

  },
}

export default Events;