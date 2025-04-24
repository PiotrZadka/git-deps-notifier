import { Button, TextField, Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import type { AddRepoSectionProps } from '@src/types';
import { isValidGitHubUrl } from '@src/utils/utils';

export const AddRepo = ({ onAdd, repos }: AddRepoSectionProps) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddClick = () => {
    const trimmedRepoUrl = repoUrl.trim();
    if (!trimmedRepoUrl) {
      setErrorMessage('Repository URL cannot be empty.');
      return;
    }

    if (!isValidGitHubUrl(trimmedRepoUrl)) {
      setErrorMessage('Please enter a valid GitHub repository URL.');
      return;
    }

    if (repos.includes(trimmedRepoUrl)) {
      setErrorMessage('This repository is already in the list.');
      return;
    }

    setErrorMessage('');
    onAdd(trimmedRepoUrl);
    setRepoUrl('');
  };

  return (
    <Box>
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <Box flexGrow={1}>
          <TextField
            id="outlined-basic"
            placeholder="Git repo url"
            variant="outlined"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            error={!!errorMessage}
            fullWidth
          />
        </Box>
        <Button variant="contained" onClick={handleAddClick}>
          <Add />
        </Button>
      </Box>
    </Box>
  );
};
