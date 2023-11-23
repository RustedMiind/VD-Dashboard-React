import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>رقم العقد</TableCell>
        <TableCell>
          نوع العقد{" "}
          <IconButton aria-label="SwapVertIcon" color="primary">
            <SwapVertIcon />
          </IconButton>
        </TableCell>
        <TableCell>اسم العميل</TableCell>
        <TableCell>اسم الفرع</TableCell>
        <TableCell>تليفون العميل</TableCell>
        <TableCell>مدة العقد</TableCell>
        <TableCell>تاريخ انتهاء العقد</TableCell>
        <TableCell>المهندس المسؤول</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
