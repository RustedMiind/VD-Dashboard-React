import { Box, IconButton, Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";

export default function AddUserToContractor() {
  // TODO::declare and define component state and variable
  const [hovered, setHovered] = useState(false);
  // TODO::declare and define component helper methods
  // * return component ui.
  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        position: "fixed",
        bottom: "3%",
        right: "3%",
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          width: "80px",
          opacity: hovered ? 1 : 0,
        }}
      >
        <Typography variant="body1">اضافة مستخدمين للمقاول</Typography>
      </Box>
      <IconButton
        color="primary"
        sx={{
          bgcolor: "#9CBBDE",
          width: "50px",
          height: "50px",
          ":hover": {
            bgcolor: "#9CBBDE",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <PlayArrowIcon />
      </IconButton>
    </Stack>
  );
}
