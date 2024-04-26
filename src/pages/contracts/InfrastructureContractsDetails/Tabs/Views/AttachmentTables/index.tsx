import React from "react";
import TableComponent from "./TableComponent";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Api } from "../../../../../../constants";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../../../../methods";

export default function AttachmentTables() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  return (
    <Stack spacing={5}>
      {/* <Box display={"flex"} justifyContent={"end"}>
        <Button
          // disabled
          size="small"
          variant="contained"
          sx={{ background: "primary", px: 2 }}
          onClick={() => {
            const db_token = getCookie("db_token");
            fetch(Api(`employee/tender/download-files/${id}`), {
              headers: {
                Authorization: `Bearer ${db_token}`,
              },
            }) // FETCH BLOB FROM IT
              .then((response) => response.blob())
              .then((blob) => {
                // RETRIEVE THE BLOB AND CREATE LOCAL URL
                var _url = window.URL.createObjectURL(blob);
                window.open(_url, "_blank")?.focus(); // window.open + focus
              })
              .catch((err) => {
                enqueueSnackbar(
                  err?.response?.data.msg ||
                    err?.response?.data.message ||
                    "تعذر في فتح الملف المطلوب",
                  {
                    variant: "error",
                  }
                );
              });
          }}
        >
          تحميل جميع المرافقات
        </Button>
      </Box> */}
      <TableComponent />
    </Stack>
  );
}
