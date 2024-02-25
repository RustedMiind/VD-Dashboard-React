import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
  DialogProps,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { ShowMap } from "./Map";
import { SetStateAction } from "react";

function MapDialog({
  dialogProps,
  handleClose,
  setPosition,
  position,
}: PropsType) {
  // TODO::declare our state variables
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog
      sx={{ width: "90vw", height: "60vh" }}
      {...dialogProps}
      component={"form"}
    >
      <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
        قم بتحديد الموقع من الخريطة
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText color={"error.main"}>{error}</DialogContentText> */}
        <Grid container sx={{ width: "100%" }}>
          <ShowMap setPosition={setPosition} position={position} />
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingButton
          style={{ width: "25%" }}
          variant="contained"
          type="button"
          onClick={() => {
            enqueueSnackbar("تم حفظ الأحداثيات بنجاح");
            handleClose();
          }}
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  dialogProps: DialogProps;
  handleClose: () => void;
  position: [number, number];
  setPosition: React.Dispatch<SetStateAction<[number, number]>>;
};

export default MapDialog;
