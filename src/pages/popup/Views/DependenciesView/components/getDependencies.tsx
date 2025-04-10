import { Octokit } from "octokit";
import { Buffer } from "buffer";

export const getDependencies = async (repoUrl: string, depFile: string) => {
	const [owner, repo] = repoUrl.split("/").slice(-2);
	const authToken = import.meta.env.VITE_GITHUB_TOKEN;

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
		const dependencies = Object.entries(parsedContent.dependencies || {}).map(
			([name, current]) => ({ name, current }),
		);
		const devDependencies = Object.entries(
			parsedContent.devDependencies || {},
		).map(([name, current]) => ({ name, current }));
		return { dependencies, devDependencies };
	}

	return { dependencies: [], devDependencies: [] };
};
