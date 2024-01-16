import React from "react";
import TableComponent from "./TableComponent";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function AttachmentTables() {
  return (
    <Stack spacing={5}>
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
      <TableComponent title="المرفقات المالية" noData />
      <TableComponent title="المرفقات الفنية" noData />
    </Stack>
  );
}
