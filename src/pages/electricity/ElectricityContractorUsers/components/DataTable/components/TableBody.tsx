import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";

export default function TableBodyData() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>الاسم</TableCell>
        <TableCell>رقم الجوال</TableCell>
        <TableCell>اسم المستخدم</TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>الاسم</TableCell>
        <TableCell>رقم الجوال</TableCell>
        <TableCell>اسم المستخدم</TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>الاسم</TableCell>
        <TableCell>رقم الجوال</TableCell>
        <TableCell>اسم المستخدم</TableCell>
      </TableRow>
    </TableBody>
  );
}
