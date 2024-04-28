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
import { ContractDetailsContext } from "../../../..";
import { useContext, useEffect, useMemo } from "react";
import LimitTypography from "../../../../../../../components/LimitTypograpgy";
import { formatDate } from "../../../../../../../methods";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../../../../../../../constants";
import { Tender } from "../../../../../../../types";
import AttachmentsTable from "../../../../../../../components/AttachmentsTable";
import { Media } from "../../../../../../../types/Media";

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
  // const { tender } = useContext(TenderDataContext);
  const { contract } = useContext(ContractDetailsContext);
  // const { id } = useParams();
  function convertBytetoMB(byte: number): string {
    const mb = `${(byte / 1024 ** 2).toFixed(2)}MB`;
    return mb;
  }

  const processingsAttachments = useMemo(() => {
    const media: Media[] = [];
    contract?.contract_items?.forEach((item) => {
      if (item.media) media.push(...media);
    });
    return media;
  }, [contract?.id]);

  if (contract) {
    return (
      <>
        {contract.contract_details?.media && (
          <AttachmentsTable
            label="مرفقات العقد"
            media={contract.contract_details.media}
          />
        )}

        <AttachmentsTable
          label="مرفقات البنود"
          media={processingsAttachments}
        />

        {/* <Stack component={Paper} bgcolor={"Background"} p={2}>
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
                          href={`${tender.pictures?.file_finacial_tender?.[0]?.original_url}`}
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
                          {tender.pictures.file_finacial_tender?.[0]?.name}
                        </LimitTypography>
                      </TableCell>
                      <TableCell>
                        {tender.pictures.file_finacial_tender?.[0]?.mime_type}
                      </TableCell>
                      <TableCell>
                        {convertBytetoMB(
                          tender.pictures.file_finacial_tender?.[0]?.size
                        )}
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {formatDate(
                          tender.pictures.file_finacial_tender?.[0]?.created_at
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          component={`a`}
                          href={`${tender.pictures.file_finacial_tender?.[0]?.original_url}`}
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
                          href={`${tender.pictures?.technical_tender?.[0]?.original_url}`}
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
                          {tender.pictures?.technical_tender?.[0]?.name}
                        </LimitTypography>
                      </TableCell>
                      <TableCell>
                        {tender.pictures?.technical_tender?.[0]?.mime_type}
                      </TableCell>
                      <TableCell>
                        {convertBytetoMB(
                          tender.pictures?.technical_tender?.[0]?.size
                        )}
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {formatDate(
                          tender.pictures?.technical_tender?.[0]?.created_at
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          component={`a`}
                          href={`${tender.pictures?.technical_tender?.[0]?.original_url}`}
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
        </Stack> */}
      </>
    );
  } else return <></>;
}
