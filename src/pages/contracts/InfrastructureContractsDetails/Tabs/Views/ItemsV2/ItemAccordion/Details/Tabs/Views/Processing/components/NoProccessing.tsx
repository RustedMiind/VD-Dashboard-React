import { Paper, Typography } from "@mui/material";

export default function NoProccessing() {
  return (
    <Paper
      elevation={4}
      sx={{
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color={"info"} fontWeight={700}>
        لا يوجد معاملات فى هذا البند الفرعي
      </Typography>
    </Paper>
  );
}
