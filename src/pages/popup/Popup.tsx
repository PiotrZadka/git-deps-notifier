// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import { useState } from "react";
import "@pages/popup/index.css";
import { Repositories } from "./views/Repositories";
import { Login } from "./views/Login";
import { LandingPageContext } from "../../context/landing-page-context";
import { useGitAuth } from "./hooks/useGitAuth";

export const Popup = () => {
  const [selectedRepo, setSelectedRepo] = useState("");
  const { isAuthenticated, handleLogin, handleLogout } = useGitAuth();

  return (
    <LandingPageContext.Provider value={{ selectedRepo, setSelectedRepo }}>
      {!isAuthenticated ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <Repositories handleLogout={handleLogout} />
      )}
    </LandingPageContext.Provider>
  );
};
