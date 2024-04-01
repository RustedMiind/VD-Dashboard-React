import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import DoneAndReminder from "../../../../components/DoneAndReminder";

export default function CompletionRatioOfItem() {
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
      <Grid item xs={6} sx={{ marginTop: "3.4rem" }}>
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
            value={85.5}
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
            85.5%
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
