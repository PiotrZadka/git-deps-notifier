import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type RepoListBaseProps = {
  repos: string[];
  onRemove: (repo: string) => void;
  onSelect?: (repo: string) => void;
  emptyText?: string;
};

export const RepoListBase = ({
  repos,
  onRemove,
  onSelect,
  emptyText,
}: RepoListBaseProps) => {
  if (!repos.length) {
    return (
      <Typography
        variant="body1"
        sx={{ padding: 2 }}
        style={{ whiteSpace: "nowrap" }}
      >
        {emptyText}
      </Typography>
    );
  }

  return (
    <List>
      {repos.map((repo) => (
        <Box key={repo} display="flex" alignItems="center">
          {onSelect ? (
            <Tooltip title={repo} enterDelay={1000} arrow>
              <ListItemButton
                onClick={() => onSelect(repo)}
                key={repo}
                disableGutters
              >
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
              </ListItemButton>
            </Tooltip>
          ) : (
            <Tooltip title={repo} enterDelay={1000} arrow>
              <ListItem disableGutters sx={{ p: 0 }}>
                <ListItemText primary={repo} />
              </ListItem>
            </Tooltip>
          )}
          <IconButton aria-label="delete" onClick={() => onRemove(repo)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </List>
  );
};
