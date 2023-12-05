import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { ClientRequest } from "../../../../types";
function TableHeader(props: PropsType) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={props.isAllSelected}
            onChange={(e, checked) => {
              props.checkAllHandler(checked);
            }}
          />
        </TableCell>
        <TableCell>اسم المالك</TableCell>
        <TableCell>رقم التليفون</TableCell>
        <TableCell>البريد الالكتروني</TableCell>
        <TableCell>رقم الهوية</TableCell>
        <TableCell>الفرع</TableCell>
        <TableCell>حالة مشاريع العمل</TableCell>
        <TableCell>اسم الوكيل</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
type PropsType = {
  requests: ClientRequest[] | null;
  isAllSelected: boolean;
  checkAllHandler: (checked: boolean) => void;
};
