import {
  ListItemButton,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import type {
  UpdatedDependencyListItemProps,
  DependencyAccordionProps,
} from "@src/types";
import { renderDependencyIcon } from "@src/utils/utils";

export const DependencyAccordion = ({
  dependencies,
  label,
  setSelectedDep,
}: DependencyAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {dependencies?.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          dependencies.map((dep: UpdatedDependencyListItemProps) => (
            <Box key={dep.name} display="flex" alignItems="center" gap={2}>
              <ListItemButton onClick={() => setSelectedDep(dep.name)}>
                <Tooltip
                  title={`Current: ${dep.current} | Latest: ${dep.latest}`}
                  arrow
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <ListItemText primary={dep.name} />
                    {renderDependencyIcon(dep.current, dep.latest)}
                  </Box>
                </Tooltip>
              </ListItemButton>
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};
