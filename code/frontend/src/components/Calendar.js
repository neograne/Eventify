import React, { useState } from 'react';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Функции для работы с датами
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setHoveredDate(null);
  };

  // Создаем массив дней для отображения в календаре
  const renderDays = () => {
    const days = [];
    const blanks = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < blanks; i++) {
      days.push(<div key={`blank-${i}`} style={styles.otherMonthDay}></div>);
    }

    // Ячейки текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const hasEvents = dayEvents.length > 0;
      const eventCount = dayEvents.length;
      const isSelected = selectedDate === day;
      
      days.push(
        <div 
          key={`day-${day}`}
          style={{
            ...styles.dayCell,
            ...(hasEvents && styles.hasEventsDay),
            ...(isSelected && styles.selectedDay)
          }}
          onClick={() => handleDateClick(day)}
          onMouseEnter={() => setHoveredDate(day)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div style={styles.dayNumber}>{day}</div>
          {hasEvents && (
            <div style={styles.eventBadge}>
              {eventCount}
            </div>
          )}
          
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

  const renderSelectedDateInfo = () => {
    if (!selectedDate) return null;
    
    const dayEvents = getEventsForDate(selectedDate);
    const dateStr = `${selectedDate}.${month + 1}.${year}`;

    return (
      <div style={styles.selectedDateContainer}>
        <h3 style={styles.selectedDateTitle}>Мероприятия на {dateStr}</h3>
        {dayEvents.length > 0 ? (
          <div style={styles.eventsList}>
            {dayEvents.map(event => (
              <div key={event.id} style={styles.eventItem}>
                <h4 style={styles.eventName}>{event.name}</h4>
                <div>Время: {event.time}</div>
                <div>Место: {event.location}</div>
                {event.speakers?.length > 0 && (
                  <div>Спикеры: {event.speakers.join(', ')}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noEventsMessage}>
            На эту дату мероприятий не запланировано
          </div>
        )}
      </div>
    );
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

      {renderSelectedDateInfo()}
    </div>
  );
};

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
    gap: '10px',
    marginBottom: '20px',
  },
  dayHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '10px 0',
  },
  dayCell: {
    position: 'relative',
    padding: '8px',
    textAlign: 'center',
    border: '1px solid #eee',
    borderRadius: '4px',
    minHeight: '60px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ':hover': {
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
  },
  selectedDay: {
    backgroundColor: '#e6f7ff',
    border: '1px solid #1890ff',
  },
  dayNumber: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  eventBadge: {
    marginTop: '4px',
    backgroundColor: '#1890ff',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  otherMonthDay: {
    color: '#aaa',
    backgroundColor: '#f9f9f9',
    minHeight: '60px',
  },
  hasEventsDay: {
    backgroundColor: '#f0f9ff',
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
  selectedDateContainer: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  selectedDateTitle: {
    marginTop: 0,
    color: '#333',
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  eventItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #eee',
  },
  eventName: {
    margin: '0 0 5px 0',
    color: '#1890ff',
  },
  noEventsMessage: {
    padding: '10px',
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
};

export default Calendar;