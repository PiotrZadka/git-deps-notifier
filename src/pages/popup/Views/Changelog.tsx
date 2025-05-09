import { Divider, Box, Typography, IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import type { ChangeLogProps } from "@src/types";
import { useChangelog } from "../hooks/useChangelog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Changelog = ({ selectedDep, setSelectedDep }: ChangeLogProps) => {
  const { changelogData, repositoryUrl } = useChangelog(selectedDep);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton sx={{ borderRadius: 0 }} onClick={() => setSelectedDep("")}>
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant="h6">{selectedDep}</Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="subtitle1">Changelog</Typography>
        <Box sx={{ mt: 2 }}>
          {changelogData?.body ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {changelogData.body}
            </ReactMarkdown>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No changelog available.{" "}
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                View repository on GitHub
              </a>{" "}
              for possible release notes or README.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
