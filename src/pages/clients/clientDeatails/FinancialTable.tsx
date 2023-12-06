import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(title: string, value: number, theme: string) {
  return { title, value, theme };
}

const rows = [
  createData("المدفوع", 5000, "green"),
  createData("المتبقي", 1000, "orange"),
  createData("المنتهي", 4000, "red"),
];

export default function BasicTable() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calcTotal = 0;
    for (let i = 0; i < rows.length; i++) {
      calcTotal += rows[i].value;
    }
    setTotal(calcTotal);
  }, []);

  return (
    <Paper elevation={2}>
      <TableContainer component={Paper} sx={{ bgcolor: "Background" }}>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              ".MuiTableCell-root": {
                bgcolor: "primary.light",
                color: "Background",
              },
            }}
          >
            <TableRow>
              <TableCell align="left">الإجمالي</TableCell>
              <TableCell align="right">{`${total}SAR`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{
                    color: `${row.theme}`,
                  }}
                >
                  {row.title}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${row.theme}`,
                  }}
                >{`${row.value}SAR`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
