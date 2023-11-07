import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function Filters(props: PropsType) {
  return (
    <Grid
      component={Paper}
      bgcolor={"Background"}
      container
      alignItems="end"
      sx={{
        p: 2,
        transition: "300ms",
        position: "absolute",
        overflow: "hidden",
        opacity: props.opened ? 1 : 0,
        pointerEvents: props.opened ? "all" : "none",
        top: props.opened ? "110%" : 0,
        zIndex: 2,
        "> *": { px: 1 },
      }}
    >
      <Grid item xs={2}>
        {/* <Typography variant="body1" gutterBottom>
          تاريخ الورود
        </Typography> */}
        <DatePicker label="تاريخ الورود" sx={{ w: 1 }} />
      </Grid>
      <Grid item xs={2}>
        {/* <Typography variant="body1" gutterBottom>
          تاريخ الانتهاء
        </Typography> */}
        <DatePicker label="تاريخ الانتهاء" sx={{ w: 1 }} />
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">نوع الطلب</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="نوع الطلب"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">القسم</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="القسم"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">حالة الطلب</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="حالة الطلب"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">الترتيب</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="الترتيب"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Filters;

type PropsType = {
  opened?: boolean;
};
