const EventCard = ({ event }) => {
  // Определяем градиенты для каждого масштаба
  const gradients = {
    'Университетский': 'linear-gradient(45deg, rgb(224, 255, 103), rgb(255, 157, 157))',
    'Институтский': 'linear-gradient(45deg, rgb(198, 255, 242), rgb(18, 198, 204))',
    'Общажный': 'linear-gradient(45deg, rgb(243, 255, 86), rgb(54, 255, 213))',
    'Локальный': 'linear-gradient(45deg, #fddb92, #d1fdff)',
  };

  // Выбираем градиент по масштабу события, по умолчанию - университетский
  const gradient = gradients[event.event_scale] || gradients['Университетский'];

  // Ensure tags is an array, default to empty array if undefined or null
  const tags = Array.isArray(event.tags) ? event.tags : [];

  return (
    <div style={{ ...styles.card, background: gradient }}>
        <img src={event.event_image || 'https://via.placeholder.com/150'} alt={event.event_title} style={styles.image} />
        <div style={styles.content}>
          <h2 style={styles.title}>{event.event_title}</h2>
          <div style={styles.meta}>
            <span>Дата: <span style={{ fontWeight: 'bold' }}>{event.event_date}</span></span>
            <span>Время: <span style={{ fontWeight: 'bold' }}>{event.event_time || 'Не указано'}</span></span>
          </div>
          <div style={styles.details}>
            <p><strong>Масштаб:</strong> {event.event_scale || 'Не указано'}</p>
            <p><strong>Направление:</strong> {event.event_direction || 'Не указано'}</p>
            <p><strong>Формат:</strong> {event.event_format || 'Не указано'}</p>
          </div>
          <div style={styles.tags}>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <button key={index} style={styles.tagButton}>
                  {tag}
                </button>
              ))
            ) : (
              <p style={{ color: '#737373', fontSize: '12px' }}>Теги отсутствуют</p>
            )}
          </div>
        </div>
    </div>
  );
};

// Стили без фиксированного background
const styles = {
  card: {
    fontFamily: "Montserrat",
    width: "575px",
    height: "300px",
    display: 'flex',
    borderRadius: '42px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '42.4px',
    marginRight: '16px',
    objectFit: 'cover',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '370px',
    height: '100px',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '11px',
    borderBottom: "1px solid black",
    marginTop: "0",
    color: "#20516F",
  },
  meta: {
    display: 'flex',
    gap: '16px',
    marginBottom: '8px',
    fontSize: "20px",
    color: "black"
  },
  details: {
    marginBottom: '16px',
    fontSize: "14px",
    color: "#737373",
    marginLeft: "-160px",
    marginTop: "25px",
  },
  tags: {
    display: 'flex',
    gap: '20px',
    marginLeft: "-160px",
    height: "25px"
  },
  tagButton: {
    backgroundColor: '#FFF',
    color: '#333',
    border: '1px solid #333',
    borderRadius: '20px',
    padding: '5px 10px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

export default EventCard;