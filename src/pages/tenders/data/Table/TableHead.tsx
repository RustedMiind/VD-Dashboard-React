import {
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { useContext } from "react";
import { TableContext } from "../TableContext";

function TableHead() {
  const { tenderTableData, setSelectedTenderId, selectedTenderId } =
    useContext(TableContext);
  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof tenderTableData === "object"
        ? tenderTableData?.map((tender) => {
            return tender.id;
          })
        : [];
    if (checked) setSelectedTenderId && setSelectedTenderId(values || []);
    else setSelectedTenderId && setSelectedTenderId([]);
  };
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={selectedTenderId?.length === tenderTableData?.length}
            onChange={selectAllHandler}
          />
        </TableCell>
        <TableCell>الرقم المرجعي</TableCell>
        <TableCell>رقم المنافسة</TableCell>
        <TableCell>اسم العميل</TableCell>
        <TableCell>اسم المنافسة</TableCell>
        <TableCell>أخر موعد للتقديم</TableCell>
        <TableCell>تاريخ الإنتهاء من التقديم</TableCell>
        <TableCell>الوقت المتبقي للتقديم</TableCell>
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
