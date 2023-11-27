import { FormControl, Modal } from "@mui/base";
import {
  Dialog,
  Button,
  DialogTitle,
  Paper,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  FormControlLabel,
  Radio,
  Box,
  RadioGroup,
} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import PopUpContracts from "./Components/PopUpContracts";

export default function ContractsNotFound() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        بيانات العقود
      </Typography>
      <Paper
        sx={{
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <React.Fragment>
          <Stack>
            <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
              لا يوجد لم يتم البدء في عمل التعاقدات
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleClickOpen}
              sx={{ width: "50%", mx: "auto", mt: 4 }}
            >
              انشاء عقد جديد
            </Button>
            <PopUpContracts handleClose={handleClose} open={open} />
          </Stack>
        </React.Fragment>
      </Paper>
    </Stack>
  );
}
