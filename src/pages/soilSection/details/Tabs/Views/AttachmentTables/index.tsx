import React, { useContext } from "react";
import TableComponent from "./TableComponent";
import { Box, Button, Stack, Typography } from "@mui/material";
import { SoilDataContext } from "../../..";

export default function AttachmentTables() {
  const { fileTechnical, incomingFiles } = useContext(SoilDataContext);
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
      <TableComponent title="المرفقات الوارده" incomingFiles={incomingFiles} />
      <TableComponent title="المرفقات المالية" noData />
      <TableComponent title="المرفقات الفنية" fileTechnical={fileTechnical} />
    </Stack>
  );
}
