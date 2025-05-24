import { TextField, Box, Typography, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { WelcomeBubble } from "./WelcomeBubble";
import type { AddRepoSectionProps } from "@src/types";
import { isValidGitHubUrl } from "@src/utils/utils";
import { addRepoText } from "../../../content";

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
      setErrorMessage(addRepoText.errorEmpty);
      return;
    }

    if (!isValidGitHubUrl(trimmedRepoUrl)) {
      setErrorMessage(addRepoText.errorInvalid);
      return;
    }

    if (repos.includes(trimmedRepoUrl)) {
      setErrorMessage(addRepoText.errorDuplicate);
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
      {showWelcomeBubble && (
        <WelcomeBubble onClick={() => setShowWelcomeBubble(false)} />
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <Box flexGrow={1}>
          <TextField
            id="outlined-basic"
            placeholder={addRepoText.placeholder}
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
