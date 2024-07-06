import { Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function SettingButton(props: PropsType) {
  // TODO::declare and define component state and variables
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // TODO::declare and define component methods
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // * return component ui
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="small"
        onClick={handleClick}
      >
        <SettingsOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Button
            variant="text"
            startIcon={<EditOutlinedIcon />}
            onClick={(e) => {}}
          >
            تعديل
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={(e) => {}}
          >
            حذف
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}

type PropsType = {};
