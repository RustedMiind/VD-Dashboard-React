import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import GridItem from "../GridItem";
import AddLabelToEl from "../../../components/AddLabelToEl";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DialogTitle } from "@mui/material";

function AddLocation({ open, setOpen }: propsType) {
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => setOpen(false)}
      component="form"
    >
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: 20,
          mt: 3,
          border: "solid 1px ",
          borderRadius: "8px",
        }}
        color="primary"
        onClick={() => setOpen(false)}
      >
        <GridCloseIcon fontSize="inherit" />
      </IconButton>

      <DialogTitle
        textAlign={"center"}
        fontWeight={600}
        pt={4}
        sx={{ bgcolor: "Background" }}
      >
        إضافة الموقع
      </DialogTitle>

      <DialogContent>
        <Paper>
          <Grid container spacing={2} component="form">
            <GridItem>
              <AddLabelToEl label="اسم الموقع" required>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"اسم الموقع"}
                />
              </AddLabelToEl>
            </GridItem>
            <GridItem>
              <AddLabelToEl label="المدينة" required>
                <TextField select size="small" placeholder="المدينة">
                  <MenuItem>{/* options */}</MenuItem>
                </TextField>
              </AddLabelToEl>
            </GridItem>
            <GridItem>
              <AddLabelToEl label="نظام البناء" required>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"نظام البناء"}
                />
              </AddLabelToEl>
            </GridItem>
            <GridItem>
              <AddLabelToEl label="الموقع" required>
                <TextField select size="small" placeholder="الموقع">
                  <MenuItem>{/* options */}</MenuItem>
                </TextField>
              </AddLabelToEl>
            </GridItem>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <LoadingButton variant="contained" type="submit">
          إضافة
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddLocation;

type propsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
