import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { ClientRequest } from "../../../../types";
function TableHeader(props: PropsType) {
  const style = {
    background: "#F3F5F7",
    fontSize: "16px",
    fontWeight: "bold",
  };

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
        <TableCell sx={style}>
          <Checkbox checked={props.isAllSelected} onChange={checkAllHandler} />
        </TableCell>
        <TableCell sx={style}>اسم المالك</TableCell>
        <TableCell sx={style}>رقم التليفون</TableCell>
        <TableCell sx={style}>البريد الالكتروني</TableCell>
        <TableCell sx={style}>رقم الهوية</TableCell>
        <TableCell sx={style}>الفرع</TableCell>
        <TableCell sx={style}>حالة مشاريع العمل</TableCell>
        <TableCell sx={style}>اسم الوكيل</TableCell>
        <TableCell sx={style}></TableCell>
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
