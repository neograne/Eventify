import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div style={styles.card}>
      <img src={event.image} alt={event.name} style={styles.image} />
      <div style={styles.content}>
        <h2 style={styles.title}>{event.name}</h2>
        <div style={styles.meta}>
          <span>Дата: {event.date}</span>
          <span>Время: {event.time}</span>
        </div>
        <div style={styles.details}>
          <p><strong>Масштаб:</strong> {event.scale}</p>
          <p><strong>Направление:</strong> {event.direction}</p>
          <p><strong>Формат:</strong> {event.format}</p>
        </div>
        <div style={styles.tags}>
          {event.tags.map((tag, index) => (
            <button key={index} style={styles.tagButton}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    backgroundColor: '#FFD54F', // Оранжевый фон
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '16px',
    objectFit: 'cover',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  meta: {
    display: 'flex',
    gap: '16px',
    marginBottom: '8px',
  },
  details: {
    marginBottom: '16px',
  },
  tags: {
    display: 'flex',
    gap: '8px',
  },
  tagButton: {
    backgroundColor: '#FFF',
    color: '#333',
    border: '1px solid #333',
    borderRadius: '20px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

export default EventCard;