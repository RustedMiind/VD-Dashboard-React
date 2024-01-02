import { DialogActions, IconButton, Typography } from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { GridCloseIcon } from "@mui/x-data-grid";
import RequiredSymbol from "../../../../../../components/RequiredSymbol";

export default function SetDialog({
  open,
  setOpen,
  handleOpenDialog,
}: TypeProps) {
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleOpenDialog}
        component="form"
        // onSubmit={handleSubmit}
      >
        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            position: "absolute",
            right: 20,
            mt: 3,
            border: "solid 1px ",
            borderRadius: "8px",
          }}
          color="primary"
          onClick={handleOpenDialog}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>
        <DialogTitle textAlign={"center"} fontWeight={600}>
          اضافة بند
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid p={1} item md={6}>
              <Typography>
                اسم البند
                <RequiredSymbol />
              </Typography>
              <TextField size="small" fullWidth placeholder="اسم البند " />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>العدد</Typography>
              <TextField placeholder="العدد" fullWidth size="small" />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> المساحة</Typography>
              <TextField fullWidth size="small" placeholder="المساحة" />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> وصف البند</Typography>
              <TextField fullWidth size="small" placeholder="وصف البند" />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> المدة</Typography>
              <TextField fullWidth size="small" placeholder="المدة" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            // loading={sendState === "loading"}
            variant="contained"
            type="submit"
          >
            اضافة
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type TypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenDialog: () => void;
};
