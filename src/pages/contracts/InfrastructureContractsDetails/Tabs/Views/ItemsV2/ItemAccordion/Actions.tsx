import RoundedIconButton from "../../../../../../../components/RoundedIconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SouthIcon from "@mui/icons-material/South";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Stack, Tooltip } from "@mui/material";
import { ContractItem } from "../../../../../../../types/Contracts/ContractItems";

function ItemActions({ item }: PropsType) {
  function handleBtnClick() {}

  return (
    <Stack direction={"row"} spacing={2}>
      <RoundedIconButton onClick={() => handleBtnClick()} color="secondary">
        <AccessTimeIcon />
        {/* <LocationOnIcon /> */}
      </RoundedIconButton>
      <RoundedIconButton onClick={() => handleBtnClick()}>
        <LocalPrintshopIcon />
      </RoundedIconButton>
      <RoundedIconButton onClick={() => handleBtnClick()}>
        <PersonIcon />
      </RoundedIconButton>
      <RoundedIconButton onClick={() => handleBtnClick()}>
        <EditIcon />
      </RoundedIconButton>
      <Tooltip title="تم التعديل بواسطة مهندس احمد" placement="top-start">
        {/* <NotificationBtn handleBtnClick={handleBtnClick} /> */}
        <div></div>
      </Tooltip>
    </Stack>
  );
}

type PropsType = {
  item: ContractItem;
};

export default ItemActions;
