import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ErrorDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ px: 4, pt: 6 }}>
        <Typography fontWeight={700}>
          المحدد لنفس العام (2023) مضاف من قبل يرجى تعديل البيانات
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" sx={{ my: 2, px: 5 }} onClick={handleClose}>
          رجوع
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropType = {
  open?: boolean;
  onClose?: () => void;
  setTableData?: () => void;
  openErrorDialog?: () => void;
};
