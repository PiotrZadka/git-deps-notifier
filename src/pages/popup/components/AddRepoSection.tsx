import { Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";

interface AddRepoSectionProps {
	onAdd: (repoUrl: string) => void;
	repos: string[];
}

export const AddRepoSection = ({ onAdd, repos }: AddRepoSectionProps) => {
	const [repoUrl, setRepoUrl] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const isValidGitHubUrl = (url: string) => {
		const githubUrlRegex =
			/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
		return githubUrlRegex.test(url);
	};

	const handleAddClick = () => {
		const trimmedRepoUrl = repoUrl.trim();
		if (!trimmedRepoUrl) {
			setErrorMessage("Repository URL cannot be empty.");
			return;
		}

		if (!isValidGitHubUrl(trimmedRepoUrl)) {
			setErrorMessage("Please enter a valid GitHub repository URL.");
			return;
		}

		if (repos.includes(trimmedRepoUrl)) {
			setErrorMessage("This repository is already in the list.");
			return;
		}

		setErrorMessage("");
		onAdd(trimmedRepoUrl);
		setRepoUrl("");
	};

	return (
		<Box>
			{errorMessage && (
				<Typography color="error" variant="body2">
					{errorMessage}
				</Typography>
			)}
			<Box display="flex" alignItems="center" gap={2}>
				<Box flexGrow={1}>
					<TextField
						id="outlined-basic"
						placeholder="Git repo url"
						variant="outlined"
						value={repoUrl}
						onChange={(e) => setRepoUrl(e.target.value)}
						error={!!errorMessage}
						fullWidth
					/>
				</Box>
				<Button variant="contained" onClick={handleAddClick}>
					Add
				</Button>
			</Box>
		</Box>
	);
};
