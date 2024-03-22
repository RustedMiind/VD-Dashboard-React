import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import DoneAndReminder from "./DoneAndReminder";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type dialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditRaioDialog({ open, setOpen }: dialogProps) {
  const [ratio, setRatio] = React.useState("85.5");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Typography
          variant="h6"
          width={"32rem"}
          fontWeight={700}
          textAlign={"center"}
          marginTop={2}
        >
          تعديل نسب الانجاز الكلية
        </Typography>
        <DialogContent>
          <AddLabelToEl label="النسبة المئوية">
            <TextField
              onChange={(e) => setRatio(e.target.value)}
              value={ratio}
              size="small"
              placeholder="النسبة المئوية"
            />
          </AddLabelToEl>
          <br />
          <Grid container sx={{ paddingBottom: "1rem" }}>
            <Grid item xs={4}>
              <DoneAndReminder column={true} />
            </Grid>
            <Grid item xs={8} sx={{ marginTop: "3.4rem" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  position: "relative",
                  paddingX: "1rem",
                }}
              >
                <CircularProgress
                  style={{ width: "90px" }}
                  variant="determinate"
                  color={"warning"}
                  value={85.5}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    fontSize: "18px",
                    fontWeight: 900,
                    top: "8px",
                  }}
                  color={"warning"}
                  variant="body2"
                >
                  {ratio.length ? ratio : "0"}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sx={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                width: "60%",
                bgcolor: "primary.main",
                color: "#fff",
                marginY: "3px",
                transition: "all 0.5s ease-in-out",
                ":hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  transform: "scale(1.056)",
                  boxShadow: "1px 1px 3px 3px lightgray",
                },
              }}
            >
              حفظ
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "60%",
                border: "1px solid",
                marginY: "3px",
                transition: "all 0.5s ease-in-out",
                ":hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  transform: "scale(1.056)",
                  boxShadow: "1px 1px 3px 3px lightgray",
                },
              }}
              onClick={() => handleClose()}
            >
              عودة
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
