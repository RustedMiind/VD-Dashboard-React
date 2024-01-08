import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { NotPrintableTableCell } from "../Table";
function TableHeader(props: PropsType) {
  return (
    <TableHead>
      <TableRow>
        <NotPrintableTableCell>
          <Checkbox
            checked={props.isAllSelected}
            onChange={(e, checked) => {
              props.checkAllHandler(checked);
            }}
          />
        </NotPrintableTableCell>

        <TableCell>اسم المالك</TableCell>
        <TableCell>رقم التليفون</TableCell>
        <TableCell>البريد الالكتروني</TableCell>
        <TableCell>رقم الهوية</TableCell>
        <TableCell>الفرع</TableCell>
        <TableCell>حالة مشاريع العمل</TableCell>
        <TableCell>اسم الوكيل</TableCell>
        <NotPrintableTableCell></NotPrintableTableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
type PropsType = {
  isAllSelected: boolean;
  checkAllHandler: (checked: boolean) => void;
};
