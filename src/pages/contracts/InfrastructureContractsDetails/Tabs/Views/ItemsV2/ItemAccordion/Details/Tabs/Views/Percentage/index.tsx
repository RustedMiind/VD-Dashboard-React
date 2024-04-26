import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { TabViewProps } from "..";
import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DoneAndReminder from "../../../../../../../../components/DoneAndReminder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditRaioDialog from "./EditDialog";
import { useUser } from "../../../../../../../../../../../contexts/user/user";
import { ContractDetailsContext } from "../../../../../../../..";
import { ContractItemContext } from "../../../../ItemContext";

function PercentageView({ subItem }: TabViewProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { contract, refreshToggler } = useContext(ContractDetailsContext);
  const { user } = useUser();

  const [ratio, setRatio] = useState(subItem.achievement_percentage);
  useEffect(() => {
    setRatio(subItem.achievement_percentage);
  }, [subItem.contract_item_id]);
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
        {(user?.employee_id === subItem?.employee_id ||
          user?.employee_id === contract?.employee_id) && (
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
        subItem={subItem}
      />
    </Grid>
  );
}

export default PercentageView;
