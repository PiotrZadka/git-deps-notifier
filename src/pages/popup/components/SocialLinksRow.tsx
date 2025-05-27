// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import { Box, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

export const SocialLinksRow = () => (
  <Box display="flex" alignItems="center">
    <Box display="flex" alignItems="center">
      <Tooltip title="GitHub" arrow>
        <a
          href="https://github.com/PiotrZadka"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            width: 36,
            marginRight: 8,
            background: "#fff",
            borderRadius: 4,
            border: "1px solid #e0e0e0",
            boxSizing: "border-box",
            padding: 0,
          }}
        >
          <GitHubIcon fontSize="medium" style={{ color: "#000" }} />
        </a>
      </Tooltip>
      <Tooltip title="LinkedIn" arrow>
        <a
          href="https://www.linkedin.com/in/piotr-zadka/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            height: 36,
            marginRight: 8,
          }}
        >
          <LinkedInIcon fontSize="large" style={{ color: "#0077b5" }} />
        </a>
      </Tooltip>
      <Tooltip title="Leave Feedback" arrow>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeR86GEKDPCt76OTdRKtBB6LsPm8klW3VvruA-8VevHJjP4jA/viewform?usp=dialog"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            height: 36,
            marginRight: 8,
          }}
        >
          <ThumbUpAltOutlinedIcon
            fontSize="large"
            style={{ color: "#43a047" }}
          />
        </a>
      </Tooltip>
    </Box>
    <Tooltip title="Buy Me a Coffee" arrow>
      <a
        href="https://ko-fi.com/B0B21FH7AZ"
        target="_blank"
        style={{
          display: "flex",
          alignItems: "center",
          height: 36,
          marginLeft: "auto",
        }}
      >
        <img
          height="36"
          style={{ border: 0, height: 36 }}
          src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </Tooltip>
  </Box>
);
