import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search'; // Предполагается, что Search в отдельном файле
import Calendar from '../components/Calendar'; // Предполагается, что Search в отдельном файле

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const eventCount = 100;
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Имитация запроса к серверу
        const mockEvents = Array.from({ length: eventCount }, (_, i) => ({
          id: i,
          name: `Мероприятие ${i}`,
          date: `2023-05-${15 + Math.floor(i / 3)}`,
          time: `${10 + (i % 5)}:00`,
          location: `Конференц-зал ${(i % 3) + 1}`,
          speakers: [
            `Спикер ${i}A`,
            i % 2 === 0 ? `Спикер ${i}B` : null
          ].filter(Boolean)
        }));

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAllEvents(mockEvents);
        setDisplayedEvents(mockEvents.slice(0, visibleCount));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const loadMore = () => {
    const newCount = visibleCount + 5;
    setVisibleCount(newCount);
    setDisplayedEvents(allEvents.slice(0, newCount));
  };

  const handleSearch = (term) => {
    const filtered = allEvents.filter(event => 
      event.name.toLowerCase().includes(term.toLowerCase()) ||
      event.location.toLowerCase().includes(term.toLowerCase()) ||
      event.speakers.some(speaker => 
        speaker.toLowerCase().includes(term.toLowerCase())
      )
    );
    
    setDisplayedEvents(filtered.slice(0, visibleCount));
  };

  if (loading) return <div>Загрузка мероприятий...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (allEvents.length === 0) return <div>Нет доступных мероприятий</div>;

  const hasMore = allEvents.length > visibleCount && 
                 displayedEvents.length === visibleCount;

  return (
    <nav style={styles.container}>
      <h2>Список мероприятий</h2>
      
      <Search events={allEvents} onSearch={handleSearch} />
      
      <ul style={styles.list}>
        {displayedEvents.map(event => (
          <li key={event.id} style={styles.listItem}>
            <Link to={`/list/event-info?id=${event.id}`} style={styles.link}>
              {event.name}
            </Link>
            <div style={styles.eventDetails}>
              <h3>Дата: {event.date}, время: {event.time}, место: {event.location}</h3>
              <h3>Спикеры: {event.speakers.join(', ')}</h3>
              <h3>Регистрация на мероприятие</h3>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button onClick={loadMore} style={styles.loadMoreButton}>
          Еще мероприятия
        </button>
      )}

      <h2 style={styles.calendarHeader}>Календарь мероприятий</h2>
      <Calendar events={allEvents} />
    </nav>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px'
  },
  link: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2c3e50',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '10px'
  },
  eventDetails: {
    marginLeft: '20px'
  },
  loadMoreButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  },
  calendarHeader: {
    marginTop: '40px'
  }
};

export default Events;