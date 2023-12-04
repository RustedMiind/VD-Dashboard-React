import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { ClientRequest } from "../../../../types";
function TableHeader(props: PropsType) {
  function checkAllHandler(e: unknown, checked: boolean) {
    const allChecked: number[] = checked
      ? (props.requests
          ?.map((request) => request.id)
          .filter((id) => typeof id === "number") as number[])
      : [];
    props.setSelectedItems(allChecked);
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox checked={props.isAllSelected} onChange={checkAllHandler} />
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
  setSelectedItems: (items: number[]) => void;
  isAllSelected?: boolean;
};
