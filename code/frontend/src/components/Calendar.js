import React, { useState } from 'react';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  // Функции для работы с датами без date-fns
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  // Создаем массив дней для отображения в календаре
  const renderDays = () => {
    const days = [];
    const blanks = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Корректировка для начала с понедельника

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < blanks; i++) {
      days.push(<div key={`blank-${i}`} style={styles.otherMonthDay}></div>);
    }

    // Ячейки текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const hasEvents = dayEvents.length > 0;
      
      days.push(
        <div 
          key={`day-${day}`}
          style={{
            ...styles.dayCell,
            ...(hasEvents && styles.hasEventsDay)
          }}
          onMouseEnter={() => setHoveredDate(day)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {day}
          
          {hoveredDate === day && hasEvents && (
            <div style={styles.tooltip}>
              <h4 style={styles.tooltipTitle}>Мероприятия {day}.{month + 1}.{year}</h4>
              {dayEvents.map(event => (
                <div key={event.id} style={styles.tooltipEvent}>
                  <strong>{event.name}</strong>
                  <div>Время: {event.time}</div>
                  <div>Место: {event.location}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div style={styles.calendar}>
      <div style={styles.header}>
        <button onClick={prevMonth} style={styles.navButton}>&lt;</button>
        <h2 style={styles.monthTitle}>
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} style={styles.navButton}>&gt;</button>
      </div>

      <div style={styles.daysGrid}>
        {dayNames.map(day => (
          <div key={day} style={styles.dayHeader}>{day}</div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

// Стили остаются теми же, что и в предыдущем примере
const styles = {
  calendar: {
    maxWidth: '800px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  monthTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  navButton: {
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
  },
  dayHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '10px 0',
  },
  dayCell: {
    position: 'relative',
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #eee',
    borderRadius: '4px',
    minHeight: '40px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  otherMonthDay: {
    color: '#aaa',
    backgroundColor: '#f9f9f9',
  },
  hasEventsDay: {
    backgroundColor: '#e6f7ff',
    fontWeight: 'bold',
  },
  tooltip: {
    position: 'absolute',
    zIndex: 100,
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '10px',
  },
  tooltipTitle: {
    margin: '0 0 10px 0',
    color: '#333',
  },
  tooltipEvent: {
    marginBottom: '10px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '3px',
  },
};

export default Calendar;