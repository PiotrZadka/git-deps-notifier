import { Divider, Box, Typography, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import type { ChangeLogProps } from '@src/types';

export const ChangeLog = ({ selectedDep, setSelectedDep }: ChangeLogProps) => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton sx={{ borderRadius: 0 }} onClick={() => setSelectedDep('')}>
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant="h6">{selectedDep}</Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="subtitle1">Changelog...</Typography>
        <Typography variant="subtitle2">...some cool new stuff</Typography>
      </Box>
    </Box>
  );
};
