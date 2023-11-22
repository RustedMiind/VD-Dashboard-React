import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Typography,
  Box,
  Pagination,
  Stack,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { EmployeeRequest } from "../../../types";
import { formatDate } from "../../../methods";
import { requestTypes } from "./RequestTypes";
import { useState } from "react";

/*
-1 pending
1 active
0 rejected
*/

function EmployeesRequestsTable(props: PropsType) {
  const ROWS_PER_PAGE = 8;
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(10);
  const PAGES = Math.ceil(props.requests.length / ROWS_PER_PAGE) || 1;

  // const toView = props.requests.slice(
  //   (page - 1) * ROWS_PER_PAGE,
  //   page * ROWS_PER_PAGE
  // );
  const toView = props.requests.slice(0, rowsCount);

  return (
    <>
      <TableContainer sx={{ minHeight: 500 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>رقم الطلب</TableCell>
              <TableCell>اسم الموظف</TableCell>
              <TableCell>تاريخ الورود</TableCell>
              <TableCell>نوع الطلب</TableCell>
              <TableCell>القسم</TableCell>
              <TableCell>حالة الطلب</TableCell>
              <TableCell>الملاحظات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toView.map((request, index) => {
              const requsetType = requestTypes.find((x) =>
                request.requestable_type
                  .toLowerCase()
                  .includes(x.prefix.toLowerCase())
              )?.name;
              const note =
                request.checkedSteps &&
                request.checkedSteps[request.checkedSteps.length - 1]
                  ?.model_details?.note;
              return (
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
                      {request.employee?.name}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      sx={{
                        minWidth: 0,
                        textDecoration: "underline !important",
                        fontWeight: 700,
                      }}
                      onClick={props.openDetails(request)}
                    >
                      {requsetType}
                    </Button>
                  </TableCell>
                  <TableCell>{request.departmentName || "-"}</TableCell>
                  <TableCell>{generateChip(request.status, request)}</TableCell>
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
                      {note || "..."}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {props.requests.length === 0 && (
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

  function generateChip(value: number, request: EmployeeRequest): JSX.Element {
    const variant = "outlined";
    const HAS_ACCESS = request.nextStep && request.nextStep.hasAccess;
    let chip: JSX.Element = <></>;

    switch (value) {
      case -1:
        if (HAS_ACCESS) {
          chip = (
            <Button
              size="small"
              color="primary"
              sx={{ textDecoration: "underline !important", fontWeight: 700 }}
              onClick={props.openModel(request)}
            >
              اتخاذ الاجراء
            </Button>
          );
        } else {
          chip = (
            <Button
              size="small"
              color="primary"
              sx={{ textDecoration: "underline !important", fontWeight: 700 }}
              onClick={props.openStatus(request)}
            >
              تحت الاجراء
            </Button>
          );
        }
        break;
      case 0:
        chip = (
          <Chip
            color="error"
            onClick={props.openStatus(request)}
            variant={variant}
            label="مرفوض"
          />
        );
        break;
      case 1:
        chip = (
          <Chip
            color="success"
            onClick={props.openStatus(request)}
            variant={variant}
            label="مقبول"
          />
        );
        break;
      case 2:
        chip = (
          <Chip
            color="success"
            onClick={props.openStatus(request)}
            variant={variant}
            label="معتمد"
          />
        );
        break;
      default:
        break;
    }

    return chip;
  }
}

type PropsType = {
  requests: EmployeeRequest[];
  openModel: (r: EmployeeRequest) => () => void;
  openStatus: (r: EmployeeRequest) => () => void;
  openDetails: (r: EmployeeRequest) => () => void;
};

export default EmployeesRequestsTable;
