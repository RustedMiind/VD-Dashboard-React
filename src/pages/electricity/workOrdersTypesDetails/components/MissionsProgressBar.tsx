import { Box, LinearProgress, Typography } from "@mui/material";
import "./MissionsProgressBar.scss";

const MissionsProgressBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "2rem",
        bgcolor: "background.med",
        padding: "2rem 3rem",
        borderRadius: "12px",
      }}
    >
      <Typography variant="body1" fontSize={17} fontWeight={800}>
        عدد المهام خلال الشهر
      </Typography>
      <Box
        sx={{
          width: "70%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "35px",
            borderRadius: "21px",
            border: "1px solid rgb(241, 155, 2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          id="LProgressBar"
        >
          <LinearProgress
            variant="determinate"
            value={60}
            style={{
              width: "100%",
            }}
          />
          <Typography
            sx={{
              display: "flex",
              width: "93px",
              position: "absolute",
              left: "2%",
              fontWeight: 700,
            }}
            variant="body2"
          >
            7
          </Typography>
          <Typography
            sx={{
              display: "flex",
              width: "93px",
              position: "absolute",
              right: "2%",
              fontWeight: 700,
              direction: "rtl",
              //display:val == 100?'none':'flex'
            }}
            variant="body2"
          >
            14
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "35px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" fontSize={14} fontWeight={600}>
            عدد المهام الواردة
          </Typography>
          <Typography variant="body1" fontSize={14} fontWeight={600}>
            عدد المهام الجارية
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MissionsProgressBar;
