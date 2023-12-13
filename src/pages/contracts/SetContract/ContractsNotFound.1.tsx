import { Button, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PopUpContracts from "./Components/PopUpContracts";
import img1 from "../../../assets/images/branch-empty.png";

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
      <Paper
        sx={{
          height: "58vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <React.Fragment>
          <Stack>
            <img src={img1} alt="Not found" />
            <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
              لا يوجد عقود متاحة
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleClickOpen}
              sx={{ mt: 4 }}
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
