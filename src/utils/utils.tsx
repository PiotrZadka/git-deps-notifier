export const isValidGitHubUrl = (url: string) => {
  const githubUrlRegex =
    /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
  return githubUrlRegex.test(url);
};

export const formatRepoName = (repoUrl: string): string | null => {
  return repoUrl.split('/').pop() || '';
};
