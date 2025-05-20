import { RepoListSection } from "../components/RepoListSection";
import { AddRepo } from "../components/AddRepo";
import { useState, useEffect } from "react";
import { Box, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { DetectedRepoUserAction } from "../components/DetectedRepoUserAction";
import LogoutIcon from "@mui/icons-material/Logout";
import { RepoListBase } from "../components/RepoListBase";
import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";
import { isValidGitHubUrl } from "@src/utils/utils";
import { repositoriesText } from "@src/content";

type RepositoriesProps = {
  handleLogout: () => void;
};

export const Repositories = ({ handleLogout }: RepositoriesProps) => {
  const [repos, setRepos] = useState<string[]>([]);
  const [pendingRepoUrl, setPendingRepoUrl] = useState<string | null>(null);
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { selectedRepo, setSelectedRepo } = useContext(LandingPageContext);
  const isAddRepoSectionVisible = !selectedRepo;

  useEffect(() => {
    const storedRepos = localStorage.getItem("repos");
    if (storedRepos) {
      try {
        setRepos(JSON.parse(storedRepos));
      } catch {
        setRepos([]);
      }
    }

    const storedBlacklist = localStorage.getItem("repoBlacklist");
    if (storedBlacklist) {
      try {
        setBlacklist(JSON.parse(storedBlacklist));
      } catch {
        setBlacklist([]);
      }
    }

    if (chrome?.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (
          tab?.url &&
          isValidGitHubUrl(tab.url) &&
          (!storedBlacklist || !JSON.parse(storedBlacklist).includes(tab.url))
        ) {
          setRepos((prevRepos) => {
            if (tab.url && !prevRepos.includes(tab.url)) {
              setPendingRepoUrl(tab.url);
            }
            return prevRepos;
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repos));
  }, [repos]);

  useEffect(() => {
    localStorage.setItem("repoBlacklist", JSON.stringify(blacklist));
  }, [blacklist]);

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

  const removeFromBlacklist = (repoToRemove: string) => {
    const updatedBlacklist = blacklist.filter((repo) => repo !== repoToRemove);
    setBlacklist(updatedBlacklist);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="primary">
          {repositoriesText.title}
        </Typography>
        <IconButton onClick={handleLogout} color="primary" aria-label="logout">
          <LogoutIcon />
        </IconButton>
      </Box>
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        sx={{}}
        aria-label="Repositories tabs"
      >
        <Tab label={repositoriesText.tabs.repositories} />
        <Tab label={repositoriesText.tabs.blacklisted} />
      </Tabs>
      {tabIndex === 0 && (
        <>
          <RepoListSection
            repos={repos}
            onRemove={removeRepo}
            selectedRepo={selectedRepo}
            setSelectedRepo={setSelectedRepo}
          />
          {isAddRepoSectionVisible && <AddRepo onAdd={addRepo} repos={repos} />}
        </>
      )}
      {tabIndex === 1 && (
        <Box>
          <RepoListBase
            repos={blacklist}
            onRemove={removeFromBlacklist}
            emptyText={repositoriesText.emptyBlacklist}
          />
        </Box>
      )}
      <DetectedRepoUserAction
        pendingRepoUrl={pendingRepoUrl}
        addRepo={addRepo}
        setBlacklist={setBlacklist}
        setPendingRepoUrl={setPendingRepoUrl}
        dialogText={repositoriesText.dialog}
      />
    </Box>
  );
};
