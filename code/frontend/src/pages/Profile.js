import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    organizer: '',
    description: '',
    level: 'университетский',
    type: 'развлекательное',
    tags: [],
    newTag: ''
  });
  const [userData, setUserData] = useState({
    avatar: 'https://via.placeholder.com/150',
    fullName: 'Иванов Иван Иванович',
    email: '',
    password: 'password123',
    birthDate: '1990-01-01',
    institute: 'Институт компьютерных технологий',
    group: 'КТ-123'
  });
  const [editable, setEditable] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/check-auth', {
          credentials: 'include'
        });

        if (!response.ok) {
          navigate('/auth/registration');
          return;
        }

        const data = await response.json();
        if (!data.isAuthenticated) {
          navigate('/auth/registration');
        } else {
          setAuthChecked(true);
          // Можно обновить данные пользователя из data.user
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/auth/registration');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!authChecked) {
    return <div>Проверка авторизации...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
 };

  const handleTagAdd = () => {
    if (eventData.newTag && !eventData.tags.includes(eventData.newTag)) {
      setEventData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag],
        newTag: ''
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setEventData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setEditable(false);
    // Здесь можно добавить логику сохранения данных
    console.log('Данные сохранены:', userData);
  };

  // Стили
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    },
    content: {
      flex: 1,
      padding: '30px',
      backgroundColor: '#ffffff'
    },
    tabButton: {
      display: 'block',
      width: '100%',
      padding: '12px 15px',
      marginBottom: '10px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#e9ecef',
      color: '#495057',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s',
      fontSize: '16px'
    },
    activeTab: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    sectionTitle: {
      color: '#343a40',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #dee2e6'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#495057'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '16px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      minHeight: '150px',
      fontSize: '16px'
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: 'white'
    },
    tagContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '10px'
    },
    tag: {
      backgroundColor: '#e9ecef',
      padding: '5px 10px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center'
    },
    removeTag: {
      marginLeft: '5px',
      cursor: 'pointer',
      color: '#6c757d'
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.3s'
    },
    imageUpload: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      border: '2px dashed #ced4da',
      borderRadius: '8px',
      marginBottom: '20px',
      cursor: 'pointer',
      backgroundColor: '#f8f9fa'
    },
    imagePreview: {
      maxWidth: '100%',
      maxHeight: '180px',
      borderRadius: '6px'
    },
    avatarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px'
    },
    avatar: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '15px',
      border: '3px solid #007bff'
    },
    changeAvatarButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      padding: '8px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'info':
        return <UserInfo 
          styles={styles} 
          userData={userData} 
          editable={editable}
          handleInputChange={handleUserInputChange}
          handleAvatarChange={handleAvatarChange}
          handleSave={handleSave}
          setEditable={setEditable}
        />;
      case 'organized':
        return <OrganizedEvents styles={styles} />;
      case 'attended':
        return <AttendedEvents styles={styles} />;
      case 'calendar':
        return <EventsCalendar styles={styles} />;
        case 'create':
          return <CreateEvent 
            styles={styles} 
            eventData={eventData}
            handleInputChange={handleInputChange}
            handleTagAdd={handleTagAdd}
            handleTagRemove={handleTagRemove}
          />;
      default:
        return <UserInfo 
          styles={styles} 
          userData={userData} 
          editable={editable}
          handleInputChange={handleUserInputChange}
          handleAvatarChange={handleAvatarChange}
          handleSave={handleSave}
          setEditable={setEditable}
        />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Боковое меню */}
      <div style={styles.sidebar}>
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'info' && styles.activeTab)
          }}
          onClick={() => setActiveTab('info')}
        >
          Информация
        </button>
        
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'organized' && styles.activeTab)
          }}
          onClick={() => setActiveTab('organized')}
        >
          Организованные
        </button>
        
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'attended' && styles.activeTab)
          }}
          onClick={() => setActiveTab('attended')}
        >
          Посещенные
        </button>
        
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'calendar' && styles.activeTab)
          }}
          onClick={() => setActiveTab('calendar')}
        >
          Календарь
        </button>
        
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'create' && styles.activeTab)
          }}
          onClick={() => setActiveTab('create')}
        >
          Создать
        </button>
      </div>
      
      {/* Основное содержимое */}
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

// Компоненты для каждого раздела
const UserInfo = ({ styles, userData, editable, handleInputChange, handleAvatarChange, handleSave, setEditable }) => (
  <div>
    <h2 style={styles.sectionTitle}>Личная информация</h2>
    
    <div style={styles.avatarContainer}>
      <img 
        src={userData.avatar} 
        alt="Аватар" 
        style={styles.avatar}
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleAvatarChange}
        style={{ display: 'none' }}
        id="avatarUpload"
        disabled={!editable}
      />
      <label 
        htmlFor="avatarUpload" 
        style={{
          ...styles.changeAvatarButton,
          opacity: editable ? 1 : 0.6,
          cursor: editable ? 'pointer' : 'not-allowed'
        }}
      >
        Изменить аватар
      </label>
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>ФИО</label>
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />

    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Почта</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Пароль</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Дата рождения</label>
      <input
        type="date"
        name="birthDate"
        value={userData.birthDate}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Институт</label>
      <input
        type="text"
        name="institute"
        value={userData.institute}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Группа</label>
      <input
        type="text"
        name="group"
        value={userData.group}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />
    </div>

    {editable ? (
      <button 
        style={styles.saveButton}
        onClick={handleSave}
      >
        Сохранить
      </button>
    ) : (
      <button 
        style={styles.editButton}
        onClick={() => setEditable(true)}
      >
        Редактировать
      </button>
    )}
  </div>
);

const OrganizedEvents = ({ styles }) => (
  <div>
    <h2 style={styles.sectionTitle}>Организованные мероприятия</h2>
    <div style={{ ...styles.eventItem, padding: '15px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Конференция по React</h3>
      <p>Дата: 15.04.2024</p>
      <p>Статус: Активно</p>
    </div>
    <div style={{ ...styles.eventItem, padding: '15px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Воркшоп по Node.js</h3>
      <p>Дата: 22.04.2024</p>
      <p>Статус: Завершено</p>
    </div>
  </div>
);

const AttendedEvents = ({ styles }) => (
  <div>
    <h2 style={styles.sectionTitle}>Посещенные мероприятия</h2>
    <div style={{ ...styles.eventItem, padding: '15px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Введение в Python</h3>
      <p>Дата: 01.03.2024</p>
      <p>Организатор: IT-клуб</p>
    </div>
    <div style={{ ...styles.eventItem, padding: '15px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Основы Docker</h3>
      <p>Дата: 08.03.2024</p>
      <p>Организатор: DevTeam</p>
    </div>
  </div>
);

const EventsCalendar = ({ styles }) => (
  <div>
    <h2 style={styles.sectionTitle}>Календарь мероприятий</h2>
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      textAlign: 'center',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      Здесь будет интерактивный календарь
    </div>
  </div>
);

const CreateEvent = ({ styles, eventData, handleInputChange, handleTagAdd, handleTagRemove }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 style={styles.sectionTitle}>Создание нового мероприятия</h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Картинка и фон карточки</label>
        <div style={styles.imageUpload}>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
          ) : (
            <>
              <p>Перетащите сюда изображение или кликните для выбора</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="imageUpload"
              />
              <label htmlFor="imageUpload" style={{ 
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Выбрать файл
              </label>
            </>
          )}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Название мероприятия</label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Введите название"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Дата мероприятия</label>
        <input
          type="datetime-local"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Организатор</label>
        <input
          type="text"
          name="organizer"
          value={eventData.organizer}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Ваше имя или название организации"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Описание</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          style={styles.textarea}
          placeholder="Подробное описание мероприятия..."
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Уровень/Класс</label>
        <select
          name="level"
          value={eventData.level}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="университетский">Университетский</option>
          <option value="институтский">Институтский</option>
          <option value="локальный">Локальный</option>
          <option value="городской">Городской</option>
          <option value="федеральный">Федеральный</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Тип мероприятия</label>
        <select
          name="type"
          value={eventData.type}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="развлекательное">Развлекательное</option>
          <option value="научное">Научное</option>
          <option value="образовательное">Образовательное</option>
          <option value="спортивное">Спортивное</option>
          <option value="деловое">Деловое</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Теги</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={eventData.newTag}
            onChange={(e) => handleInputChange({
              target: {
                name: 'newTag',
                value: e.target.value
              }
            })}
            style={{ ...styles.input, flex: 1 }}
            placeholder="Добавьте тег"
          />
          <button 
            type="button" 
            onClick={handleTagAdd}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0 15px',
              cursor: 'pointer'
            }}
          >
            Добавить
          </button>
        </div>
        <div style={styles.tagContainer}>
          {eventData.tags.map(tag => (
            <div key={tag} style={styles.tag}>
              {tag}
              <span 
                style={styles.removeTag}
                onClick={() => handleTagRemove(tag)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        style={styles.submitButton}
      >
        Создать мероприятие
      </button>
    </div>
  );
};

export default ProfilePage;