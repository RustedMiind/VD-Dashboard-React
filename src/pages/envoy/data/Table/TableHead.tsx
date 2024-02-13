import {
  Checkbox,
  IconButton,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext } from "react";
import { EnvoysContext } from "../context";

function TableHead() {
  const { selectAllEnvoys, unselectAllEnvoys, isAllSelected } =
    useContext(EnvoysContext);

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={isAllSelected()}
            onChange={(e, checked) =>
              checked ? selectAllEnvoys() : unselectAllEnvoys()
            }
          />
        </TableCell>

        <TableCell>اسم المندوب</TableCell>

        <TableCell>رقم الجوال</TableCell>

        <TableCell>البريد الالكتروني</TableCell>
        <TableCell>المقاول </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
