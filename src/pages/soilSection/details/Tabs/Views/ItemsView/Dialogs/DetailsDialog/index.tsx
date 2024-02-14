import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

const DetailsDialog = ({ open, onClose, id }: PropsType) => {
  return (
    <Dialog open={false} maxWidth="sm" fullWidth>
      <DialogTitle>نوع الطلب</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
type PropsType = {
  open: boolean;
  onClose: () => void;
  id?: number;
};
