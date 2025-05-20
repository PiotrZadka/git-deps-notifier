import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import type { AddRepoSectionProps } from "@src/types";
import { isValidGitHubUrl } from "@src/utils/utils";

export const AddRepo = ({ onAdd, repos }: AddRepoSectionProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showWelcomeBubble, setShowWelcomeBubble] = useState(
    repos.length === 0
  );

  useEffect(() => {
    setShowWelcomeBubble(repos.length === 0);
  }, [repos]);

  const handleAddClick = () => {
    const trimmedRepoUrl = repoUrl.trim();
    if (!trimmedRepoUrl) {
      setErrorMessage("Repository URL cannot be empty.");
      return;
    }

    if (!isValidGitHubUrl(trimmedRepoUrl)) {
      setErrorMessage("Please enter a valid GitHub repository URL.");
      return;
    }

    if (repos.includes(trimmedRepoUrl)) {
      setErrorMessage("This repository is already in the list.");
      return;
    }

    setErrorMessage("");
    onAdd(trimmedRepoUrl);
    setRepoUrl("");
  };

  return (
    <Box>
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <Box flexGrow={1} position="relative">
          {showWelcomeBubble && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                position: "absolute",
                background: "#007bff",
                color: "#fff",
                padding: "10px",
                borderRadius: "6px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-10px",
                  left: "20px",
                  width: "0",
                  height: "0",
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "10px solid #007bff",
                },
                top: "-40px",
                left: "10px",
              }}
            >
              Add your first repo URL
            </Typography>
          )}
          <TextField
            id="outlined-basic"
            placeholder="Git repo url"
            variant="outlined"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onFocus={() => repos.length === 0 && setShowWelcomeBubble(false)}
            error={!!errorMessage}
            fullWidth
          />
        </Box>
        <IconButton
          color="primary"
          onClick={handleAddClick}
          aria-label="add repository"
          sx={{ ml: 1 }}
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};
