import { useState } from 'react';
import '@pages/popup/index.css';
import { Repositories } from './Views/RepositoriesView/Repositories';
import { LandingPageContext } from '../../context/landing-page-context';

export const Popup = () => {
  const [selectedRepo, setSelectedRepo] = useState('');

  return (
    <>
      <LandingPageContext.Provider value={{ selectedRepo, setSelectedRepo }}>
        <Repositories />
      </LandingPageContext.Provider>
    </>
  );
};
