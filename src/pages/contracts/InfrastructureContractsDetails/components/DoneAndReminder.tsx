import { Box, Grid, Typography } from "@mui/material";

export default function DoneAndReminder({ column }: { column?: boolean }) {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        marginY: "0.5rem",
        flexDirection: column ? "column" : "row",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: column ? "start" : "center",
          alignItems: "center",
          marginX: "5px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            backgroundColor: "#f19b02",
            margin: "0 3px",
          }}
        ></span>
        <Typography variant="body2">المنفذ</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: column ? "start" : "center",
          alignItems: "center",
          marginX: "5px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            backgroundColor: "#DFDFDF",
            margin: "0 3px",
          }}
        ></span>
        <Typography variant="body2">المتبقي</Typography>
      </Box>
    </Grid>
  );
}
