import {
  Checkbox,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

export default function SingleRow() {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>
        <TextField variant="outlined" value={"2345"} size="small" />
      </TableCell>
      <TableCell>
        <FmdGoodIcon color="warning" />
      </TableCell>
      <TableCell>جدة</TableCell>
      <TableCell>محمد عبدالعزيز</TableCell>
      <TableCell>
        <Select value={"1"} size={"small"}>
          <MenuItem value={"1"}>item 1</MenuItem>
          <MenuItem value={"2"}>item 2</MenuItem>
        </Select>
      </TableCell>
      <TableCell>تكتب الملاحظات هنا..</TableCell>
      <TableCell>
        <Select value={"1"} size={"small"}>
          <MenuItem value={"1"}>item 1</MenuItem>
          <MenuItem value={"2"}>item 2</MenuItem>
        </Select>
      </TableCell>
      <TableCell>0124356789</TableCell>
      <TableCell>3 شهور</TableCell>
      <TableCell>
        <Select value={"1"} size={"small"}>
          <MenuItem value={"1"}>item 1</MenuItem>
          <MenuItem value={"2"}>item 2</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
}
