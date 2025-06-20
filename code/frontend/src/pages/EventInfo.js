import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Events = () => {
  const [event, setEvent] = useState(null);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/event/${eventId}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleJoinEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8000/join_event/${eventId}`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        alert('Вы успешно записаны на мероприятие!');
        // Refresh event data to show updated participants
        const updatedEvent = await (await fetch(`http://localhost:8000/event/${eventId}`)).json();
        setEvent(updatedEvent);
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${errorData.detail || 'Не удалось записаться'}`);
      }
    } catch (error) {
      console.error('Error joining event:', error);
      alert('Произошла ошибка при записи');
    }
  };

  if (!event) {
    return <div style={styles.loading}>Загрузка...</div>;
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка скопирована!');
  };

  return (
    <div style={styles.overlay}>
      <nav style={styles.container}>
        <div style={styles.wrapper}>
          <img
            src={event.event_image}
            alt={event.event_title}
            style={styles.img}
          />
          {/* Right section with event details */}
          <div style={styles.rightSection}>
            {/* Event Title */}
            <h1 style={styles.title}>{event.event_title}</h1>

            {/* Description */}
            <div style={styles.description}>
              <h2 style={styles.descriptionTitle}>Описание</h2>
              <p style={styles.descriptionText}>{event.event_description}</p>
            </div>

            {/* Event Details in Two Columns */}
            <div style={styles.detailsContainer}>
              <div style={styles.column}>
                <p style={styles.detailItem}><strong>Дата проведения:</strong> {event.event_date}</p>
                <p style={styles.detailItem}><strong>Время проведения:</strong> {event.event_time}</p>
                <p style={styles.detailItem}>
                  <strong>Место проведения:</strong> {event.event_location}
                </p>
              </div>
              <div style={styles.column}>
                <p style={styles.detailItem}><strong>Масштаб:</strong> {event.event_scale}</p>
                <p style={styles.detailItem}>
                  <strong>Направление:</strong> {event.event_direction}
                </p>
                <p style={styles.detailItem}><strong>Организатор:</strong> {event.event_organizer}</p>
              </div>
            </div>

            {/* Event Type and Tags */}
            <div style={styles.tagsContainer}>
              <p style={styles.detailItem}><strong>Формат:</strong> {event.event_type}</p>
              <div style={styles.tagsList}>
                <strong>Теги:</strong>
                {event.tags.map((tag) => (
                  <span key={tag} style={styles.tagItem}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonsContainer}>
              <button
                onClick={copyLink}
                style={styles.copyButton}
              >
                Скопировать ссылку
              </button>
              <button onClick={handleJoinEvent} style={styles.joinButton}>Я ПОЙДУ!</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    fontFamily: 'Montserrat',
    height: '850px',
    width: '1650px',
    border: '3px solid #20516F',
    borderRadius: '40px',
    boxSizing: 'border-box',
    padding: '30px',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  wrapper: {
    display: 'flex',
    height: '100%',
  },
  img: {
    width: '500px',
    height: '500px',
    borderRadius: '40px',
    objectFit: 'cover',
    border: '3px solid #20516F',
  },
  rightSection: {
    width: '70%',
    padding: '20px',
    position: 'relative',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#20516F',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    marginBottom: '20px',
  },
  descriptionTitle: {
    fontSize: '20px',
    weight: '500',
    color: '#737373',
  },
  descriptionText: {
    maxWidth: '1060px',
    minHeight: '380px',
    fontSize: '16px',
    color: '#333',
    border: '1px solid #20516F',
    borderRadius: '20px',
  },
  detailsContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  column: {
    width: '50%',
  },
  detailItem: {
    margin: '5px 0',
  },
  tagsContainer: {
    marginBottom: '20px',
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
  tagItem: {
    padding: '5px 10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    fontSize: '14px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  copyButton: {
    backgroundColor: '#e0e0e0',
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  joinButton: {
    background: 'linear-gradient(to right, #ffcc00, #ff6600)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  loading: {
    color: '#20516F',
    fontFamily: 'Montserrat',
  },
};

export default Events;