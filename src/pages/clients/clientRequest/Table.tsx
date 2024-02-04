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
import { useState } from "react";
import { formatDate } from "../../../methods";
import { ActionTypes } from "./Filter/reducer";
import NonRoundedChip from "../../../components/NonRoundedChip";

const ClientTableComponent = ({
  requests,
  openStatus,
  openModel,
  openDetails,
  tableRef,
  dispatch,
  limit,
}: PropsType) => {
  const [rowsCount, setRowsCount] = useState(limit);
  function generateChip(request: PanelData | StepStatusData): JSX.Element {
    const variant = "outlined";
    let chip: JSX.Element = <></>;
    switch (parseInt(request.step_status_id)) {
      case 0:
        chip = (
          <Button
            size="small"
            color="primary"
            sx={{ textDecoration: "underline !important", fontWeight: 700 }}
            onClick={openModel(request)}
            id={request.id.toString()}
          >
            اتخاذ الاجراء
          </Button>
        );
        break;
      case 1:
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
      case 18:
        chip = (
          <NonRoundedChip
            color="success"
            onClick={openStatus(request)}
            variant={variant}
            label="مقبول"
          />
        );
        break;
      case 33:
        chip = (
          <NonRoundedChip
            color="success"
            onClick={openStatus(request)}
            variant={variant}
            label="معتمد"
          />
        );
        break;
      case 19:
        chip = (
          <NonRoundedChip
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
      <TableContainer sx={{ minHeight: 500 }} ref={tableRef}>
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
            {requests.map((request) => {
              // const department =
              //   request.order_step_form[0] &&
              //   request.order_step_form[0].order_step &&
              //   request.order_step_form[0].order_step[0] &&
              //   request.order_step_form[0].order_step[0].department;
              return (
                <TableRow key={request.id}>
                  <TableCell>{request.order_id}</TableCell>
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
                      {request.order.client.name}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell>
                    {request.order.client.type === "individual"
                      ? "فرد"
                      : "شركة"}
                  </TableCell>
                  <TableCell>{request.order.client.branch?.name}</TableCell>
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
                      {request.order.order_type.name}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {request?.department?.name ? request?.department?.name : ""}
                  </TableCell>
                  <TableCell id={`${request.step_status_id}`}>
                    {generateChip(request)}
                  </TableCell>
                  <TableCell>{request.note || "----"}</TableCell>
                </TableRow>
              );
            })}
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
            setRowsCount(parseInt(e.target.value));
            dispatch({
              type: "SET_LIMIT",
              payload: parseInt(e.target.value),
            });
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={2500}>2500</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={-1}>الكل</MenuItem>
        </TextField>
      </Stack>
    </>
  );
};

type PropsType = {
  requests: PanelData[];
  openModel: (res: PanelData | StepStatusData) => () => void;
  openStatus: (res: PanelData | StepStatusData) => () => void;
  openDetails: (res: PanelData | StepStatusData) => () => void;
  tableRef: React.RefObject<HTMLTableElement>;
  dispatch: React.Dispatch<ActionTypes>;
  limit: number | undefined;
};

export default ClientTableComponent;
