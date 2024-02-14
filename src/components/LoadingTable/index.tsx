import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Skeleton,
} from "@mui/material";
import { generateUndefinedArray } from "../../methods";

function LoadingTable({ rows = 5, cols = 12, height }: PropsType) {
  function randomWidth() {
    return 80; //Math.floor(Math.random() * 50) + 50;
  }
  const rowsArr = generateUndefinedArray(rows);
  const colsArr = generateUndefinedArray(cols);
  return (
    <TableContainer sx={{ height: height || undefined }}>
      <Table aria-label="loadin table">
        <TableHead>
          <TableRow>
            {colsArr.map((col) => (
              <TableCell key={Math.random()}>
                <Skeleton width={randomWidth()} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsArr.map((row) => (
            <TableRow key={Math.random()}>
              {colsArr.map((col) => (
                <TableCell key={Math.random()}>
                  <Skeleton width={randomWidth()} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type PropsType = {
  cols?: number;
  rows?: number;
  height?: number;
};

export default LoadingTable;
