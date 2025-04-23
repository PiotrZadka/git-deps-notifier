import { Button, Box, Typography, Divider } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';

export const Login = () => {
  const handleGitHubLogin = () => {
    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
    const redirectUri = chrome.identity.getRedirectURL('oauth2');
    const scope = 'repo user';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectUrl) => {
        if (redirectUrl) {
          const urlParams = new URLSearchParams(new URL(redirectUrl).search);
          const code = urlParams.get('code');
          if (code) {
            handleAuthCode(code);
          }
        } else {
          console.error('Authorization failed or was canceled.');
        }
      }
    );
  };

  const handleAuthCode = async (code) => {
    try {
      // GitHub token endpoint
      const tokenUrl = 'https://github.com/login/oauth/access_token';

      // Replace with your actual client ID and client secret
      const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_OAUTH_CLIENT_SECRET;

      const response = await axios.post(
        tokenUrl,
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const accessToken = response.data.access_token;
      localStorage.setItem('github_access_token', accessToken);
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error handling auth code:', error);
    }
  };

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
          onClick={handleGitHubLogin}
          startIcon={<FaGithub />}
        >
          Login with GitHub
        </Button>
      </Box>
    </Box>
  );
};
