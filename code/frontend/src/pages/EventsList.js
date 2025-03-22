import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <nav>
        <h2>Список мероприятий</h2>
        <ul>
            <li>
              <Link to="/list/event-info?id=0">Мероприятие 0</Link>
              <nav>
                <h1>Информация о мероприятии</h1>
                
                <ul>
                  <li><h3>Дата время место</h3></li>
                  <li><h3>Спикеры расписание</h3></li>
                  <li><h3>Регистрация на меро</h3></li>
                </ul>
              </nav>  
            </li>
            
            <li>
              <Link to="/list/event-info?id=1">Мероприятие 1</Link>
              <nav>
                <h1>Информация о мероприятии</h1>
                
                <ul>
                  <li><h3>Дата время место</h3></li>
                  <li><h3>Спикеры расписание</h3></li>
                  <li><h3>Регистрация на меро</h3></li>
                </ul>
              </nav>  
            </li>

            <li>
              <Link to="/list/event-info?id=2">Мероприятие 2</Link>
              <nav>
                <h1>Информация о мероприятии</h1>
                
                <ul>
                  <li><h3>Дата время место</h3></li>
                  <li><h3>Спикеры расписание</h3></li>
                  <li><h3>Регистрация на меро</h3></li>
                </ul>
              </nav>  
            </li>
            
            <li>
              <Link to="/list/event-info?id=3">Мероприятие 3</Link>
              <nav>
                <h1>Информация о мероприятии</h1>
                
                <ul>
                  <li><h3>Дата время место</h3></li>
                  <li><h3>Спикеры расписание</h3></li>
                  <li><h3>Регистрация на меро</h3></li>
                </ul>
              </nav>  
            </li>
        </ul>

        <h2>Календарь мероприятий</h2>
    </nav>
  );
};

const styles = {
  container: {

  },
}

export default Events;