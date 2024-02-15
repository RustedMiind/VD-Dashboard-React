import {
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
import { SoilDataContext } from "../../../..";
import { useContext } from "react";
import LimitTypography from "../../../../../../../components/LimitTypograpgy";
import { formatDate } from "../../../../../../../methods";
import { useParams } from "react-router-dom";
import {
  FileTechnical,
  IncomingFiles,
} from "../../../../../../../types/Soil/FileFinancial";
export default function TableComponent({
  title,
  noData,
  incomingFiles,
  fileTechnical,
}: PropsType) {
  const { items } = useContext(SoilDataContext);
  function convertBytetoMB(byte: number): string {
    const mb = `${(byte / 1024 ** 2).toFixed(2)}MB`;
    return mb;
  }
  console.log(fileTechnical);
  return (
    <Stack component={Paper} bgcolor={"Background"} p={2}>
      <Typography variant="h6" sx={{ fontWeight: "800" }} gutterBottom>
        {title}
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
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

            <TableBody>
              {!noData &&
                incomingFiles?.media &&
                incomingFiles?.media?.map((file) => (
                  <TableRow>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        component={`a`}
                        href={`${file?.original_url}`}
                        target="_blank"
                        download
                        color="primary"
                        size="small"
                      >
                        <SourceOutlinedIcon sx={{ fontSize: "20px", mr: 1 }} />
                      </IconButton>
                      <LimitTypography>{file?.file_name}</LimitTypography>
                    </TableCell>
                    <TableCell>{file?.mime_type}</TableCell>
                    <TableCell> {convertBytetoMB(file?.size)}</TableCell>
                    <TableCell>
                      <LimitTypography>{file?.collection_name}</LimitTypography>
                    </TableCell>
                    <TableCell>{formatDate(file?.created_at)}</TableCell>
                    <TableCell>
                      <IconButton
                        component={`a`}
                        href={`${file?.original_url}`}
                        target="_blank"
                        download
                        color="primary"
                        size="small"
                      >
                        <CloudDownloadOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {!noData &&
                fileTechnical &&
                fileTechnical?.map((item) =>
                  item?.media?.map((file) => (
                    <TableRow>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          component={`a`}
                          href={`${file?.original_url}`}
                          target="_blank"
                          download
                          color="primary"
                          size="small"
                        >
                          <SourceOutlinedIcon
                            sx={{ fontSize: "20px", mr: 1 }}
                          />
                        </IconButton>
                        <LimitTypography>{file?.file_name}</LimitTypography>
                      </TableCell>
                      <TableCell>{file?.mime_type}</TableCell>
                      <TableCell> {convertBytetoMB(file?.size)}</TableCell>
                      <TableCell>
                        <LimitTypography>
                          {file?.collection_name}
                        </LimitTypography>
                      </TableCell>
                      <TableCell>{formatDate(file?.created_at)}</TableCell>
                      <TableCell>
                        <IconButton
                          component={`a`}
                          href={`${file?.original_url}`}
                          target="_blank"
                          download
                          color="primary"
                          size="small"
                        >
                          <CloudDownloadOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}

type PropsType = {
  title: string;
  noData?: boolean;
  incomingFiles?: IncomingFiles;
  fileTechnical?: FileTechnical[];
};
