import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const getEventIdFromLocation = (location) => {
  const params = new URLSearchParams(location.search);
  return params.get('id');
};

const OrganizedEvent = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = getEventIdFromLocation(location);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const authRes = await fetch("http://localhost:8000/check_auth", {
          credentials: "include",
        });
        const authData = await authRes.json();
        if (!authData.isAuthenticated) {
          navigate("/auth/login");
          return;
        }
        const userId = authData.user.user_id;

        const eventsRes = await fetch("http://localhost:8000/organized_events", {
          credentials: "include",
        });
        const events = await eventsRes.json();

        if (!Array.isArray(events)) {
          navigate("/profile");
          return;
        }

        const eventData = events.find(ev => 
          String(ev.event_id || ev.id) === String(eventId)
        );

        if (!eventData) {
          navigate("/profile");
          return;
        }

        setEvent(eventData);
        setOwner(eventData.owner_id === userId);
      } catch (e) {
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [navigate, location, eventId]);

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить это мероприятие?")) return;

    try {
      const response = await fetch(`http://localhost:8000/delete_event/${event.event_id}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        alert("Мероприятие успешно удалено");
        navigate("/profile");
      } else {
        alert("Ошибка при удалении мероприятия");
      }
    } catch (error) {
      console.error("Ошибка при удалении мероприятия:", error);
      alert("Произошла ошибка при удалении мероприятия");
    }
  };

  const handleParticipants = async () => {
    try {
      const response = await fetch(`http://localhost:8000/event_participants/${event.event_id}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setParticipants(data);
        setShowModal(true);
      } else {
        alert("Ошибка при получении списка участников");
      }
    } catch (error) {
      console.error("Ошибка при получении участников:", error);
      alert("Произошла ошибка при получении списка участников");
    }
  };

  const handleReport = () => {
    const eventId = event.event_id || event.id;
    navigate(`/profile/event/report?id=${eventId}`);
  };

  const handleCopyLink = () => {
    if (event) {
      const link = `${window.location.origin}/profile/event?id=${event.event_id || event.id}`;
      navigator.clipboard.writeText(link);
      alert("Ссылка скопирована!");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setParticipants([]);
  };

  if (loading) return <div style={styles.loading}>Загрузка...</div>;
  if (!event) return <div>Мероприятие не найдено</div>;

  return (
    <div style={styles.overlay}>
      <nav style={styles.container}>
        <div style={styles.wrapper}>
          <img
            src={event.event_image}
            alt={event.event_title}
            style={styles.img}
          />
          <div style={styles.rightSection}>
            <h1 style={styles.title}>{event.event_title}</h1>
            <div style={styles.description}>
              <h2 style={styles.descriptionTitle}>Описание</h2>
              <p style={styles.descriptionText}>{event.event_description}</p>
            </div>
            <div style={styles.detailsContainer}>
              <div style={styles.column}>
                <p style={styles.detailItem}><strong>Дата проведения:</strong> {event.event_date}</p>
                <p style={styles.detailItem}><strong>Время проведения:</strong> {event.event_time}</p>
                <p style={styles.detailItem}>
                  <strong>Место проведения:</strong> {event.event_location || "Не указано"}
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
            <div style={styles.tagsContainer}>
              <p style={styles.detailItem}><strong>Формат:</strong> {event.event_type}</p>
              <div style={styles.tagsList}>
                <strong>Теги:</strong>
                {Array.isArray(event.tags) ? event.tags.map((tag) => (
                  <span key={tag} style={styles.tagItem}>
                    {tag}
                  </span>
                )) : <span>Нет тегов</span>}
              </div>
            </div>
            {owner && (
              <div style={styles.buttonsContainer}>
                <button onClick={handleDelete} style={styles.button}>Удалить</button>
                <button onClick={handleParticipants} style={styles.button}>Участники</button>
                <button onClick={handleReport} style={styles.button}>Отчёт</button>
                <button onClick={handleCopyLink} style={styles.button}>Ссылка на мероприятие</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Участники мероприятия</h2>
            {participants.length > 0 ? (
              <ul style={styles.participantList}>
                {participants.map((participant, index) => (
                  <li key={index} style={styles.participantItem}>
                    {participant.full_name || "Неизвестный участник"} 
                    {participant.institute && ` (${participant.institute})`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет зарегистрированных участников</p>
            )}
            <button onClick={closeModal} style={styles.closeButton}>Закрыть</button>
          </div>
        </div>
      )}
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
    fontWeight: '500',
    color: '#737373',
  },
  descriptionText: {
    maxWidth: '1060px',
    minHeight: '380px',
    fontSize: '16px',
    color: '#333',
    border: '1px solid #20516F',
    borderRadius: '20px',
    padding: '10px',
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
  button: {
    marginRight: '12px',
    padding: '8px 18px',
    borderRadius: '5px',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  participantList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0',
  },
  participantItem: {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  closeButton: {
    padding: '8px 18px',
    borderRadius: '5px',
    border: 'none',
    background: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  loading: {
    color: '#20516F',
    fontFamily: 'Montserrat',
  },
};

export default OrganizedEvent;