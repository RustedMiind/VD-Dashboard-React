import React, { useContext } from "react";
import TableComponent from "./TableComponent";
import { Box, Button, Stack, Typography } from "@mui/material";
import { SoilDataContext } from "../../..";

export default function AttachmentTables() {
  const { incomingFiles, reportFiles, taskFiles, visitFiles } =
    useContext(SoilDataContext);
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
      <TableComponent title="المرفقات الوارده" files={incomingFiles?.media} />
      <TableComponent title="مرفقات الزيارة" files={visitFiles?.media} />
      <TableComponent title="مرفقات الاختبار" files={taskFiles?.media} />
      <TableComponent title="مرفقات التقرير" files={reportFiles?.media} />
    </Stack>
  );
}
