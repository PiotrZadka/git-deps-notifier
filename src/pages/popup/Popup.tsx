import { useState, useEffect } from 'react';
import '@pages/popup/index.css';
import { Repositories } from './Views/Repositories';
import { Login } from './Views/Login';
import { LandingPageContext } from '../../context/landing-page-context';

export const Popup = () => {
  const [selectedRepo, setSelectedRepo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('github_access_token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <>
      <LandingPageContext.Provider value={{ selectedRepo, setSelectedRepo }}>
        {!isLoggedIn ? <Login /> : <Repositories />}
      </LandingPageContext.Provider>
    </>
  );
};
