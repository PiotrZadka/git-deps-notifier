import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { SelectedRepoType } from '@src/types';
import { formatRepoName } from '@src/utils/utils';
import { renderDependencyIcon } from '../../../utils/utils';

const mockDependenciesList = [
  { name: '@mui/material', current: '1.12', latest: '1.14', isNew: true },
  { name: '@mui/icons-material', current: '1.10', latest: '1.14', isNew: true },
  { name: 'react', current: '17.0.2', latest: '18.2.0', isNew: false },
  { name: 'typescript', current: '4.5.4', latest: '5.1.3', isNew: true },
  { name: 'axios', current: '0.24.0', latest: '1.3.4', isNew: false },
];

export const RepoPage = ({
  selectedRepo,
  setSelectedRepo,
}: SelectedRepoType) => {
  const extratedRepoName = formatRepoName(selectedRepo);
  return (
    <div>
      <List>
        <Box display="flex" alignItems="center">
          <IconButton
            sx={{ borderRadius: 0 }}
            onClick={() => setSelectedRepo('')}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h6">{extratedRepoName}</Typography>
        </Box>
      </List>
      <Divider />
      {mockDependenciesList.map((dep) => (
        <Box key={dep.name} display="flex" alignItems="center" gap={2}>
          <ListItemButton onClick={() => setSelectedRepo(dep.name)}>
            <Tooltip
              title={`Current: ${dep.current}, Latest: ${dep.latest}`}
              arrow
            >
              <ListItemText primary={dep.name} />
            </Tooltip>
            {renderDependencyIcon(dep.isNew)}
          </ListItemButton>
        </Box>
      ))}
    </div>
  );
};
