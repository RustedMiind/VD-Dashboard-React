import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import img1 from "../../../../assets/images/branch-empty.png";
import { NavLink } from "react-router-dom";

export default function TenderNotFound() {
  return (
    <Stack>
      <Paper
        sx={{
          height: "58vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <React.Fragment>
          <Stack alignItems={"center"}>
            <img src={img1} alt="Not found" />
            <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
              لا يوجد منافسات متاحة
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                startIcon={<AddCircleOutlineIcon />}
                variant="contained"
                component={NavLink}
                to="create"
              >
                إضافة منافسة
              </Button>
            </Box>
          </Stack>
        </React.Fragment>
      </Paper>
    </Stack>
  );
}
