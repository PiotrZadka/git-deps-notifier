import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const isValidGitHubUrl = (url: string) => {
	const githubUrlRegex =
		/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
	return githubUrlRegex.test(url);
};

export const formatRepoName = (repoUrl: string): string | null => {
	return repoUrl.split("/").pop() || "";
};

export const renderDependencyIcon = (current: string, latest: string) => {
	const isNew = latest.localeCompare(current, undefined, { numeric: true }) > 0;

	return isNew ? (
		<UpdateIcon sx={{ color: "orange" }} />
	) : (
		<CheckCircleIcon sx={{ color: "green" }} />
	);
};

export const removeSemanticVersioning = (version: string) =>
	version.replace(/^[^\d]*/, "");
