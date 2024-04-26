import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import LimitTypography from "../LimitTypograpgy";
import { formatDate } from "../../methods";
import React from "react";
import { Media } from "../../types/Media";

function convertBytetoMB(byte: number): string {
  const mb = `${(byte / 1024 ** 2).toFixed(2)}MB`;
  return mb;
}

const TableHeadComponent = () => (
  <TableHead>
    <TableRow>
      <TableCell>اسم الملف</TableCell>
      <TableCell>النوع</TableCell>
      <TableCell>الحجم</TableCell>
      <TableCell>المنشيء</TableCell>
      <TableCell>تاريخ الانشاء</TableCell>
      <TableCell>تحميل</TableCell>
    </TableRow>
  </TableHead>
);

function AttachmentsTable({ label, media }: PropsType) {
  return (
    <Stack component={Paper} bgcolor={"Background"} p={2}>
      <Typography variant="h6" sx={{ fontWeight: "800" }} gutterBottom>
        {label}
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHeadComponent />
            <TableBody>
              {media?.map((media) => {
                return (
                  <TableRow>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        component={`a`}
                        href={`${media.original_url}`}
                        target="_blank"
                        download
                        color="primary"
                        size="small"
                      >
                        <SourceOutlinedIcon sx={{ fontSize: "20px", mr: 1 }} />
                      </IconButton>
                      <LimitTypography>{media.name}</LimitTypography>
                    </TableCell>
                    <TableCell>{media.mime_type}</TableCell>
                    <TableCell>{convertBytetoMB(media.size)}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{formatDate(media.created_at)}</TableCell>
                    <TableCell>
                      <IconButton
                        component={`a`}
                        href={`${media.original_url}`}
                        target="_blank"
                        download
                        color="primary"
                        size="small"
                      >
                        <CloudDownloadOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}

type PropsType = {
  label: React.ReactNode;
  media: Media[];
};

export default AttachmentsTable;
