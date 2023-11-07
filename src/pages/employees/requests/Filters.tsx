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
import SelectCustom from "../../../components/MuiCustom";

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
        // position: "absolute",
        mt: 2,
        overflow: "hidden",
        opacity: props.opened ? 1 : 0,
        maxHeight: props.opened ? "100px" : 0,
        pointerEvents: props.opened ? "all" : "none",
        "> *": { px: 1 },
      }}
    >
      <Grid item xs={2}>
        {/* <Typography variant="body1" gutterBottom>
          تاريخ الورود
        </Typography> */}
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          label="تاريخ الورود"
          sx={{ w: 1 }}
        />
      </Grid>
      <Grid item xs={2}>
        {/* <Typography variant="body1" gutterBottom>
          تاريخ الانتهاء
        </Typography> */}
        <DatePicker
          label="تاريخ الانتهاء"
          sx={{ w: 1 }}
          slotProps={{ textField: { size: "small" } }}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectCustom
          label="نوع الطلب"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectCustom
          label="القسم"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectCustom
          label="حالة الطلب"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectCustom
          label="الترتيب"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid>
    </Grid>
  );
}

export default Filters;

type PropsType = {
  opened?: boolean;
};
