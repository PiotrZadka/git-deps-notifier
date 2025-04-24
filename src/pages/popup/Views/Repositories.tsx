import { RepoListSection } from "../components/RepoListSection";
import { AddRepo } from "../components/AddRepo";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";
import axios from "axios";

export const Repositories = () => {
	const [repos, setRepos] = useState<string[]>([]);
	const { selectedRepo, setSelectedRepo } = useContext(LandingPageContext);

	const isAddRepoSectionVisible = !selectedRepo;

	const addRepo = (repoUrl: string): boolean => {
		if (repos.includes(repoUrl)) {
			return false;
		}
		const updatedRepos = [...repos, repoUrl];
		setRepos(updatedRepos);
		return true;
	};

	const removeRepo = (repoToRemove: string) => {
		const updatedRepos = repos.filter((repo) => repo !== repoToRemove);
		setRepos(updatedRepos);
	};

	return (
		<Box sx={{ m: 2 }}>
			<RepoListSection
				repos={repos}
				onRemove={removeRepo}
				selectedRepo={selectedRepo}
				setSelectedRepo={setSelectedRepo}
			/>
			{isAddRepoSectionVisible && <AddRepo onAdd={addRepo} repos={repos} />}
		</Box>
	);
};
