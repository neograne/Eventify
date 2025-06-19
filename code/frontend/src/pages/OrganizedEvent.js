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
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = getEventIdFromLocation(location);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Проверка авторизации
        const authRes = await fetch("http://localhost:8000/check_auth", {
          credentials: "include",
        });
        const authData = await authRes.json();
        if (!authData.isAuthenticated) {
          navigate("/auth/login");
          return;
        }
        const userId = authData.user.user_id;

        // Получаем список мероприятий
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
    alert("Удаление мероприятия (реализовать API)");
  };

  const handleParticipants = () => {
    alert("Показать участников (реализовать)");
  };

  const handleReport = () => {
    alert("Показать отчёт (реализовать)");
  };

  const handleCopyLink = () => {
    if (event) {
      const link = `${window.location.origin}/profile/event?id=${event.event_id || event.id}`;
      navigator.clipboard.writeText(link);
      alert("Ссылка скопирована!");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!event) return <div>Мероприятие не найдено</div>;

  return (
    <div style={styles.container}>
      <h1>Информация о мероприятии</h1>
      <div><strong>Название:</strong> {event.event_title}</div>
      <div><strong>Дата:</strong> {event.event_date}</div>
      <div><strong>Время:</strong> {event.event_time}</div>
      <div><strong>Организатор:</strong> {event.event_organizer}</div>
      <div><strong>Описание:</strong> {event.event_description}</div>
      <div><strong>Масштаб:</strong> {event.event_scale}</div>
      <div><strong>Тип:</strong> {event.event_type}</div>
      <div><strong>Теги:</strong> {Array.isArray(event.tags) ? event.tags.join(", ") : event.tags}</div>
      {owner && (
        <div style={{ margin: "20px 0" }}>
          <button onClick={handleDelete} style={styles.button}>Удалить</button>
          <button onClick={handleParticipants} style={styles.button}>Участники</button>
          <button onClick={handleReport} style={styles.button}>Отчёт</button>
          <button onClick={handleCopyLink} style={styles.button}>Ссылка на мероприятие</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 24,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  button: {
    marginRight: 12,
    padding: "8px 18px",
    borderRadius: 5,
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },
};

export default OrganizedEvent;