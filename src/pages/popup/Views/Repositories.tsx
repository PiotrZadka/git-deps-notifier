import { RepoListSection } from '../components/RepoListSection';
import { AddRepo } from '../components/AddRepo';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { LandingPageContext } from '@src/context/landing-page-context';
import axios from 'axios';

export const Repositories = () => {
  const [repos, setRepos] = useState<string[]>([]);
  const { selectedRepo, setSelectedRepo } = useContext(LandingPageContext);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAddRepoSectionVisible = !selectedRepo;

  useEffect(() => {
    const storedRepos = localStorage.getItem('repoUrl');
    if (storedRepos) {
      setRepos(JSON.parse(storedRepos));
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const { access_token } = response.data;
      setAccessToken(access_token);
      console.log('Access Token:', access_token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  const fetchRepos = async () => {
    if (!accessToken) return;
    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const repoNames = response.data.map((repo: any) => repo.full_name);
      setRepos(repoNames);
      localStorage.setItem('repoUrl', JSON.stringify(repoNames));
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchRepos();
    }
  }, [accessToken]);

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
      {isAddRepoSectionVisible && <AddRepo onAdd={addRepo} repos={repos} />}
    </Box>
  );
};
