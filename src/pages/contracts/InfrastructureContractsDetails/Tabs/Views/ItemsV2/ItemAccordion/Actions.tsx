import RoundedIconButton from "../../../../../../../components/RoundedIconButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Stack, Tooltip } from "@mui/material";
import { ContractItem } from "../../../../../../../types/Contracts/ContractItems";
import TimeFrameDialog from "./TimeFrameDialog";
import { useState } from "react";
import NotificationBtn from "./NotificationsBtn";

export enum MainPandBtns {
  LOCATION,
  PRINTER,
  ENGINEER,
  EDIT,
  NOTIFICATIONS,
}

function ItemActions({ item }: PropsType) {
  const [openTimeDialog, setOpenTimeDialog] = useState(false);
  const [activeBtn, setActiveBtn] = useState(MainPandBtns.LOCATION);
  function handleBtnClick(val: MainPandBtns) {
    setActiveBtn(val);
    switch (val) {
      case MainPandBtns.LOCATION:
        setOpenTimeDialog(true);
        break;
      case MainPandBtns.NOTIFICATIONS:
        // setShowNotificationsList(!showNotificationsList);
        break;
      default:
        setOpenTimeDialog(false);
    }
  }

  return (
    <Stack direction={"row"} spacing={2}>
      <RoundedIconButton
        onClick={() => handleBtnClick(MainPandBtns.LOCATION)}
        color={activeBtn == MainPandBtns.LOCATION ? "secondary" : undefined}
      >
        <AccessTimeIcon />
        {/* <LocationOnIcon /> */}
      </RoundedIconButton>
      <RoundedIconButton
        color={activeBtn == MainPandBtns.PRINTER ? "secondary" : undefined}
        onClick={() => handleBtnClick(MainPandBtns.PRINTER)}
      >
        <LocalPrintshopIcon />
      </RoundedIconButton>
      <RoundedIconButton
        color={activeBtn == MainPandBtns.ENGINEER ? "secondary" : undefined}
        onClick={() => handleBtnClick(MainPandBtns.ENGINEER)}
      >
        <PersonIcon />
      </RoundedIconButton>
      <RoundedIconButton
        color={activeBtn == MainPandBtns.EDIT ? "secondary" : undefined}
        onClick={() => handleBtnClick(MainPandBtns.EDIT)}
      >
        <EditIcon />
      </RoundedIconButton>
      <Tooltip title="تم التعديل بواسطة مهندس احمد" placement="top-start">
        <NotificationBtn
          activeBtn={activeBtn}
          item={item}
          handleBtnClick={handleBtnClick}
        />
      </Tooltip>

      <TimeFrameDialog
        open={openTimeDialog}
        onClose={() => setOpenTimeDialog(false)}
        item={item}
      />
    </Stack>
  );
}

type PropsType = {
  item: ContractItem;
};

export default ItemActions;
