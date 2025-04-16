import { Octokit } from "octokit";

export const getRelease = async (depUrl: string) => {
	const [owner, repo] = depUrl.split("/").slice(-2);
	const authToken = import.meta.env.VITE_GITHUB_TOKEN;
	const octokit = new Octokit({
		auth: authToken,
	});

	const { data } = await octokit.request("GET /repos/{owner}/{repo}/releases", {
		owner,
		repo,
	});
	console.log(data[0]);
	return data.map((release) => ({
		tagName: release.tag_name,
		name: release.name,
		body: release.body,
		publishedAt: release.published_at,
		htmlUrl: release.html_url,
	}));
};
