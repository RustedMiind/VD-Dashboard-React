import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DialogMap from "./DialogMap";

function DialogConfirm({ open, handleClose }: PropsType) {
  const [locationsPositions, setLocationsPositions] = useState<PositionType[]>(
    []
  );
  const [openMap, setOpenMap] = useState(false);
  function handleCloseMap() {
    setOpenMap(!openMap);
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent sx={{ paddingY: 5 }}>
          <Typography variant="body1" fontSize={16} fontWeight={600}>
            هل انت متأكد ان رقم امر العمل صحيح؟
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
              handleClose();
            }}
          >
            تاكيد
          </Button>
          <Button variant="text" fullWidth onClick={handleClose}>
            رجوع
          </Button>
        </DialogActions>
      </Dialog>
      <DialogMap
        positionClick={locationsPositions}
        setPositionClick={setLocationsPositions}
        lat={21.036}
        long={34.2048}
        openMap={openMap}
        handleCloseMap={handleCloseMap}
      />
    </>
  );
}
type PropsType = {
  open: boolean;
  handleClose: () => void;
};
type PositionType = [number, number];

export default DialogConfirm;
