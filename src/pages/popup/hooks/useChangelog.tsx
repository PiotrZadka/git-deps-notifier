import { getRelease } from "../data/getRelease";
import { getDepUrl } from "../data/getDepUrl";
import { useEffect, useState } from "react";

type ChangelogData = {
  body?: string;
  [key: string]: any;
};

export const useChangelog = (depName: string) => {
  const [latestReleaseChangelog, setLatestReleaseChangelog] = useState<
    ChangelogData[]
  >([]);
  const [repositoryUrl, setRepositoryUrl] = useState("");

  useEffect(() => {
    const fetchDepRepoUrl = async () => {
      const { repositoryUrl } = await getDepUrl(depName);
      setRepositoryUrl(repositoryUrl);
    };
    fetchDepRepoUrl();
  }, [depName]);

  useEffect(() => {
    if (!repositoryUrl) return;
    const fetchLatestRelease = async () => {
      const data = await getRelease(repositoryUrl);
      // Ensure body is string or undefined, not null
      const normalized = Array.isArray(data)
        ? data.map((item) => ({
            ...item,
            body: item.body ?? undefined,
          }))
        : [];
      setLatestReleaseChangelog(normalized);
    };
    fetchLatestRelease();
  }, [repositoryUrl]);

  return {
    changelogData: latestReleaseChangelog[0],
    repositoryUrl,
  };
};
