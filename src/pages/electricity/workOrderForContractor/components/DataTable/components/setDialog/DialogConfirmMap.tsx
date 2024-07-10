import { DialogContent, Typography } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";

function DialogConfirmMap({
  handleConfirmMap,
  open,
  handleCloseMap,
}: PropsType) {
  return (
    <>
      <Dialog open={open} onClose={handleConfirmMap} maxWidth="sm">
        <DialogContent sx={{ paddingY: 5 }}>
          <Typography variant="body1" fontSize={16} fontWeight={600}>
            لم يتم حفظ المسار هل تريد الحفظ؟
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", flexDirection: "column", paddingX: 5, gap: 2 }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              handleCloseMap();
              handleConfirmMap();
            }}
          >
            حفظ
          </Button>
          <Button variant="text" fullWidth onClick={handleConfirmMap}>
            رجوع
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
type PropsType = {
  open: boolean;
  handleConfirmMap: () => void;
  handleCloseMap: () => void;
};
export default DialogConfirmMap;
