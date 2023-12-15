import { Button, Paper, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PopUpContracts from "./PopUpContracts";
import img1 from "../../../../assets/images/branch-empty.png";
import { useState } from "react";
import { Box } from "@mui/material";

export default function ContractsNotFound() {
  const pathName = window.location.pathname;
  const [bgPaper, setBgPaper] = useState<string>("");
  // function changeBgPaper() {
  //   repathName.includes("details") && setBgPaper("white");
  // }
  const [open, setOpen] = useState(false);
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
          bgcolor: pathName.includes("details") ? "white" : "",
          // bgcolor: { bgPaper },
        }}
      >
        <Stack alignItems={"center"}>
          <img src={img1} alt="Not found" width={"250"} />
          <Stack alignItems={"center"}>
            <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
              لا يوجد عقود لم يتم البدء في عمل تعاقدات
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleClickOpen}
              sx={{ mt: 4 }}
            >
              انشاء عقد جديد
            </Button>
          </Stack>
          <PopUpContracts handleClose={handleClose} open={open} />
        </Stack>
      </Paper>
    </Stack>
  );
}
