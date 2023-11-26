import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
export default function TableHeader({ value }: PropType) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>رقم العقد</TableCell>
        <TableCell>
          {value === 0 ? "نوع العقد" : "تاريخ الورود"}
          <IconButton aria-label="SwapVertIcon" color="primary">
            <SwapVertIcon />
          </IconButton>
        </TableCell>
        <TableCell>{value === 0 ? "اسم العميل " : "النوع"}</TableCell>
        <TableCell>{value === 0 ? "الفرع" : "المالك"}</TableCell>
        <TableCell>{value === 0 ? " تليفون العميل " : "الفرع"}</TableCell>
        <TableCell>{value === 0 ? "مدة العقد" : "اسم الاداره"}</TableCell>
        <TableCell>{value === 0 ? "تاريخ انتهاء العقد" : "الحاله"}</TableCell>
        <TableCell>
          {value === 0 ? "المهندس المسؤول" : "الحاله السابقه"}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
export type PropType = {
  value: number;
};
