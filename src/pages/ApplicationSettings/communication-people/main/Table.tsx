import {
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableBodyProps,
  Paper,
} from "@mui/material";

function Table(props: TableBodyProps) {
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> اسم العميل </TableCell>
            <TableCell>رقم العميل</TableCell>
            <TableCell sx={{ textAlign: "center" }}>الاعدادات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody {...props}></TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
