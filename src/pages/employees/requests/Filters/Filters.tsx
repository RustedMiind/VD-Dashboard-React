import { Grid, Paper, TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ActionTypes } from "./reducer";
import { FilterType, OrderByType } from "./FilterType";
import { DateFormatString } from "../../../../constants/DateFormat";
import { RequestStatusType } from "../../procedures/types";
import { Department } from "../../../../types";
import axios from "axios";
import { Api } from "../../../../constants";
import { requestTypes } from "../RequestTypes";

function Filters(props: PropsType) {
  const [departments, setDepartments] = useState<undefined | Department[]>(
    undefined
  );

  useEffect(() => {
    axios
      .get<{ departments: Department[] }>(Api("employee/all-departments"))
      .then((res) => {
        setDepartments(res.data.departments);
      });
  }, [props.opened]);

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
      <Grid item xs={2}>
        <TextField
          fullWidth
          label="حالة الطلب"
          size="small"
          select
          value={props.filters.status}
          onChange={(e) => {
            props.dispatch({
              type: "SET_STATUS",
              payload: e.target.value as unknown as
                | RequestStatusType
                | undefined,
            });
          }}
        >
          <MenuItem value={undefined}>كل الحالات</MenuItem>
          <MenuItem value={-1}>تحت الاجراء</MenuItem>
          <MenuItem value={0}>مرفوض</MenuItem>
          <MenuItem value={1}>مقبول</MenuItem>
          <MenuItem value={2}>معتمد</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          label="القسم"
          size="small"
          select
          value={props.filters.department_id}
          onChange={(e) => {
            props.dispatch({
              type: "SET_DEPARTMENT",
              payload: e.target.value as unknown as number | null,
            });
          }}
        >
          <MenuItem value={0}>كل الاقسام</MenuItem>
          {departments?.map((department) => (
            <MenuItem value={department.id}>{department.name}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          label="نوع الطلب"
          size="small"
          select
          value={props.filters.status}
          onChange={(e) => {
            if (typeof e.target.value === "number" && e.target.value > 0) {
              props.setSelectedType(e.target.value as unknown as number);
            } else {
              props.setSelectedType(undefined);
            }
          }}
        >
          <MenuItem value={0}>كل الانواع</MenuItem>
          {requestTypes.map((reqType) => (
            <MenuItem value={reqType.value}>{reqType.name}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

export default Filters;

type PropsType = {
  opened: boolean;
  dispatch: React.Dispatch<ActionTypes>;
  filters: FilterType;
  selectedType: number | undefined;
  setSelectedType: React.Dispatch<React.SetStateAction<number | undefined>>;
};
