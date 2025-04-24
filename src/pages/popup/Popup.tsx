import { useState, useEffect } from "react";
import "@pages/popup/index.css";
import { Repositories } from "./Views/Repositories";
import { Login } from "./Views/Login";
import { LandingPageContext } from "../../context/landing-page-context";

export const Popup = () => {
	const [selectedRepo, setSelectedRepo] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<LandingPageContext.Provider value={{ selectedRepo, setSelectedRepo }}>
				{!isLoggedIn ? <Login /> : <Repositories />}
			</LandingPageContext.Provider>
		</>
	);
};
