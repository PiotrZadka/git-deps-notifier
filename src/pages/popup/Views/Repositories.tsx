import { RepoListSection } from "../components/RepoListSection";
import { AddRepo } from "../components/AddRepo";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { RepoListBase } from "../components/RepoListBase";
import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";

// Helper to check if a URL is a valid GitHub repo
function isValidGitHubRepoUrl(url: string): boolean {
  // Matches https://github.com/{owner}/{repo}[/*]
  return /^https:\/\/github\.com\/[^\/]+\/[^\/]+(\/.*)?$/.test(url);
}

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

  // Load repos and blacklist from localStorage on mount
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

    // Get current tab's URL and prompt if valid GitHub repo and not blacklisted
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (
          tab &&
          tab.url &&
          isValidGitHubRepoUrl(tab.url) &&
          (!storedBlacklist || !JSON.parse(storedBlacklist).includes(tab.url))
        ) {
          setRepos((prevRepos) => {
            if (!prevRepos.includes(tab.url!)) {
              setPendingRepoUrl(tab.url!);
            }
            return prevRepos;
          });
        }
      });
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

  // Save blacklist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("repoBlacklist", JSON.stringify(blacklist));
  }, [blacklist]);

  const removeFromBlacklist = (repoToRemove: string) => {
    const updatedBlacklist = blacklist.filter((repo) => repo !== repoToRemove);
    setBlacklist(updatedBlacklist);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
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
        <Tab label="Repositories" />
        <Tab label="Blacklisted" />
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
            emptyText="No blacklisted repositories."
          />
        </Box>
      )}
      <Dialog open={!!pendingRepoUrl} onClose={() => setPendingRepoUrl(null)}>
        <DialogTitle>
          <Typography variant="subtitle2">
            Add detected GitHub repository?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Detected repository URL:
            <br />
            <b>{pendingRepoUrl}</b>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (pendingRepoUrl) {
                addRepo(pendingRepoUrl);
                setPendingRepoUrl(null);
              }
            }}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
          <Button
            onClick={() => {
              if (pendingRepoUrl) {
                setBlacklist((prev) => {
                  const updated = [...prev, pendingRepoUrl];
                  localStorage.setItem(
                    "repoBlacklist",
                    JSON.stringify(updated)
                  );
                  return updated;
                });
                setPendingRepoUrl(null);
              }
            }}
            color="warning"
            variant="outlined"
          >
            Ignore
          </Button>
          <Button onClick={() => setPendingRepoUrl(null)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
