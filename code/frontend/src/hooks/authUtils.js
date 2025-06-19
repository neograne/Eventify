import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Функция для проверки авторизации пользователя
export const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:8000/check_auth', {
      method: 'GET',
      credentials: 'include', // Отправка куки
    });
    const data = await response.json();
    return data.isAuthenticated === true;
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error);
    return false;
  }
};

// Обработчик для кнопки "вход"
export const handleEntranceClick = async (navigate) => {
  const isAuth = await checkAuth();
  if (isAuth) {
    navigate('/profile');
  } else {
    navigate('/auth/login');
  }
};

// Хук для защиты страницы профиля
export const useProtectProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        navigate('/auth/login');
      }
    };
    verifyAuth();
  }, [navigate]);
};

// Хук для перенаправления с страницы входа, если пользователь уже авторизован
export const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkIfAuth = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        navigate('/profile');
      }
    };
    checkIfAuth();
  }, [navigate]);
};