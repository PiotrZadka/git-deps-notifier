import { getRelease } from './data/getRelease';
import { getDepUrl } from './data/getDepUrl';
import { useEffect, useState } from 'react';

export const useChangelog = (depName: string) => {
  const [latestReleaseChangelog, setLatestReleaseChangelog] = useState([]);
  const [repositoryUrl, setRepositoryUrl] = useState('');

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
      setLatestReleaseChangelog(data);
    };
    fetchLatestRelease();
  }, [repositoryUrl]);

  return {
    changelogData: latestReleaseChangelog[0],
  };
};
