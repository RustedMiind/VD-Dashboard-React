import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ClientDetailsType } from "../../../types/Clients";
import { Typography } from "@mui/material";

function createData(title: string, value: number, theme: string) {
  return { title, value, theme };
}

export default function BasicTable({ clientData }: PropsType) {
  const rows = [
    createData(
      "المدفوع",
      clientData?.payment?.amount_payment as number,
      "warning.main"
    ),
    createData(
      "المتبقي",
      clientData?.payment?.amount_motabaky as number,
      "success.main"
    ),
    createData(
      "المطلوب",
      clientData?.payment?.amount_required as number,
      "primary.main"
    ),
  ];
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calcTotal = 0;
    for (let i = 0; i < rows.length; i++) {
      calcTotal += rows[i].value;
    }

    setTotal(calcTotal);
  }, [clientData?.payment?.amount_required]);

  return (
    <Paper elevation={2}>
      <TableContainer component={Paper} sx={{ bgcolor: "Background" }}>
        <Table size="small">
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
              <TableCell align="right">
                <Typography display={"inline-block"}>SAR</Typography> {total}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell
                  component="th"
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
                >
                  <Typography display={"inline-block"}>SAR</Typography>{" "}
                  {row.value && `${row.value}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
type PropsType = {
  clientData: ClientDetailsType | null;
};
