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
import { EmployeeType, Vacation } from "../../../../types";
import { formatDate, getDateDiff } from "../../../../methods";
import { convertMsToDays } from "../../../../methods/conversions/msToDays";

const TableData = (props: PropsType) => {
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
              {props.vacations.map((vacation) => (
                <TableRow>
                  <TableCell>{vacation.name}</TableCell>
                  <TableCell>
                    {convertMsToDays(
                      getDateDiff(
                        new Date(vacation.date_from),
                        new Date(vacation.date_to)
                      )
                    )}
                  </TableCell>
                  <TableCell>{formatDate(vacation.date_from)}</TableCell>
                  <TableCell>{formatDate(vacation.date_to)}</TableCell>
                  <TableCell>
                    <Stack direction={"row"} gap={1}>
                      <IconButton onClick={props.openUpdateDialog(vacation)}>
                        <BorderColorOutlinedIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <RemoveRedEyeOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

type PropsType = {
  openUpdateDialog: (vacation: Vacation) => () => void;
  vacations: Vacation[];
};

export default TableData;
