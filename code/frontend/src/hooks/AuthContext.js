import { useNavigate } from 'react-router-dom';
import React from "react";
/**
 * Хук для проверки авторизации пользователя
 * @returns {Function} Функция для проверки авторизации
 */
export const useAuthCheck = () => {
  const navigate = useNavigate();

  /**
   * Проверяет авторизацию пользователя
   * @param {boolean} redirectIfAuth - Перенаправлять ли на /profile если пользователь авторизован
   * @param {boolean} redirectIfNotAuth - Перенаправлять ли на /auth если пользователь не авторизован
   * @returns {Promise<boolean>} Возвращает true если пользователь авторизован
   */
  const checkAuth = async (redirectIfAuth = true, redirectIfNotAuth = false) => {
    try {
      const response = await fetch('http://localhost:8000/check_auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await response.json();
        console.log("lol");
      if (data.isAuthenticated) {
        if (redirectIfAuth) {
          navigate('/profile');
        }
        return true;
      } else {
        if (redirectIfNotAuth) {
          navigate('/auth/registration');
        }
        return false;
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      if (redirectIfNotAuth) {
        navigate('/auth/registration');
      }
      return false;
    }
  };

  return checkAuth;
};

/**
 * Хук для использования проверки авторизации в компонентах
 */
export const useAuth = () => {
  const checkAuth = useAuthCheck();

  // Проверка при монтировании компонента
  const useEffectAuthCheck = (redirectIfAuth = true, redirectIfNotAuth = false) => {
    React.useEffect(() => {
      checkAuth(redirectIfAuth, redirectIfNotAuth);
    }, [checkAuth, redirectIfAuth, redirectIfNotAuth]);
  };

  return {
    checkAuth,        // Функция для ручной проверки
    useEffectAuthCheck // Хук для автоматической проверки при монтировании
  };
};