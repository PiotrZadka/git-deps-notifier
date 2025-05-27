// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

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
  console.log("current", current);
  console.log("latest", latest);
  const isNew = latest.localeCompare(current, undefined, { numeric: true }) > 0;

  return isNew ? (
    <UpdateIcon sx={{ color: "orange" }} />
  ) : (
    <CheckCircleIcon sx={{ color: "green" }} />
  );
};

export const removeSemanticVersioning = (version: string) =>
  version.replace(/^[^\d]*/, "");

export const sanitizeRepoString = (repo: string) => {
  let sanitized = repo.split("#")[0];
  if (sanitized.endsWith(".git")) {
    sanitized = sanitized.slice(0, -4);
  }
  return sanitized;
};

export const cleanRepositoryUrl = (url: string) => {
  if (url?.startsWith("git+")) {
    url = url.replace("git+", "");
  }
  if (url?.startsWith("git")) {
    url = url.replace("git", "https");
  }
  if (url?.endsWith(".git")) {
    url = url.slice(0, -4);
  }
  return url;
};
