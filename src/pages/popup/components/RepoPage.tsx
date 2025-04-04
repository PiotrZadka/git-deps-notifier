import { Divider, Button, Box, Typography } from '@mui/material';
import { SelectedRepoType } from '@src/types';

const formatRepoName = (repoUrl: string): string | null => {
  return repoUrl.split('/').pop() || '';
};

export const RepoPage = ({
  selectedRepo,
  setSelectedRepo,
}: SelectedRepoType) => {
  const extratedRepoName = formatRepoName(selectedRepo);
  return (
    <div>
      <Box>
        <Typography variant="h6">{extratedRepoName}</Typography>
        <Divider />
        <Button
          onClick={() => setSelectedRepo('')}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Return
        </Button>
      </Box>
    </div>
  );
};
