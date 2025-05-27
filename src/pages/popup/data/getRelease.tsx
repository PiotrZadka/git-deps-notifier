// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import { Octokit } from "octokit";
import { sanitizeRepoString } from "@src/utils/utils";

export const getRelease = async (depUrl: string) => {
  const sanitizedUrl = sanitizeRepoString(depUrl);
  const [owner, repo] = sanitizedUrl.split("/").slice(-2);

  const authToken = localStorage.getItem("apiToken");

  const octokit = new Octokit({
    auth: authToken,
  });

  const { data } = await octokit.request("GET /repos/{owner}/{repo}/releases", {
    owner,
    repo,
  });
  return data.map((release) => ({
    tagName: release.tag_name,
    name: release.name,
    body: release.body,
    publishedAt: release.published_at,
    htmlUrl: release.html_url,
  }));
};
