import { Button, Grid, MenuItem, TextField } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import AddDialog from "../AddDialog";
import ErrorDialog from "../ErrorDialog";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function FilterDetails(props: PropsType) {
  const { branchId } = useParams();
  const [massage, setMassage] = useState<string>("");

  return (
    <Grid container width={1} py={2}>
      <Grid container spacing={2} md={10}>
        <Grid item xs={2}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"العام"}
            openTo="year"
            disablePast
            views={["year"]}
            value={dayjs(props.yearFilter)}
            onChange={(date) => {
              props.setYearFilter(date?.format() || "");
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            fullWidth
            label="الحالة"
            size="small"
            sx={{ color: "primary" }}
            value={props.statusFilter}
            onChange={(e) => {
              props.setStatusFilter(parseInt(e.target.value));
            }}
          >
            <MenuItem value={-1}>الكل</MenuItem>
            <MenuItem value={34}>مسودة</MenuItem>
            <MenuItem value={35}>معتمد</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid item md={2}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          onClick={props.openAddDialog}
        >
          <AddCircleOutlineRoundedIcon sx={{ mr: 1 }} />
          إضافة محدد
        </Button>
      </Grid>
      {branchId && (
        <AddDialog
          setData={props.setTableData}
          open={props.dialogState === "add"}
          branch_id={branchId}
          onClose={props.closeDialog}
          openErrorDialog={props.openErrorDialog}
          openAddDialog={props.openAddDialog}
          setMassage={setMassage}
        />
      )}
      <ErrorDialog
        open={props.dialogState === "error"}
        onClose={props.openAddDialog}
        massage={massage}
      />
    </Grid>
  );
}

export type DialogState = "none" | "error" | "add" | "details";

export default FilterDetails;

type PropsType = {
  closeDialog: () => void;
  openErrorDialog: () => void;
  openAddDialog: () => void;
  dialogState: DialogState;
  setTableData: () => void;
  statusFilter: number;
  setStatusFilter: (status: number) => void;
  yearFilter: string | null;
  setYearFilter: (year: string | null) => void;
};
