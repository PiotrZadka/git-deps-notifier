import { useState, useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
const EXTENSION_ID = import.meta.env.VITE_CHROME_EXTENSION_ID;
const REDIRECT_URI = `https://${EXTENSION_ID}.chromiumapp.org`;
const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;

export const useGitAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const handleLogin = () => {
    chrome.identity.launchWebAuthFlow(
      {
        url: AUTH_URL,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error('Authentication failed', chrome.runtime.lastError);
          return;
        }
        const urlParams = new URLSearchParams(new URL(redirectUrl).search);
        const code = urlParams.get('code');

        if (code) {
          console.log('Authorization code:', code);
          setIsAuthenticated(true);
        } else {
          console.error('Authorization code not found in redirect URL.');
        }
      }
    );
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
  };
};
