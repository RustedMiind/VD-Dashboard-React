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
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useState } from "react";
import SetDialog from "../SetDialog";
import { EmployeeType } from "../../../../types";

const TableData = ({
  employeeRequest,
  vacationRequest,
  setVacationRequest,
}: PropsType) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Paper>
        <TableContainer
          sx={{
            minHeight: 500,
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>اسم الاجازة</TableCell>
                <TableCell>عدد الايام </TableCell>
                <TableCell>تاريخ البداية</TableCell>
                <TableCell>تاريخ النهاية</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>تعديل</TableCell>
                <TableCell>تعديل</TableCell>
                <TableCell>تعديل</TableCell>
                <TableCell>تعديل</TableCell>
                <TableCell>
                  <Stack direction={"row"} gap={1}>
                    <IconButton
                      aria-label="add to shopping cart"
                      onClick={() => {
                        setVacationRequest("put");
                        setOpen(true);
                      }}
                    >
                      <BorderColorOutlinedIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                    >
                      <RemoveRedEyeOutlinedIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <SetDialog
        vacationRequest={vacationRequest}
        open={open}
        handleClose={() => setOpen(false)}
        title="تعديل الاجازة"
        employeeRequest={employeeRequest}
      />
    </>
  );
};

type PropsType = {
  employeeRequest?: EmployeeType[] | undefined;
  vacationRequest: "post" | "put" | "null";
  setVacationRequest: React.Dispatch<
    React.SetStateAction<"post" | "put" | "null">
  >;
};

export default TableData;
