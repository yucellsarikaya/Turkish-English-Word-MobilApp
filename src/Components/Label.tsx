import { Box, Typography } from "@mui/material";
import "./Label.css";

interface LabelProps {
  text: string;
  animate?: boolean;
  bool: boolean;
}

function Label({ text, animate = true, bool }: LabelProps) {
  return bool ? (
    <Box
      className={`label`}
      sx={{ transition: animate ? "all 0.3s ease-in-out" : "none" }}
      onMouseEnter={(e) => {
        if (animate) e.currentTarget.classList.add("animate");
      }}
      onMouseLeave={(e) => {
        if (animate) e.currentTarget.classList.remove("animate");
      }}
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  ) : (
    <></>
  );
}

export default Label;
