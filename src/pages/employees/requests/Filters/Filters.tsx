import { Grid, Paper, TextField, Menu, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import SelectCustom from "../../../../components/MuiCustom";
import { useReducer, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import reducer, { ActionTypes, FiltersInit } from "./reducer";
import { FilterType, OrderByType } from "./FilterType";
import { DateFormatString } from "../../../../constants/DateFormat";

function Filters(props: PropsType) {
  return (
    <Grid
      component={Paper}
      bgcolor={"Background"}
      container
      alignItems="end"
      sx={{
        p: 2,
        transition: "600ms",
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
          disableFuture
          value={dayjs(props.filters.sdate)}
          onChange={(newValue) => {
            props.dispatch({
              type: "SET_START_DATE",
              payload: newValue?.format(DateFormatString) || "",
            });
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <DatePicker
          label="تاريخ الانتهاء"
          sx={{ w: 1 }}
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(props.filters.edate)}
          onChange={(newValue) => {
            props.dispatch({
              type: "SET_END_DATE",
              payload: newValue?.format(DateFormatString) || "",
            });
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          label="الترتيب"
          size="small"
          select
          onChange={(e) => {
            props.dispatch({
              type: "SET_ORDER_BY",
              payload: e.target.value as OrderByType,
            });
          }}
        >
          <MenuItem value={"asc"}>تصاعدي</MenuItem>
          <MenuItem value={"desc"}>تنازلي</MenuItem>
        </TextField>
      </Grid>
      {/* <Grid item xs={2}>
        <SelectCustom
          disabled
          label="نوع الطلب"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectCustom
          disabled
          label="القسم"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectCustom
          disabled
          label="حالة الطلب"
          size="small"
          options={[{ name: "1", value: "1" }]}
        />
      </Grid> */}
    </Grid>
  );
}

export default Filters;

type PropsType = {
  opened: boolean;
  dispatch: React.Dispatch<ActionTypes>;
  filters: FilterType;
};
