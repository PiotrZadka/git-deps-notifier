import { useContext } from 'react';
import { LandingPageContext } from '../../../../../context/landing-page-context';
import {
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Button,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import type { RepoListProps } from '../../../../../types';

export const RepoList = ({ repos, onRemove }: RepoListProps) => {
  const { setSelectedRepo } = useContext(LandingPageContext);

  return (
    <div>
      <List>
        <ListItemText primary="Your repositories" />
      </List>
      <Divider />
      <List>
        {repos.map((repo) => (
          <Box key={repo} display="flex" alignItems="center" gap={2}>
            <ListItemButton onClick={() => setSelectedRepo(repo)} key={repo}>
              <Tooltip title={repo} arrow>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '270px',
                  }}
                >
                  <ListItemText primary={repo} />
                </Typography>
              </Tooltip>
            </ListItemButton>
            <Button onClick={() => onRemove(repo)} variant="text">
              Remove
            </Button>
          </Box>
        ))}
      </List>
    </div>
  );
};
