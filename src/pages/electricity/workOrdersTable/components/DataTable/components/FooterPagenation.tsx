import {
  Box,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

function FooterPagenation() {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} p={2}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Typography>المدخلات للصفحة</Typography>
        <TextField defaultValue={5} size="small" select>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={-1}>عرض الكل</MenuItem>
        </TextField>
      </Stack>
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
      <Box>
        <Typography variant="body1" component={NavLink} to={""}>
          عرض الكل
        </Typography>
      </Box>
    </Stack>
  );
}

export default FooterPagenation;
