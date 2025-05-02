import { useState, useEffect } from "react";
import axios from "axios";

declare const browser: any;

const CLIENT_ID = navigator.userAgent.includes("Firefox")
  ? import.meta.env.VITE_OAUTH_FIREFOX_CLIENT_ID
  : import.meta.env.VITE_OAUTH_CHROME_CLIENT_ID;

const EXTENSION_ID = navigator.userAgent.includes("Firefox")
  ? import.meta.env.VITE_FIREFOX_EXTENSION_ID
  : import.meta.env.VITE_CHROME_EXTENSION_ID;

const CLIENT_SECRET = navigator.userAgent.includes("Firefox")
  ? import.meta.env.VITE_OAUTH_FIREFOX_CLIENT_SECRET
  : import.meta.env.VITE_OAUTH_CHROME_CLIENT_SECRET;

const REDIRECT_URI = navigator.userAgent.includes("Firefox")
  ? browser.identity.getRedirectURL()
  : `https://${EXTENSION_ID}.chromiumapp.org`;

const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=user,repo`;

export const useGitAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem("apiToken", access_token);
        console.log("API token stored successfully");
      } else {
        console.error("Failed to retrieve access token");
      }
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  };

  const handleLogin = () => {
    console.log(REDIRECT_URI);
    if (navigator.userAgent.includes("Firefox")) {
      const authUrl = `${AUTH_URL}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

      browser.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true,
        },
        async (redirectUrl) => {
          if (!redirectUrl) {
            console.error("Authentication failed");
            return;
          }
          const urlParams = new URLSearchParams(new URL(redirectUrl).search);
          const code = urlParams.get("code");
          if (code) {
            console.log("Authorization code:", code);
            setIsAuthenticated(true);
            await exchangeCodeForToken(code);
          } else {
            console.error("Authorization code not found in redirect URL.");
          }
        }
      );
    } else {
      chrome.identity.launchWebAuthFlow(
        {
          url: AUTH_URL,
          interactive: true,
        },
        async (redirectUrl) => {
          if (chrome.runtime.lastError || !redirectUrl) {
            console.error("Authentication failed", chrome.runtime.lastError);
            return;
          }
          const urlParams = new URLSearchParams(new URL(redirectUrl).search);
          const code = urlParams.get("code");

          if (code) {
            console.log("Authorization code:", code);
            setIsAuthenticated(true);
            await exchangeCodeForToken(code);
          } else {
            console.error("Authorization code not found in redirect URL.");
          }
        }
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
  };
};
