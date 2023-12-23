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
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Vacation } from "../../../../types";
import { formatDate, getDateDiff } from "../../../../methods";
import { convertMsToDays } from "../../../../methods/conversions/msToDays";
import { NotPrintableTableCell } from "../../../clients/data/Table";
import { useEffect, useRef } from "react";

const TableData = (props: PropsType) => {
  return (
    <>
      <Paper>
        <TableContainer
          sx={{
            minHeight: 500,
          }}
        >
          <Table aria-label="simple table" ref={props.tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>اسم الاجازة</TableCell>
                <TableCell>عدد الايام </TableCell>
                <TableCell>تاريخ البداية</TableCell>
                <TableCell>تاريخ النهاية</TableCell>
                <NotPrintableTableCell>الاعدادات </NotPrintableTableCell>
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
                    )}{" "}
                    يوم
                  </TableCell>
                  <TableCell>{formatDate(vacation.date_from)}</TableCell>
                  <TableCell>{formatDate(vacation.date_to)}</TableCell>
                  <NotPrintableTableCell>
                    <Stack direction={"row"} gap={1}>
                      <IconButton onClick={props.openUpdateDialog(vacation)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Stack>
                  </NotPrintableTableCell>
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
  tableRef: React.RefObject<HTMLTableElement>;
};

export default TableData;
