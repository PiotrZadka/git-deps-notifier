// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import { Button, Box, Typography, Divider } from "@mui/material";
import { loginText } from "../../../content";
import { FaGithub } from "react-icons/fa";

type LoginProps = {
  handleLogin: () => void;
};

export const Login = ({ handleLogin }: LoginProps) => {
  return (
    <Box sx={{ m: 2, textAlign: "center" }}>
      <Typography variant="h5" style={{ whiteSpace: "nowrap" }}>
        {loginText.title}
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ mt: 1, mb: 1, textAlign: "left" }}>
        {loginText.description}
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          startIcon={<FaGithub />}
        >
          {loginText.button}
        </Button>
      </Box>
    </Box>
  );
};
