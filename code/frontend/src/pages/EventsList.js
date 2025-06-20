import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Calendar from '../components/Calendar';
import EventCard from '../components/EventCard';

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const [filters, setFilters] = useState({
    type: '',
    date: '',
    tags: [],
    scale: '',
    direction: '',
    format: '',
    location: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/events', { credentials: 'include' });
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        setAllEvents(data);
        setDisplayedEvents(data.slice(0, visibleCount));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const loadMore = () => {
    const newCount = visibleCount + 6;
    setVisibleCount(newCount);
    setDisplayedEvents(allEvents.slice(0, newCount));
  };

  const handleSearch = (term, newFilters = {}) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const filtered = allEvents.filter(event => {
      const matchesTerm = (event.name || '').toLowerCase().includes(term.toLowerCase()) ||
                          (event.tags || []).some(tag => (tag || '').toLowerCase().includes(term.toLowerCase()));
      
      const matchesType = updatedFilters.type ? event.type === updatedFilters.type : true;
      const matchesDate = updatedFilters.date ? event.date === updatedFilters.date : true;
      const matchesTags = updatedFilters.tags.length > 0 
                        ? updatedFilters.tags.every(tag => (event.tags || []).includes(tag)) 
                        : true;
      const matchesScale = updatedFilters.scale ? event.scale === updatedFilters.scale : true;
      const matchesDirection = updatedFilters.direction ? event.direction === updatedFilters.direction : true;
      const matchesFormat = updatedFilters.format ? event.format === updatedFilters.format : true;
      const matchesLocation = updatedFilters.location 
                            ? (event.location || '').toLowerCase().includes(updatedFilters.location.toLowerCase()) 
                            : true;

      return matchesTerm && matchesType && matchesDate && matchesTags && 
             matchesScale && matchesDirection && matchesFormat && matchesLocation;
    });

    setDisplayedEvents(filtered.slice(0, visibleCount));
  };

  if (loading) return <div>Загрузка мероприятий...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (allEvents.length === 0) return <div>Нет доступных мероприятий</div>;

  const hasMore = allEvents.length > visibleCount && displayedEvents.length === visibleCount;

  return (
    <nav style={styles.container}>
      <h2>Список мероприятий</h2>
      <Search events={allEvents} onSearch={handleSearch} />

      {/* Фильтры */}
      <div style={styles.filters}>
        {/* Масштаб */}
        <select onChange={(e) => handleSearch('', { scale: e.target.value })}>
          <option value="">Все масштабы</option>
          <option value="университетский">Университетский</option>
          <option value="Институтский">Институтский</option>
          <option value="large">Локальный</option>
          <option value="large">Общажный</option>
        </select>

        {/* Направление */}
        <select onChange={(e) => handleSearch('', { direction: e.target.value })}>
          <option value="">Все направления</option>
          <option value="tech">Технологии</option>
          <option value="business">Бизнес</option>
          <option value="art">Искусство</option>
        </select>

        {/* Формат */}
        <select onChange={(e) => handleSearch('', { format: e.target.value })}>
          <option value="">Все форматы</option>
          <option value="online">Онлайн</option>
          <option value="offline">Оффлайн</option>
        </select>

        {/* Теги (ввод через запятую) */}
        <input
          type="text"
          placeholder="Теги (через запятую)"
          value={filters.tags.join(', ')}
          onChange={(e) => {
            const tags = e.target.value
              .split(',')
              .map(tag => tag.trim())
              .filter(tag => tag);
            handleSearch('', { tags });
          }}
          style={styles.input}
        />

        {/* Дата */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleSearch('', { date: e.target.value })}
          style={styles.input}
        />

        {/* Место проведения */}
        <input 
          type="text" 
          placeholder="Место проведения" 
          value={filters.location}
          onChange={(e) => handleSearch('', { location: e.target.value })}
          style={styles.input}
        />
      </div>

      <ul style={styles.list}>
        {displayedEvents.map(event => (
          <li key={event.id} style={styles.listItem}>
            <EventCard event={event} />
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
    width: '900px',
    margin: '0 auto'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  listItem: {
    paddingBottom: '20px'
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
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minWidth: '150px'
  }
};

export default Events;