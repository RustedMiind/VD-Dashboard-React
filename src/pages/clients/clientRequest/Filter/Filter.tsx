import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { DateFormatString } from "../../../../constants/DateFormat";
import { ActionTypes } from "./reducer";
import dayjs from "dayjs";
import { Filter, OrderByType } from "../types";
import { requestTypes } from "../RequestTypes";
import axios from "axios";
import { Api } from "../../../../constants";

const FilterComponent = ({
  opened,
  dispatch,
  filters,
  setSelectedType,
}: PropsType) => {
  const [department, setDepartment] = useState<undefined | []>(undefined);

  useEffect(() => {
    axios
      .get<{ department: [] }>(Api("employee/client/order/steps/use"))
      .then((res) => {
        setDepartment(res.data?.department);
      });
  }, [opened]);
  return (
    <Grid
      component={Paper}
      bgcolor={"Background"}
      container
      alignItems="end"
      sx={{
        p: 2,
        transition: "600ms",
        mt: 2,
        overflow: "hidden",
        opacity: opened ? 1 : 0,
        maxHeight: opened ? "100px" : 0,
        pointerEvents: opened ? "all" : "none",
        "> *": { px: 1 },
      }}
    >
      <Grid item xs={2}>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          label="تاريخ الورود"
          sx={{ w: 1 }}
          disableFuture
          value={dayjs(filters.dateFrom)}
          onChange={(newValue) => {
            dispatch({
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
          value={dayjs(filters.dateTo)}
          onChange={(newValue) => {
            dispatch({
              type: "SET_END_DATE",
              payload: newValue?.format(DateFormatString) || "",
            });
          }}
        />
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          label="نوع الطلب"
          size="small"
          select
          value={filters.typeOrder}
          onChange={(e) => {
            if (typeof e.target.value === "number" && e.target.value > 0) {
              setSelectedType(e.target.value as unknown as number);
            } else {
              setSelectedType(undefined);
            }
          }}
        >
          <MenuItem value={0}>كل الانواع</MenuItem>
          {requestTypes.map((reqType) => (
            <MenuItem
              key={reqType.value}
              disabled={reqType.disabled}
              value={reqType.value}
            >
              {reqType.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          label="القسم"
          size="small"
          select
          value={filters.branch_id}
          onChange={(e) => {
            dispatch({
              type: "SET_BRANCH",
              payload: e.target.value as unknown as number | null,
            });
          }}
        >
          <MenuItem value={0}>كل الاقسام</MenuItem>
          {department?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          label="حالة الطلب"
          size="small"
          select
          value={filters.statusOrder}
          onChange={(e) => {
            dispatch({
              type: "SET_ORDER_STATUS",
              payload: e.target.value as unknown as number | undefined,
            });
          }}
        >
          <MenuItem value={0}>كل الحالات</MenuItem>
          <MenuItem value={1}>تحت الاجراء</MenuItem>
          <MenuItem value={99}>مرفوض</MenuItem>
          <MenuItem value={100}>مقبول</MenuItem>
          <MenuItem value={33}>معتمد</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          label="الترتيب"
          size="small"
          select
          value={filters.sortBy}
          onChange={(e) => {
            dispatch({
              type: "SET_ORDER_BY_SORT",
              payload: e.target.value as OrderByType,
            });
          }}
        >
          <MenuItem value={0}>تصاعدي</MenuItem>
          <MenuItem value={"desc"}>تنازلي</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

type PropsType = {
  opened: boolean;
  dispatch: React.Dispatch<ActionTypes>;
  filters: Filter;
  setSelectedType: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default FilterComponent;
