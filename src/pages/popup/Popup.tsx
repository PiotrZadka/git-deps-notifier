import { useState } from 'react';
import '@pages/popup/index.css';
import { Repositories } from './views/Repositories';
import { Login } from './views/Login';
import { LandingPageContext } from '../../context/landing-page-context';
import { useGitAuth } from './hooks/useGitAuth';

export const Popup = () => {
  const [selectedRepo, setSelectedRepo] = useState('');
  const { isAuthenticated } = useGitAuth();

  return (
    <>
      <LandingPageContext.Provider value={{ selectedRepo, setSelectedRepo }}>
        {!isAuthenticated ? <Login /> : <Repositories />}
      </LandingPageContext.Provider>
    </>
  );
};
