import { RepoListSection } from './RepoListSection';
import { AddRepoSection } from './AddRepoSection';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

export const LandingPage = () => {
  const [repos, setRepos] = useState<string[]>([]);

  useEffect(() => {
    const storedRepos = localStorage.getItem('repoUrl');
    if (storedRepos) {
      setRepos(JSON.parse(storedRepos));
    }
  }, []);

  const addRepo = (repoUrl: string): boolean => {
    if (repos.includes(repoUrl)) {
      return false; // Repo already exists
    }
    const updatedRepos = [...repos, repoUrl];
    setRepos(updatedRepos);
    localStorage.setItem('repoUrl', JSON.stringify(updatedRepos));
    return true; // Repo added successfully
  };

  const removeRepo = (repoToRemove: string) => {
    const updatedRepos = repos.filter((repo) => repo !== repoToRemove);
    setRepos(updatedRepos);
    localStorage.setItem('repoUrl', JSON.stringify(updatedRepos));
  };

  return (
    <Box sx={{ m: 2 }}>
      <RepoListSection repos={repos} onRemove={removeRepo} />
      <AddRepoSection onAdd={addRepo} repos={repos} />
    </Box>
  );
};
