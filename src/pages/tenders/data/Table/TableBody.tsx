import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { generateUndefinedArray } from "../../../../methods";

const arr = generateUndefinedArray(30);

function TableBody() {
  return (
    <MuiTableBody>
      {arr.map(() => (
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>02</TableCell>
          <TableCell>5362</TableCell>
          <TableCell>جهة حكومية</TableCell>
          <TableCell>جهة حكومية</TableCell>
          <TableCell>12/5/2015</TableCell>
          <TableCell>13/9/2025</TableCell>
          <TableCell>غير مدفوع</TableCell>
          <TableCell>سنة</TableCell>
          <TableCell>قسم الموارد</TableCell>
          <TableCell>مقبول</TableCell>
          <TableCell>مقدمة</TableCell>
          <TableCell>منتهي</TableCell>
          <TableCell>جاري</TableCell>
          <TableCell>مستبعد فني</TableCell>
          <TableCell>
            <NavLink to={"test"}>
              <IconButton color="primary">
                <SettingsIcon />
              </IconButton>
            </NavLink>
          </TableCell>
        </TableRow>
      ))}
    </MuiTableBody>
  );
}

export default TableBody;
