import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function NotificationList() {
  const NotificationItem = () => (
    <MenuItem>
      <ListItemText
        sx={{
          color: "primary.main",
          wordWrap: "break-word",
          fontWeight: "600",
          fontSize: "1rem",
          overflow: "hidden",
          transition: "all 0.2s ease-in-out",
          ":hover": {
            borderLeft: "7px solid #f19b02",
          },
        }}
      >
        تم التعديل بواسطة مهندس احمد
      </ListItemText>
      <Typography variant="body2" color="text.secondary">
        اليوم
        <br />
        02:35
      </Typography>
    </MenuItem>
  );
  return (
    <>
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
      <Divider />
      <NotificationItem />
    </>
  );
}
