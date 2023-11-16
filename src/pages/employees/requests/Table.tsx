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
  const PAGES = Math.ceil(props.requests.length / ROWS_PER_PAGE);

  const toView = props.requests.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

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
                      {request.employee.name}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell onClick={props.openDetails(request)}>
                    {requsetType}
                  </TableCell>
                  <TableCell>{request.departmentName || "-"}</TableCell>
                  <TableCell>{generateChip(request.status, request)}</TableCell>
                  <TableCell>...</TableCell>
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

      <Stack alignItems="center" py={2}>
        <Pagination
          count={PAGES}
          page={page}
          size="large"
          variant="text"
          color="primary"
          onChange={(e, p) => {
            setPage(p);
          }}
        />
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
            <Chip
              onClick={props.openModel(request)}
              color="primary"
              variant="filled"
              label="اتخاذ الاجراء"
            />
          );
        } else {
          chip = (
            <Chip
              color="primary"
              variant={variant}
              onClick={props.openStatus(request)}
              label="تحت الاجراء"
            />
          );
        }
        break;
      case 0:
        chip = <Chip color="error" variant={variant} label="مرفوض" />;
        break;
      case 1:
        chip = <Chip color="success" variant={variant} label="معتمد" />;
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
