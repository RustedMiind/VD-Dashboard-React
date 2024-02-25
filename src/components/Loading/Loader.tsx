import React from "react";
import "./Loader.css";
import { Box, Typography } from "@mui/material";

const Loader = ({ h }: { h?: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: h ?? "400px",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box className="loaderDiv"></Box>
      <Typography sx={{ marginTop: "1rem" }} variant="body2">
        جاري التحميل
      </Typography>
    </Box>
  );
};

export default Loader;
