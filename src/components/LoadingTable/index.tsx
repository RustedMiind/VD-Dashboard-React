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

function LoadingTable(props: PropsType) {
  function randomWidth() {
    return Math.floor(Math.random() * 86) + 75;
  }
  const rows = generateUndefinedArray(props.rows) || 5;
  const cols = generateUndefinedArray(props.cols) || 20;
  return (
    <TableContainer sx={{ height: props.height || undefined }}>
      <Table aria-label="loadin table" stickyHeader>
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell>
                <Skeleton width={randomWidth()} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              {cols.map((col) => (
                <TableCell>
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
  cols: number;
  rows: number;
  height?: number;
};

export default LoadingTable;
