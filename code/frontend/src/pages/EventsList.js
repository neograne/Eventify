import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filters, setFilters] = useState({
    scale: 'all',
    direction: 'all',
    format: 'all',
    tags: '',
    date: '',
    location: '',
    search: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/events', { credentials: 'include' });
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        setAllEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const enteredTags = filters.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    return allEvents.filter(event => {
      const scaleMatch = filters.scale === 'all' || event.event_scale === filters.scale;
      const directionMatch = filters.direction === 'all' || event.event_direction === filters.direction;
      const formatMatch = filters.format === 'all' || event.event_format === filters.format;
      const tagsMatch = enteredTags.length === 0 || enteredTags.some(tag => event.event_tags?.includes(tag));
      const dateMatch = !filters.date || event.event_date === filters.date;
      const locationMatch = !filters.location || (event.event_location && event.event_location.toLowerCase().includes(filters.location.toLowerCase()));
      const searchMatch = !filters.search || (event.event_title && event.event_title.toLowerCase().includes(filters.search.toLowerCase()));
      return scaleMatch && directionMatch && formatMatch && tagsMatch && dateMatch && locationMatch && searchMatch;
    });
  }, [allEvents, filters]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = filteredEvents.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (loading) return <div>Загрузка мероприятий...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (allEvents.length === 0) return <div>Нет доступных мероприятий</div>;

  return (
    <nav style={styles.container}>
      <h2>Список мероприятий</h2>
      <div style={styles.layout}>
        {/* Фильтры слева */}
        <div style={styles.filters}>
          <select
            value={filters.scale}
            onChange={(e) => setFilters(prev => ({ ...prev, scale: e.target.value }))}
            style={styles.select}
          >
            <option value="all">Все масштабы</option>
            <option value="университетский">Университетский</option>
            <option value="Институтский">Институтский</option>
            <option value="Локальный">Локальный</option>
            <option value="Общажный">Общажный</option>
          </select>

          <select
            value={filters.direction}
            onChange={(e) => setFilters(prev => ({ ...prev, direction: e.target.value }))}
            style={styles.select}
          >
            <option value="all">Все направления</option>
            <option value="Развлекательное">Развлекательное</option>
            <option value="Научное">Научное</option>
            <option value="Образовательное">Образовательное</option>
            <option value="Спортивное">Спортивное</option>
            <option value="Деловое">Деловое</option>
            <option value="Культурное">Культурное</option>
            <option value="Социальное">Социальное</option>
            <option value="Другое">Другое</option>
          </select>

          <select
            value={filters.format}
            onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value }))}
            style={styles.select}
          >
            <option value="all">Все форматы</option>
            <option value="Лекция">Лекция</option>
            <option value="Интерактивный квест">Интерактивный квест</option>
            <option value="Мастер-класс">Мастер-класс</option>
            <option value="Воркшоп">Воркшоп</option>
            <option value="Конференция">Конференция</option>
            <option value="Выставка">Выставка</option>
            <option value="Концерт">Концерт</option>
            <option value="Спортивное мероприятие">Спортивное мероприятие</option>
            <option value="Другое">Другое</option>
          </select>

          <input
            type="text"
            placeholder="Теги (через запятую)"
            value={filters.tags}
            onChange={(e) => setFilters(prev => ({ ...prev, tags: e.target.value }))}
            style={styles.input}
          />

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Место проведения"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            style={styles.input}
          />
        </div>

        {/* Основной контент */}
        <div style={styles.mainContent}>
          <input
            type="text"
            placeholder="Поиск мероприятий..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            style={styles.searchInput}
          />

          <ul style={styles.list}>
            {displayedEvents.map(event => (
              <li key={event.event_id} style={styles.listItem}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/event?id=${event.event_id}`}>
                  <EventCard event={event} />
                </Link>
              </li>
            ))}
          </ul>

          {hasMore && (
            <button onClick={loadMore} style={styles.loadMoreButton}>
              Еще мероприятия
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  container: {
    padding: '20px',
    paddingTop: '0px',
    width: '1710px',
    margin: '0 auto',
  },
  layout: {
    display: 'flex',
    gap: '20px'
  },
  filters: {
    width: '350px',
    height: '700px',
    border: '1px solid black',
    overflow: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#f9f9f9'
  },
  mainContent: {
    width: '1300px',
    height: '750px',
    border: '1px solid black',
    overflow: 'auto',
    padding: '10px'
  },
  list: {
    listStyle: 'none',
    padding: '0',
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
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }
};

export default Events;