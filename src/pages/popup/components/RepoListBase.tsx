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
  showTooltip?: boolean;
};

export const RepoListBase = ({
  repos,
  onRemove,
  onSelect,
  emptyText = "No repositories.",
  showTooltip = true,
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
        <Box
          key={repo}
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ minHeight: 56 }}
        >
          {onSelect ? (
            <ListItemButton onClick={() => onSelect(repo)} key={repo}>
              {showTooltip ? (
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
              ) : (
                <ListItemText primary={repo} />
              )}
            </ListItemButton>
          ) : (
            <ListItem>
              <ListItemText primary={repo} />
            </ListItem>
          )}
          <IconButton
            aria-label="delete"
            onClick={() => onRemove(repo)}
            sx={{ ml: 1 }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ))}
    </List>
  );
};
