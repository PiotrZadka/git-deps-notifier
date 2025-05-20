import { Typography } from "@mui/material";
import { welcomeBubbleText } from "@src/content";

export const WelcomeBubble = () => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      sx={{
        position: "absolute",
        background: "#007bff",
        color: "#fff",
        padding: "10px",
        borderRadius: "6px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1,
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-10px",
          left: "20px",
          width: "0",
          height: "0",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "10px solid #007bff",
        },
        top: "-40px",
        left: "10px",
      }}
    >
      {welcomeBubbleText.body}
    </Typography>
  );
};
