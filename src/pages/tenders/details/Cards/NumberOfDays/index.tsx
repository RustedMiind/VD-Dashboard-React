import React from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Box, Stack, Typography } from "@mui/material";

export default function NumberOfDays() {
  return (
    <GradientBg>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" mb={2}>
          عدد الايام المتبقية للتقديم
        </Typography>
        <Box
          sx={{
            width: "100px",
            height: "100px",
            background: "background",
            borderRadius: 600,
            border: "transparent 1px solid",
            borderColor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0px 11.410014152526855px 49.78915023803711px 0px #FFE0AA",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" color={"secondary.main"}>
              150
            </Typography>
            <Typography variant="body2">يوم</Typography>
          </Box>
        </Box>
      </Stack>
    </GradientBg>
  );
}
