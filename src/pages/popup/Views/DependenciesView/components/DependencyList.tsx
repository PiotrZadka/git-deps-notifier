import { Divider, Box, Typography, IconButton } from '@mui/material';
import { formatRepoName } from '@src/utils/utils';
import type { DependencyListProps } from '@src/types';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useDependencies } from './hooks/useDependencies';
import { DependencyAccordion } from './DependencyAccordion';

export const DependencyList = ({
  setSelectedRepo,
  setSelectedDep,
  selectedRepo,
}: DependencyListProps) => {
  const extractedRepoName = formatRepoName(selectedRepo);
  const { dependencies, devDependencies } = useDependencies(selectedRepo);

  return (
    <div>
      <Box display="flex" alignItems="center">
        <IconButton
          sx={{ borderRadius: 0 }}
          onClick={() => setSelectedRepo('')}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant="h6">{extractedRepoName}</Typography>
      </Box>
      <Divider />
      <DependencyAccordion
        dependencies={dependencies}
        label="Dependencies"
        setSelectedDep={setSelectedDep}
      />
      <DependencyAccordion
        dependencies={devDependencies}
        label="Dev Dependencies"
        setSelectedDep={setSelectedDep}
      />
    </div>
  );
};
