import {
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  Checkbox,
} from "@mui/material";

function TableHead() {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>الرقم المرجعي</TableCell>
        <TableCell>رقم المنافسة</TableCell>
        <TableCell>الجهة الحكومية</TableCell>
        <TableCell>اسم المنافسة</TableCell>
        <TableCell>أخر موعد للتقديم</TableCell>
        <TableCell>تاريخ الإنتهاء من التقديم</TableCell>
        <TableCell>قيمة المنافسة</TableCell>
        <TableCell>مدة العقد</TableCell>
        <TableCell>القسم التابع له</TableCell>
        <TableCell>قبول القسم</TableCell>
        <TableCell>حالة المنافسة لدي الجهة</TableCell>
        <TableCell>حالة العرض الفني</TableCell>
        <TableCell>حالة العرض المالي</TableCell>
        <TableCell>حالة عرض التقديم</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
