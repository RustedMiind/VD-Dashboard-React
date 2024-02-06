import { Box, Typography } from "@mui/material";
import { DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import img1 from "../../../../../../../assets/images/Vector.png";

function SubmitTypeDialog({
  submitWithoutStatus,
  submitWithStatus,
  ...dialogProps
}: PropsType) {
  return (
    <Dialog fullWidth maxWidth="xs" {...dialogProps}>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          rowGap={2}
        >
          <img width={0.8} src={img1} alt="" />
          <Typography
            variant="body2"
            sx={{ fontWeight: "800", textAlign: "center", py: 1 }}
          >
            هل تريد الحفظ مع تغيير الحالة ام الحفظ فقط ؟
          </Typography>
          {/* <Button variant="outlined">حفظ مع تغيير الحالة</Button>
          <Button variant="contained">حفظ</Button> */}

          <Button onClick={submitWithoutStatus}>الحفظ فقط</Button>
          <Button variant="contained" onClick={submitWithStatus}>
            الحفظ مع تغيير الحالة
          </Button>
        </Box>
      </DialogContent>
      {/* <DialogTitle>هل تريد الحفظ مع ارسال الحالة</DialogTitle>
      <DialogActions>
        <Button onClick={submitWithoutStatus}>الحفظ فقط</Button>
        <Button variant="contained" onClick={submitWithStatus}>
          الحفظ مع تغيير الحالة
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

type PropsType = {
  submitWithoutStatus: () => void;
  submitWithStatus: () => void;
} & DialogProps;

export default SubmitTypeDialog;
