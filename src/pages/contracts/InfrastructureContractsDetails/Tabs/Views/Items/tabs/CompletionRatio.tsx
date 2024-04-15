import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import DoneAndReminder from "../../../../components/DoneAndReminder";
import { useUser } from "../../../../../../../contexts/user/user";
import { ContractDetailsContext } from "../../../..";
import { useContext, useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { CreateTransactionContext } from "../context/CreateTransactionContext";
import EditRaioDialog from "./EditDialog";

export default function CompletionRatioOfItem() {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUser();
  const { contract, refreshToggler } = useContext(ContractDetailsContext);
  const { contractSubItem } = useContext(CreateTransactionContext);
  const [ratio, setRatio] = useState(contractSubItem?.achievement_percentage);
  useEffect(() => {
    setRatio(contractSubItem?.achievement_percentage);
  }, [contractSubItem?.id]);
  return (
    <Grid
      container
      xs={12}
      bgcolor={"#fff"}
      borderRadius={"12px"}
      marginY={1}
      padding={2}
      paddingBottom={4}
    >
      <Grid item xs={4}>
        <Typography variant="h5" fontWeight={600}>
          نسبة الانجاز الكلية
        </Typography>
      </Grid>
      <Grid item xs={2} marginTop={1}>
        <DoneAndReminder column={true} />
      </Grid>
      <Grid item xs={4} sx={{ marginTop: "3.4rem" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            position: "relative",
            paddingX: "1rem",
          }}
          className="RatioCircularProgress"
        >
          <CircularProgress
            style={{ width: "90px" }}
            variant="determinate"
            color={"warning"}
            value={ratio}
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
            {ratio}%
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        {user?.employee_id === contractSubItem?.employee_id && (
          <Button
            variant="contained"
            startIcon={<SettingsOutlinedIcon />}
            onClick={() => setOpenDialog(true)}
          >
            تعديل
          </Button>
        )}
      </Grid>
      <EditRaioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        setRatio={setRatio}
      />
    </Grid>
  );
}
