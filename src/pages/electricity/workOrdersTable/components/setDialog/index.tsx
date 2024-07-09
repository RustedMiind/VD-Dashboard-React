import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";

function SetDialog({ open, handleClose }: PropsType) {
  return (
    <Dialog maxWidth={"xs"} fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "700" }}>
        هل تريد تاكيد اسناد الاوامر التاليه:
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Chip
              label="3245632"
              variant="outlined"
              sx={{ width: 1, fontSize: "1rem" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Chip
              label="3245632"
              variant="outlined"
              sx={{ width: 1, fontSize: "1rem" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Chip
              label="3245632"
              variant="outlined"
              sx={{ width: 1, fontSize: "1rem" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Chip
              label="3245632"
              variant="outlined"
              sx={{ width: 1, fontSize: "1rem" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Chip
              label="3245632"
              variant="outlined"
              sx={{ width: 1, fontSize: "1rem" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              نعم
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClose} variant="outlined" fullWidth>
              لا
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  handleClose: () => void;
};
export default SetDialog;
