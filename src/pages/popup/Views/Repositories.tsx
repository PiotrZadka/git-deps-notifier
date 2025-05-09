import { RepoListSection } from "../components/RepoListSection";
import { AddRepo } from "../components/AddRepo";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";

type RepositoriesProps = {
  handleLogout: () => void;
};

export const Repositories = ({ handleLogout }: RepositoriesProps) => {
  const [repos, setRepos] = useState<string[]>([]);
  const { selectedRepo, setSelectedRepo } = useContext(LandingPageContext);
  const isAddRepoSectionVisible = !selectedRepo;

  // Load repos from localStorage on mount
  useEffect(() => {
    const storedRepos = localStorage.getItem("repos");
    if (storedRepos) {
      try {
        setRepos(JSON.parse(storedRepos));
      } catch {
        setRepos([]);
      }
    }
  }, []);

  // Save repos to localStorage whenever repos changes
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repos));
  }, [repos]);

  const addRepo = (repoUrl: string): boolean => {
    if (repos.includes(repoUrl)) {
      return false;
    }
    const updatedRepos = [...repos, repoUrl];
    setRepos(updatedRepos);
    return true;
  };

  const removeRepo = (repoToRemove: string) => {
    const updatedRepos = repos.filter((repo) => repo !== repoToRemove);
    setRepos(updatedRepos);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
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
