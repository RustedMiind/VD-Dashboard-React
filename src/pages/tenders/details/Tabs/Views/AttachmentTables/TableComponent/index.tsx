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
import { TenderDataContext } from "../../../..";
import { useContext, useEffect } from "react";
import LimitTypography from "../../../../../../../components/LimitTypograpgy";
import { formatDate } from "../../../../../../../methods";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../../../../../../../constants";
import { Tender } from "../../../../../../../types";

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

export default function TableComponent() {
  const { tender } = useContext(TenderDataContext);
  // const { id } = useParams();
  function convertBytetoMB(byte: number): string {
    const mb = `${(byte / 1024 ** 2).toFixed(2)}MB`;
    return mb;
  }

  if (typeof tender === "object") {
    return (
      <>
        <Stack component={Paper} bgcolor={"Background"} p={2}>
          <Typography variant="h6" sx={{ fontWeight: "800" }} gutterBottom>
            المرفقات
          </Typography>
          <Paper>
            <TableContainer>
              <Table>
                <TableHeadComponent />
                <TableBody>
                  {tender.tender_files?.map((tender) => {
                    if (tender.media && tender.media[0]) {
                      return (
                        <TableRow>
                          <TableCell
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              component={`a`}
                              href={`${tender.media[0]?.original_url}`}
                              target="_blank"
                              download
                              color="primary"
                              size="small"
                            >
                              <SourceOutlinedIcon
                                sx={{ fontSize: "20px", mr: 1 }}
                              />
                            </IconButton>
                            <LimitTypography>
                              {tender.media[0]?.name}
                            </LimitTypography>
                          </TableCell>
                          <TableCell>{tender.media[0]?.mime_type}</TableCell>
                          <TableCell>
                            {convertBytetoMB(tender.media[0]?.size)}
                          </TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            {formatDate(tender.media[0]?.created_at)}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              component={`a`}
                              href={`${tender.media[0]?.original_url}`}
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
                    } else return <></>;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
        <Stack component={Paper} bgcolor={"Background"} p={2}>
          <Typography variant="h6" sx={{ fontWeight: "800" }} gutterBottom>
            المرفقات المالية
          </Typography>
          <Paper>
            <TableContainer>
              <Table>
                <TableHeadComponent />
                <TableBody>
                  {tender.pictures?.file_finacial_tender && (
                    <TableRow>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          component={`a`}
                          href={`${tender.pictures?.file_finacial_tender.original_url}`}
                          target="_blank"
                          download
                          color="primary"
                          size="small"
                        >
                          <SourceOutlinedIcon
                            sx={{ fontSize: "20px", mr: 1 }}
                          />
                        </IconButton>
                        <LimitTypography>
                          {tender.pictures.file_finacial_tender.name}
                        </LimitTypography>
                      </TableCell>
                      <TableCell>
                        {tender.pictures.file_finacial_tender.mime_type}
                      </TableCell>
                      <TableCell>
                        {convertBytetoMB(
                          tender.pictures.file_finacial_tender.size
                        )}
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {formatDate(
                          tender.pictures.file_finacial_tender.created_at
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          component={`a`}
                          href={`${tender.pictures.file_finacial_tender.original_url}`}
                          target="_blank"
                          download
                          color="primary"
                          size="small"
                        >
                          <CloudDownloadOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
        <Stack component={Paper} bgcolor={"Background"} p={2}>
          <Typography variant="h6" sx={{ fontWeight: "800" }} gutterBottom>
            المرفقات الفنية
          </Typography>
          <Paper>
            <TableContainer>
              <Table>
                <TableHeadComponent />
                <TableBody>
                  {tender.pictures?.technical_tender && (
                    <TableRow>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          component={`a`}
                          href={`${tender.pictures?.technical_tender.original_url}`}
                          target="_blank"
                          download
                          color="primary"
                          size="small"
                        >
                          <SourceOutlinedIcon
                            sx={{ fontSize: "20px", mr: 1 }}
                          />
                        </IconButton>
                        <LimitTypography>
                          {tender.pictures?.technical_tender.name}
                        </LimitTypography>
                      </TableCell>
                      <TableCell>
                        {tender.pictures?.technical_tender.mime_type}
                      </TableCell>
                      <TableCell>
                        {convertBytetoMB(
                          tender.pictures?.technical_tender.size
                        )}
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {formatDate(
                          tender.pictures?.technical_tender.created_at
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          component={`a`}
                          href={`${tender.pictures?.technical_tender.original_url}`}
                          target="_blank"
                          download
                          color="primary"
                          size="small"
                        >
                          <CloudDownloadOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </>
    );
  } else return <></>;
}
