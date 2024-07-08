import { Checkbox, TableCell, TableRow } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import IconButton from "@mui/material/IconButton";

function TableHeader() {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>رقم امر العمل</TableCell>
      <TableCell>رمز امر العمل</TableCell>
      <TableCell>تاريخ الاسناد</TableCell>
      <TableCell>اسم المقاول </TableCell>
      <TableCell>الحي</TableCell>
      <TableCell>مدة التنفيذ</TableCell>
      <TableCell>الموقع</TableCell>
      <TableCell>حالة امر العمل</TableCell>
      <TableCell>نوع امر العمل</TableCell>
      <TableCell>الادارة / القسم</TableCell>
      <TableCell>التكلفة التقديرية</TableCell>
      <TableCell>اخر اجراء</TableCell>
      <TableCell>المرفقات</TableCell>
    </TableRow>
  );
}

export default TableHeader;
