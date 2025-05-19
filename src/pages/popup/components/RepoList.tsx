import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";
import {
  List,
  ListItemText,
  ListItemButton,
  Button,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RepoListProps } from "@src/types";

export const RepoList = ({ repos, onRemove }: RepoListProps) => {
  const { setSelectedRepo } = useContext(LandingPageContext);

  return (
    <div>
      {repos.length === 0 && (
        <Typography
          variant="body1"
          sx={{ padding: 2 }}
          style={{ whiteSpace: "nowrap" }}
        >
          You haven't added any repositories yet.
        </Typography>
      )}
      <List>
        {repos.map((repo) => (
          <Box key={repo} display="flex" alignItems="center" gap={2}>
            <ListItemButton onClick={() => setSelectedRepo(repo)} key={repo}>
              <Tooltip title={repo} arrow>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "270px",
                  }}
                >
                  <ListItemText primary={repo} />
                </Typography>
              </Tooltip>
            </ListItemButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onRemove(repo)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </List>
    </div>
  );
};
