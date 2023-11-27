import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
function TableHeader(props: any) {
  const style = {
    background: "#F3F5F7",
    fontSize: "16px",
    fontWeight: "bold",
  };

  function checkAllHandler(e: any) {
    const allChecked: number[] = props.requests?.reduce(
      (accumlator: any, newValue: any) => {
        if (
          !newValue.contracts?.length &&
          newValue.Contract_status !== "منتهي"
        ) {
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
        <TableCell sx={style}>
          <Checkbox onClick={checkAllHandler} />
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
