import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SouthIcon from "@mui/icons-material/South";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainPandBtns } from "./MainPand";
import TimeMapOfPanDialog from "./TimeMapOfPanDialog";
import { useContext, useState } from "react";
import NotificationList from "./NotificationsList";
import { ContractSubItem } from "../../../../../../../types/Contracts/ContractItems";
import { CreateTransactionContext } from "../context/CreateTransactionContext";

export default function MainPandHeader(props: MainPandHeaderProps) {
  // define our variables
  const [openTimeMap, setOpenTimeMap] = useState(false);
  const [showNotificationsList, setShowNotificationsList] = useState(false);
  const btnStyle = (val: MainPandBtns) => {
    let _style = {
      bgcolor: props.activeBtn == val ? "secondary.main" : "#fff",
      color: props.activeBtn == val ? "#fff" : "primary.main",
      width: "30px",
      height: "34px",
      borderRadius: "10px",
      position: "relative",
      ":hover": {
        color: props.activeBtn == val ? "secondary.main" : "primary.main",
      },
    };

    return _style;
  };
  const transactionCxtData = useContext(CreateTransactionContext);
  // Last notification
  const LastNotification = ({ statment }: { statment: String }) => (
    <Box
      position={"absolute"}
      top={"-125%"}
      left={"-960%"}
      bgcolor={"#fff"}
      borderRadius={"22px"}
      width={"325px"}
      fontSize={"20px"}
      padding={"8px"}
    >
      {statment}
    </Box>
  );

  const handleBtnClick = (val: MainPandBtns) => {
    props.setActiveBtn(val);
    switch (val) {
      case MainPandBtns.LOCATION:
        setOpenTimeMap(true);
        break;
      case MainPandBtns.NOTIFICATIONS:
        setShowNotificationsList(!showNotificationsList);
        break;
      default:
        setOpenTimeMap(false);
    }
  };

  return (
    <>
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
          onClick={() => {
            if (props.contract_sub_items.length) {
              transactionCxtData.setContractSubItem(
                props.contract_sub_items[0]
              );
              props.setActivePandId(props.contract_sub_items[0].id);
            }
            props.setExpended(!props.expended);
          }}
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
              {props.name}
            </Typography>
            <Typography variant="body2" color={"#077BB5"}>
              عدد البنود الفرعية : {props.numberOfSubItems}
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
                {props.managerName}
              </Typography>
            </Box>
            {/* تاريخ الانتهاء */}
            <Box>
              <Typography variant="body2" fontSize={"13px"} color={`#A7A7A7`}>
                تاريخ الانتهاء
              </Typography>
              <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
                {props.endDate
                  ? new Date(props.endDate).toLocaleDateString()
                  : ""}
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
            <Tooltip title="تم التعديل بواسطة مهندس احمد" placement="top-start">
              <IconButton
                onClick={() => handleBtnClick(MainPandBtns.NOTIFICATIONS)}
                sx={btnStyle(MainPandBtns.NOTIFICATIONS)}
              >
                {/* <LastNotification statment={"تم التعديل بواسطة مهندس احمد"} /> */}
                {showNotificationsList && <NotificationList />}
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <TimeMapOfPanDialog
        startDate={props.startDate}
        endDate={props.startDate}
        open={openTimeMap}
        setOpen={setOpenTimeMap}
      />
    </>
  );
}

type MainPandHeaderProps = {
  expended: boolean;
  setExpended: React.Dispatch<React.SetStateAction<boolean>>;
  activeBtn: MainPandBtns;
  setActiveBtn: React.Dispatch<React.SetStateAction<MainPandBtns>>;
  name: string;
  numberOfSubItems: number;
  managerName: string;
  endDate: string;
  startDate: string;
  contract_sub_items: ContractSubItem[];
  setActivePandId: React.Dispatch<React.SetStateAction<number>>;
};
