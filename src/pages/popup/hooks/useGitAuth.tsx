import { useState, useEffect } from "react";
import axios from "axios";

declare const browser: {
  identity: {
    getRedirectURL: () => string;
    launchWebAuthFlow: (
      details: { url: string; interactive: boolean },
      callback: (redirectUrl?: string) => void
    ) => void;
  };
};

console.log("hi");

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

  const exchangeCodeForToken = async (code: string): Promise<void> => {
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
      } else {
        console.error("Failed to retrieve access token");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error exchanging code for token:", error.response.data);
      } else {
        console.error("Error exchanging code for token:", error);
      }
    }
  };

  const handleLogin = () => {
    if (navigator.userAgent.includes("Firefox")) {
      const authUrl = `${AUTH_URL}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

      browser.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true,
        },
        async (redirectUrl: string | undefined) => {
          if (!redirectUrl) {
            console.error("Authentication failed");
            return;
          }
          const urlParams = new URLSearchParams(new URL(redirectUrl).search);
          const code = urlParams.get("code");
          if (code) {
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
            console.error(
              "Authentication failed",
              chrome.runtime.lastError || "No redirect URL returned",
              { authUrl: AUTH_URL }
            );
            return;
          }
          const urlParams = new URLSearchParams(new URL(redirectUrl).search);
          const code = urlParams.get("code");

          if (code) {
            setIsAuthenticated(true);
            await exchangeCodeForToken(code);
          } else {
            console.error(
              "Authorization code not found in redirect URL. Redirect URL:",
              redirectUrl
            );
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
