import { Button, Grid } from "@mui/material";
import "./TopCards.scss";

export default function TabsButtons() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        bgcolor: "background.paper",
        height: "5rem",
        marginY: "2rem",
        borderRadius: "13px",
      }}
      className="fadeInUp"
    >
      <Button
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          marginX: "10px",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            bgcolor: "primary.main",
            color: "#fff",
            transform: "scale(1.056)",
            boxShadow: "1px 1px 3px 3px lightgray",
          },
        }}
      >
        معلومات العقد
      </Button>
      <Button
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          marginX: "10px",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            transform: "scale(1.056)",
            boxShadow: "1px 1px 3px 3px lightgray",
          },
        }}
      >
        بنود العمل
      </Button>
      <Button
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          marginX: "10px",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            transform: "scale(1.056)",
            boxShadow: "1px 1px 3px 3px lightgray",
          },
        }}
      >
        المعاملات
      </Button>
      <Button
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          marginX: "10px",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            transform: "scale(1.056)",
            boxShadow: "1px 1px 3px 3px lightgray",
          },
        }}
      >
        الجدول الزمني
      </Button>
      <Button
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          marginX: "10px",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            transform: "scale(1.056)",
            boxShadow: "1px 1px 3px 3px lightgray",
          },
        }}
      >
        المرفقات
      </Button>
      <Button
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          marginX: "10px",
          transition: "all 0.5s ease-in-out",
          ":hover": {
            transform: "scale(1.056)",
            boxShadow: "1px 1px 3px 3px lightgray",
          },
        }}
      >
        مساحة العمل
      </Button>
    </Grid>
  );
}
