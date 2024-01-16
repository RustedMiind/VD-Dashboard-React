import React from "react";
import TableComponent from "./TableComponent";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function AttachmentTables() {
  return (
    <Stack spacing={2}>
      <Box display={"flex"} justifyContent={"end"}>
        <Button
          disabled
          size="small"
          variant="contained"
          sx={{ background: "primary", px: 2 }}
        >
          تحميل جميع المرافقات
        </Button>
      </Box>
      <TableComponent title="المرفقات" />
    </Stack>
  );
}
