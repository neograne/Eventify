import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from "../components/Calendar";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaUniversity, FaUsers, FaEye, FaEyeSlash } from 'react-icons/fa';

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
    avatar: '',
    full_name: '',
    email: '',
    birth_date: '',
    institute: '',
    study_group: ''
  });
  const [editable, setEditable] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await fetch('http://localhost:8000/check_auth', {
          credentials: 'include'
        });

        if (!authResponse.ok) {
          navigate('/auth/registration');
          return;
        }

        const authData = await authResponse.json();
        if (!authData.isAuthenticated) {
          navigate('/auth/registration');
          return;
        }

        const userResponse = await fetch('http://localhost:8000/get_user_info', {
          credentials: 'include'
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUserData({
          avatar: userData.avatar || 'https://via.placeholder.com/150',
          full_name: userData.full_name || '',
          email: userData.email || '',
          birth_date: userData.birth_date || '',
          institute: userData.institute || '',
          study_group: userData.study_group || ''
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

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

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/update_user_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          full_name: userData.full_name,
          email: userData.email,
          birth_date: userData.birth_date,
          institute: userData.institute,
          study_group: userData.study_group,
          avatar: userData.avatar,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Ошибка при сохранении: ${errorData.message || 'Что-то пошло не так'}`);
        return;
      }

      setEditable(false);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      alert('Произошла ошибка при сохранении. Проверьте соединение с сервером.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    },
    sidebar: {
      width: '300px',
      backgroundColor: '#20516F',
      padding: '30px 20px',
      color: 'white',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    },
    content: {
      flex: 1,
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '30px 0 0 0',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    },
    tabButton: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '15px 20px',
      marginBottom: '10px',
      border: 'none',
      borderRadius: '10px',
      backgroundColor: 'transparent',
      color: 'white',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s',
      fontSize: '18px',
      fontWeight: '500'
    },
    activeTab: {
      backgroundColor: 'rgba(255,255,255,0.2)'
    },
    sectionTitle: {
      color: '#20516F',
      fontSize: '32px',
      marginBottom: '30px',
      paddingBottom: '15px',
      borderBottom: '2px solid #20516F'
    },
    formGroup: {
      marginBottom: '25px',
      position: 'relative'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: '600',
      color: '#20516F',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      padding: '15px 15px 15px 45px',
      border: '2px solid #ccc',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      height: '60px'
    },
    icon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#20516F',
      fontSize: '18px'
    },
    button: {
      backgroundColor: '#20516F',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'background-color 0.3s',
      marginTop: '20px'
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
      border: '3px solid #20516F'
    },
    changeAvatarButton: {
      backgroundColor: '#20516F',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500'
    },
    eventItem: {
      padding: '20px',
      marginBottom: '20px',
      border: '2px solid #20516F',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9'
    }
  };

  const renderContent = () => {
    if (loading) return <div>Загрузка...</div>;

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
        return <div><h2 style={styles.sectionTitle}>Календарь мероприятий</h2><Calendar events={[]}/></div>;
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
      <div style={styles.sidebar}>
        <h2 style={{textAlign: 'center', marginBottom: '40px', fontSize: '24px'}}>Мой профиль</h2>
        
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'info' && styles.activeTab)
          }}
          onClick={() => setActiveTab('info')}
        >
          Личная информация
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
      
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

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
      <FaUser style={styles.icon} />
      <input
        type="text"
        name="full_name"
        value={userData.full_name}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
        placeholder="Введите ваше ФИО"
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Почта</label>
      <FaEnvelope style={styles.icon} />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
        placeholder="Введите вашу почту"
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Дата рождения</label>
      <FaCalendarAlt style={styles.icon} />
      <input
        type="date"
        name="birth_date"
        value={userData.birth_date}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Институт</label>
      <FaUniversity style={styles.icon} />
      <input
        type="text"
        name="institute"
        value={userData.institute}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
        placeholder="Введите ваш институт"
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Группа</label>
      <FaUsers style={styles.icon} />
      <input
        type="text"
        name="study_group"
        value={userData.study_group}
        onChange={handleInputChange}
        style={styles.input}
        disabled={!editable}
        placeholder="Введите вашу группу"
      />
    </div>

    {editable ? (
      <button 
        style={styles.button}
        onClick={handleSave}
      >
        Сохранить изменения
      </button>
    ) : (
      <button 
        style={styles.button}
        onClick={() => setEditable(true)}
      >
        Редактировать профиль
      </button>
    )}
  </div>
);

const OrganizedEvents = ({ styles }) => (
  <div>
    <h2 style={styles.sectionTitle}>Организованные мероприятия</h2>
    <div style={styles.eventItem}>
      <h3 style={{ marginTop: 0, color: '#20516F' }}>Конференция по React</h3>
      <p><strong>Дата:</strong> 15.04.2024</p>
      <p><strong>Статус:</strong> Активно</p>
    </div>
    <div style={styles.eventItem}>
      <h3 style={{ marginTop: 0, color: '#20516F' }}>Воркшоп по Node.js</h3>
      <p><strong>Дата:</strong> 22.04.2024</p>
      <p><strong>Статус:</strong> Завершено</p>
    </div>
  </div>
);

const AttendedEvents = ({ styles }) => (
  <div>
    <h2 style={styles.sectionTitle}>Посещенные мероприятия</h2>
    <div style={styles.eventItem}>
      <h3 style={{ marginTop: 0, color: '#20516F' }}>Введение в Python</h3>
      <p><strong>Дата:</strong> 01.03.2024</p>
      <p><strong>Организатор:</strong> IT-клуб</p>
    </div>
    <div style={styles.eventItem}>
      <h3 style={{ marginTop: 0, color: '#20516F' }}>Основы Docker</h3>
      <p><strong>Дата:</strong> 08.03.2024</p>
      <p><strong>Организатор:</strong> DevTeam</p>
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
        <label style={styles.label}>Картинка мероприятия</label>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '250px',
          border: '2px dashed #20516F',
          borderRadius: '10px',
          marginBottom: '20px',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9'
        }}>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={{
              maxWidth: '100%',
              maxHeight: '230px',
              borderRadius: '8px'
            }} />
          ) : (
            <>
              <p style={{color: '#20516F', marginBottom: '15px'}}>Перетащите сюда изображение или кликните для выбора</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="imageUpload"
              />
              <label htmlFor="imageUpload" style={{ 
                backgroundColor: '#20516F',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
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
          style={{...styles.input, paddingLeft: '15px'}}
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
          style={{...styles.input, paddingLeft: '15px'}}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Организатор</label>
        <input
          type="text"
          name="organizer"
          value={eventData.organizer}
          onChange={handleInputChange}
          style={{...styles.input, paddingLeft: '15px'}}
          placeholder="Ваше имя или название организации"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Описание</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            minHeight: '150px',
            fontSize: '16px'
          }}
          placeholder="Подробное описание мероприятия..."
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Уровень мероприятия</label>
        <select
          name="level"
          value={eventData.level}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#20516F'
          }}
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
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#20516F'
          }}
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
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={eventData.newTag}
            onChange={(e) => handleInputChange({
              target: {
                name: 'newTag',
                value: e.target.value
              }
            })}
            style={{ 
              ...styles.input, 
              flex: 1,
              paddingLeft: '15px',
              height: '50px'
            }}
            placeholder="Добавьте тег"
          />
          <button 
            type="button" 
            onClick={handleTagAdd}
            style={{
              backgroundColor: '#20516F',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0 20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Добавить
          </button>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {eventData.tags.map(tag => (
            <div key={tag} style={{
              backgroundColor: '#e9ecef',
              padding: '8px 15px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              color: '#20516F'
            }}>
              {tag}
              <span 
                style={{
                  marginLeft: '8px',
                  cursor: 'pointer',
                  color: '#20516F'
                }}
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
        style={{
          ...styles.button,
          width: '100%',
          padding: '18px',
          fontSize: '20px'
        }}
      >
        Создать мероприятие
      </button>
    </div>
  );
};

export default ProfilePage;