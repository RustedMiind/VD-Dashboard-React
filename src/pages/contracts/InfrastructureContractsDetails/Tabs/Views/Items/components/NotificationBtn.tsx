import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { MainPandBtns } from "./MainPand";
import RoundedIconButton from "../../../../../../../components/RoundedIconButton";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationList from "./NotificationsList";
import { TransactionContext } from "../context/TransactionContext";

export default function NotificationBtn(props: PropsType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const TransactionContextData = React.useContext(TransactionContext);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    props.handleBtnClick(MainPandBtns.NOTIFICATIONS);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <RoundedIconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e)}
      >
        <Badge
          badgeContent={
            TransactionContextData?.currentMainItem?.system_logs?.length
          }
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </RoundedIconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <NotificationList />
      </Menu>
    </div>
  );
}

type PropsType = {
  handleBtnClick: (val: MainPandBtns) => void;
};
