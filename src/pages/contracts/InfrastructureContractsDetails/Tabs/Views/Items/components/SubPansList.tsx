import { Box, Grid, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function SubPandsList() {
  let SingleBtn = () => (
    <Box
      display={"flex"}
      alignItems="center"
      width={"90%"}
      minHeight={"62px"}
      borderRadius={"12px"}
      boxShadow={"0.5px 0.5px 1px 1px lightgray"}
      marginY={"10px"}
      sx={{
        cursor: "pointer",
      }}
    >
      <KeyboardBackspaceIcon
        sx={{
          bgcolor: `primary.main`,
          color: `#fff`,
          borderRadius: "50%",
          fontSize: "1rem",
          marginX: "12px",
        }}
      />
      <Typography variant="h6" fontWeight={700}>
        بند فرعي مثال 2
      </Typography>
    </Box>
  );
  return (
    <Grid
      item
      xs={3}
      sx={{
        height: "400px",
        overflowY: "auto",
        background: "#fff",
        boxShadow: "1px 1px 2px 2px lightgray",
        borderRadius: "11px",
        padding: " 1rem 10px",
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
      }}
    >
      <SingleBtn />
      <SingleBtn />
      <SingleBtn />
    </Grid>
  );
}
