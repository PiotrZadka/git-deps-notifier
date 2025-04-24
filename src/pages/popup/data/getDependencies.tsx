import { Octokit } from "octokit";
import { Buffer } from "buffer";
import type { DependencyListItemProps } from "@src/types";
import { removeSemanticVersioning } from "@src/utils/utils";

export const getDependencies = async (
	repoUrl: string,
	depFile: string,
): Promise<{
	dependencies: DependencyListItemProps[];
	devDependencies: DependencyListItemProps[];
}> => {
	const [owner, repo] = repoUrl.split("/").slice(-2);
	const authToken = localStorage.getItem("apiToken");

	const octokit = new Octokit({
		auth: authToken,
	});

	const { data } = await octokit.request(
		"GET /repos/{owner}/{repo}/contents/{path}",
		{
			owner,
			repo,
			path: depFile,
		},
	);

	if (data?.content) {
		const content = Buffer.from(data.content, data.encoding).toString("utf-8");
		const parsedContent = JSON.parse(content);

		const dependencies: DependencyListItemProps[] = Object.entries(
			parsedContent.dependencies || {},
		).map(([name, current]) => ({
			name,
			current: removeSemanticVersioning(String(current)),
		}));
		const devDependencies: DependencyListItemProps[] = Object.entries(
			parsedContent.devDependencies || {},
		).map(([name, current]) => ({
			name,
			current: removeSemanticVersioning(String(current)),
		}));
		return { dependencies, devDependencies };
	}

	return { dependencies: [], devDependencies: [] };
};

export const getRepoMetadata = async (repoUrl: string) => {
	const [owner, repo] = repoUrl.split("/").slice(-2);
	const authToken = localStorage.getItem("apiToken");
	console.log(authToken);

	const octokit = new Octokit({ auth: authToken });

	const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
		owner,
		repo,
	});

	return data;
};

export const getRepoFiles = async (repoUrl: string, path: string = "") => {
	const [owner, repo] = repoUrl.split("/").slice(-2);
	const authToken = localStorage.getItem("apiToken");

	const octokit = new Octokit({ auth: authToken });

	const { data } = await octokit.request(
		"GET /repos/{owner}/{repo}/contents/{path}",
		{
			owner,
			repo,
			path,
		},
	);

	return data;
};
