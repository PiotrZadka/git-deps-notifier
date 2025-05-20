import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type DetectedRepoUserActionProps = {
  pendingRepoUrl: string | null;
  addRepo: (repoUrl: string) => void;
  setBlacklist: React.Dispatch<React.SetStateAction<string[]>>;
  setPendingRepoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  dialogText: {
    addDetectedRepo: string;
    detectedRepoUrl: string;
    addButton: string;
    ignoreButton: string;
    cancelButton: string;
  };
};

export const DetectedRepoUserAction = ({
  pendingRepoUrl,
  addRepo,
  setBlacklist,
  setPendingRepoUrl,
  dialogText,
}: DetectedRepoUserActionProps) => {
  const handleAddRepo = () => {
    if (pendingRepoUrl) {
      addRepo(pendingRepoUrl);
      setPendingRepoUrl(null);
    }
  };

  const handleIgnoreRepo = () => {
    if (pendingRepoUrl) {
      setBlacklist((prev) => {
        const updated = [...prev, pendingRepoUrl];
        localStorage.setItem("repoBlacklist", JSON.stringify(updated));
        return updated;
      });
      setPendingRepoUrl(null);
    }
  };

  const handleCancel = () => {
    setPendingRepoUrl(null);
  };

  return (
    <Dialog open={!!pendingRepoUrl} onClose={handleCancel}>
      <DialogTitle>
        <Typography variant="subtitle2">
          {dialogText.addDetectedRepo}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {dialogText.detectedRepoUrl}
          <br />
          <b>{pendingRepoUrl}</b>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddRepo} color="primary" variant="contained">
          {dialogText.addButton}
        </Button>
        <Button onClick={handleIgnoreRepo} color="warning" variant="outlined">
          {dialogText.ignoreButton}
        </Button>
        <Button onClick={handleCancel} color="secondary">
          {dialogText.cancelButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
