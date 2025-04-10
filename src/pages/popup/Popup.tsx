import { useState } from "react";
import "@pages/popup/index.css";
import { LandingPage } from "./components/LandingPage";
import { LandingPageContext } from "../../context/landing-page-context";

export const Popup = () => {
	const [selectedRepo, setSelectedRepo] = useState("");

	return (
		<>
			<LandingPageContext.Provider value={{ selectedRepo, setSelectedRepo }}>
				<LandingPage />
			</LandingPageContext.Provider>
		</>
	);
};
