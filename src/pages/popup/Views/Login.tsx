import { Button, Box, Typography, Divider } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useGitAuth } from '../hooks/useGitAuth';

export const Login = () => {
  const { handleLogin } = useGitAuth();

  return (
    <Box sx={{ m: 2, textAlign: 'center' }}>
      <Typography variant="h5" style={{ whiteSpace: 'nowrap' }}>
        Github Dependency Notifier
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ mt: 1, mb: 1, textAlign: 'left' }}>
        To access your repositories and notify you about dependency updates,
        please log in with your GitHub account.
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          startIcon={<FaGithub />}
        >
          Login with GitHub
        </Button>
      </Box>
    </Box>
  );
};
