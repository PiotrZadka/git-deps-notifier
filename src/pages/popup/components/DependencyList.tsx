import { Divider, Box, Typography, IconButton } from "@mui/material";
import { formatRepoName } from "@src/utils/utils";
import type { DependencyListProps } from "@src/types";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDependencies } from "../hooks/useDependencies";
import { DependencyAccordion } from "./DependencyAccordion";

export const DependencyList = ({
  setSelectedRepo,
  setSelectedDep,
  selectedRepo,
}: DependencyListProps) => {
  const extractedRepoName = formatRepoName(selectedRepo);
  const { dependencies, devDependencies } = useDependencies(selectedRepo);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton
          sx={{
            borderRadius: "50%",
            transition: "background 0.2s",
            "&:hover": { background: "rgba(0,0,0,0.08)" },
          }}
          onClick={() => setSelectedRepo("")}
        >
          <ArrowBackRoundedIcon />
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
    </Box>
  );
};
