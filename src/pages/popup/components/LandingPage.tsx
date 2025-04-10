import { RepoListSection } from './RepoListSection';
import { AddRepoSection } from './AddRepoSection';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { LandingPageContext } from '../../../context/landing-page-context';

export const LandingPage = () => {
  const [repos, setRepos] = useState<string[]>([]);
  const { selectedRepo, setSelectedRepo } = useContext(LandingPageContext);

  const isAddRepoSectionVisible = !selectedRepo;

  useEffect(() => {
    const storedRepos = localStorage.getItem('repoUrl');
    if (storedRepos) {
      setRepos(JSON.parse(storedRepos));
    }
  }, []);

  const addRepo = (repoUrl: string): boolean => {
    if (repos.includes(repoUrl)) {
      return false;
    }
    const updatedRepos = [...repos, repoUrl];
    setRepos(updatedRepos);
    localStorage.setItem('repoUrl', JSON.stringify(updatedRepos));
    return true;
  };

  const removeRepo = (repoToRemove: string) => {
    const updatedRepos = repos.filter((repo) => repo !== repoToRemove);
    setRepos(updatedRepos);
    localStorage.setItem('repoUrl', JSON.stringify(updatedRepos));
  };

  return (
    <Box sx={{ m: 2 }}>
      <RepoListSection
        repos={repos}
        onRemove={removeRepo}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
      />
      {isAddRepoSectionVisible && (
        <AddRepoSection onAdd={addRepo} repos={repos} />
      )}
    </Box>
  );
};
