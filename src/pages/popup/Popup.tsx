import { useState } from "react";
import "@pages/popup/index.css";
import { Repositories } from "./Views/Repositories";
import { Login } from "./Views/Login";
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
