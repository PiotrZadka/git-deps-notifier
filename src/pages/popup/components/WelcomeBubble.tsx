// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import { Typography } from "@mui/material";
import { welcomeBubbleText } from "@src/content";

type WelcomeBubbleProps = {
  onClick?: () => void;
};

export const WelcomeBubble = ({ onClick }: WelcomeBubbleProps) => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      sx={{
        background: "#007bff",
        color: "#fff",
        px: 2,
        py: 0.5,
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
        zIndex: 1,
        cursor: "pointer",
        mb: 1,
        whiteSpace: "nowrap",
        fontSize: 14,
        display: "inline-block",
        position: "relative",
        marginBottom: "18px",
        padding: "4px 12px",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "100%",
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "14px solid #007bff",
          zIndex: 2,
        },
      }}
      onClick={onClick}
    >
      {welcomeBubbleText.body}
    </Typography>
  );
};
