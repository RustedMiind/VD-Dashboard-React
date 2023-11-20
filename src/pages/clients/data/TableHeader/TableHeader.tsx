import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
function TableHeader(props: any) {
  const bgTable = "#F3F5F7";

  function checkAllHandler(e: any) {
    const allChecked: number[] = props.requests?.reduce(
      (accumlator: any, newValue: any) => {
        if (!newValue.contracts?.length) {
          accumlator.push(newValue.id);
        }
        return accumlator;
      },
      []
    );

    if (e.target.checked) {
      props.setSelectedItems(allChecked);
    } else {
      props.setSelectedItems([]);
    }
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ backgroundColor: bgTable }}>
          <Checkbox onClick={checkAllHandler} />
        </TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}>اسم المالك</TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}>رقم التليفون</TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}>
          البريد الالكتروني
        </TableCell>
        <TableCell sx={{ backgroundColor: bgTable, textAlign: "center" }}>
          رقم الهوية
        </TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}>الفرع</TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}>
          حالة مشاريع العمل
        </TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}>اسم الوكيل</TableCell>
        <TableCell sx={{ backgroundColor: bgTable }}></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
