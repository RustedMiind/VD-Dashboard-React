import { Button, Grid, MenuItem, TextField } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { DatePicker } from "@mui/x-date-pickers";
import AddDialog from "../AddDialog";
import { useState } from "react";
import { useParams } from "react-router";
import ErrorDialog from "../ErrorDialog";

function FilterDetails() {
  const { branchId } = useParams();

  const [dialogState, setDialogState] = useState<DialogState>("none");
  const closeDialog = () => {
    setDialogState("none");
  };
  const openErrorDialog = () => {
    setDialogState("error");
  };
  const openAddDialog = () => {
    setDialogState("add");
  };
  const openDetailsDialog = () => {
    setDialogState("details");
  };

  return (
    <Grid container width={1} py={2}>
      <Grid container spacing={2} md={10}>
        <Grid item xs={2}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={'"العام"'}
            openTo="year"
            disableFuture
            views={["year"]}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            fullWidth
            label="الحالة"
            size="small"
            sx={{ color: "primary" }}
          >
            <MenuItem value={10}>معتمد</MenuItem>
            <MenuItem value={20}>مسودة</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid item md={2}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          onClick={() => {
            openAddDialog();
          }}
        >
          <AddCircleOutlineRoundedIcon sx={{ mr: 1 }} />
          إضافة محدد
        </Button>
        {branchId && (
          <AddDialog
            open={dialogState === "add"}
            branch_id={branchId}
            onClose={closeDialog}
            openErrorDialog={openErrorDialog}
            openAddDialog={openAddDialog}
          />
        )}
        <ErrorDialog
          open={dialogState === "error"}
          onClose={openAddDialog}
          massage={"error message"}
        />
      </Grid>
    </Grid>
  );
}

export default FilterDetails;

export type DialogState = "none" | "error" | "add" | "details";
