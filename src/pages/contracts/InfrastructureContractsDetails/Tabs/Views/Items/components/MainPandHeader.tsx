import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SouthIcon from "@mui/icons-material/South";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainPandBtns } from "./MainPand";

export default function MainPandHeader(props: MainPandHeaderProps) {
  // define our variables
  const btnStyle = (val: MainPandBtns) => ({
    bgcolor: props.activeBtn == val ? "secondary.main" : "#fff",
    color: props.activeBtn == val ? "#fff" : "primary.main",
    width: "30px",
    height: "34px",
    borderRadius: "10px",
    ":hover": {
      color: props.activeBtn == val ? "secondary.main" : "primary.main",
    },
  });

  const handleBtnClick = (val: MainPandBtns) => {
    props.setActiveBtn(val);
  };

  return (
    <Grid
      container
      borderRadius={"12px"}
      padding={2}
      marginY={2}
      bgcolor={`background.med`}
    >
      <Grid
        item
        xs={4}
        display="flex"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={() => props.setExpended(!props.expended)}
      >
        {/* Icon */}
        {!props.expended ? (
          <KeyboardBackspaceIcon
            sx={{
              bgcolor: `primary.main`,
              color: `#fff`,
              borderRadius: "50%",
              fontSize: "1rem",
            }}
          />
        ) : (
          <SouthIcon
            sx={{
              bgcolor: `primary.main`,
              color: `#fff`,
              borderRadius: "50%",
              fontSize: "1rem",
            }}
          />
        )}
        {/* Pand Name */}
        <Box paddingLeft={2}>
          <Typography variant="h6" fontWeight={700}>
            بند رئيسي امانة جدة
          </Typography>
          <Typography variant="body2" color={"#077BB5"}>
            عدد البنود الفرعبة:4
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"cneter"}
        >
          {/* المسؤول */}
          <Box>
            <Typography variant="body2" fontSize={"13px"} color={`#A7A7A7`}>
              المسؤول
            </Typography>
            <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
              محمد راغب
            </Typography>
          </Box>
          {/* تاريخ الانتهاء */}
          <Box>
            <Typography variant="body2" fontSize={"13px"} color={`#A7A7A7`}>
              تاريخ الانتهاء
            </Typography>
            <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
              29/04/2024
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        paddingTop={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"cneter"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          width={"70%"}
        >
          <IconButton
            onClick={() => handleBtnClick(MainPandBtns.LOCATION)}
            sx={btnStyle(MainPandBtns.LOCATION)}
          >
            <LocationOnIcon />
          </IconButton>
          <IconButton
            onClick={() => handleBtnClick(MainPandBtns.PRINTER)}
            sx={btnStyle(MainPandBtns.PRINTER)}
          >
            <LocalPrintshopIcon />
          </IconButton>
          <IconButton
            onClick={() => handleBtnClick(MainPandBtns.ENGINEER)}
            sx={btnStyle(MainPandBtns.ENGINEER)}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            onClick={() => handleBtnClick(MainPandBtns.EDIT)}
            sx={btnStyle(MainPandBtns.EDIT)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleBtnClick(MainPandBtns.NOTIFICATIONS)}
            sx={btnStyle(MainPandBtns.NOTIFICATIONS)}
          >
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

type MainPandHeaderProps = {
  expended: boolean;
  setExpended: React.Dispatch<React.SetStateAction<boolean>>;
  activeBtn: MainPandBtns;
  setActiveBtn: React.Dispatch<React.SetStateAction<MainPandBtns>>;
};
