import {
  Box,
  Button,
  Chip,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { PanelData, StepStatusData } from "./types";
import { Dispatch, SetStateAction, useState } from "react";
import { formatDate } from "../../../methods";

const ClientTableComponent = ({
  requests,
  openStatus,
  openModel,
  openDetails,
  setRequests,
}: PropsType) => {
  const [rowsCount, setRowsCount] = useState(10);
  const view = requests.slice(0, rowsCount);

  function generateChip(request: PanelData): JSX.Element {
    const variant = "outlined";
    let chip: JSX.Element = <></>;

    switch (request.step_status_id) {
      case 1:
        chip = (
          <Button
            size="small"
            color="primary"
            sx={{ textDecoration: "underline !important", fontWeight: 700 }}
            onClick={openStatus(request)}
            id={request.id.toString()}
          >
            اتخاذ الاجراء
          </Button>
        );
        break;
      case 2:
        chip = (
          <Button
            size="small"
            color="primary"
            sx={{ textDecoration: "underline !important", fontWeight: 700 }}
            onClick={openStatus(request)}
          >
            تحت الاجراء
          </Button>
        );
        break;
      case 33:
        chip = (
          <Chip
            color="success"
            onClick={openStatus(request)}
            variant={variant}
            label="مقبول"
          />
        );
        break;
      case 100:
        chip = (
          <Chip
            color="success"
            onClick={openStatus(request)}
            variant={variant}
            label="معتمد"
          />
        );
        break;
      case 99:
        chip = (
          <Chip
            color="error"
            onClick={openStatus(request)}
            variant={variant}
            label="مرفوض"
          />
        );
        break;
      default:
        break;
    }

    return chip;
  }

  return (
    <>
      <TableContainer sx={{ minHeight: 500 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>رقم الطلب</TableCell>
              <TableCell>اسم العميل</TableCell>
              <TableCell>تاريخ الورود</TableCell>
              <TableCell>نوع العميل </TableCell>
              <TableCell>الفرع</TableCell>
              <TableCell>نوع الطلب</TableCell>
              <TableCell>القسم</TableCell>
              <TableCell>حالة الطلب</TableCell>
              <TableCell>الملاحظات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {view.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      maxWidth: 150,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {request.name}
                  </Box>
                </TableCell>
                <TableCell>{formatDate(request.created_date)}</TableCell>
                <TableCell>
                  {request.type === "individual" ? "فرد" : "شركة"}
                </TableCell>
                <TableCell>{request.branch_name}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    sx={{
                      minWidth: 0,
                      textDecoration: "underline !important",
                      fontWeight: 700,
                    }}
                    onClick={openDetails(request)}
                  >
                    {request.order_type_name}
                  </Button>
                </TableCell>
                <TableCell>
                  {request.order_step_form[0].order_step[0].department?.name ||
                    "----"}
                </TableCell>
                <TableCell id={`${request.step_status_id}`}>
                  {generateChip(request)}
                </TableCell>
                <TableCell>{request.note || "----"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {requests.length === 0 && (
          <Typography variant="h5" textAlign="center" p={2} py={4}>
            لم يتم ايجاد اي من الطلبات المطلوبة
          </Typography>
        )}
      </TableContainer>
      <Stack p={2} direction="row" alignItems="center" spacing={1}>
        <Typography> عدد العرض في الصفحة</Typography>
        <TextField
          size="small"
          value={rowsCount}
          select
          onChange={(e) => {
            setRowsCount(parseInt(e.target.value) || 10);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={2500}>2500</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
        </TextField>
      </Stack>
    </>
  );
};

type PropsType = {
  requests: PanelData[];
  openModel: (res: PanelData) => () => void;
  openStatus: (res: PanelData) => () => void;
  openDetails: (res: PanelData) => () => void;
  setRequests: Dispatch<
    SetStateAction<
      StepStatusData[] | PanelData[] | "loading" | "none" | "error"
    >
  >;
};

export default ClientTableComponent;
