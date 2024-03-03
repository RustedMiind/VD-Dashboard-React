import React from "react";
import "./Loader.css";
import { Box, Typography } from "@mui/material";

const Loader = ({ h,title }: { h?: string,title?:string }) => {
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
        {(title && title?.length > 0) ? title:'جاري التحميل'}
      </Typography>
    </Box>
  );
};

export default Loader;
