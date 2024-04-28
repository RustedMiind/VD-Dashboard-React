import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { TransactionContext } from "../context/TransactionContext";
import { useContext } from "react";
import { SystemLogType } from "../../../../../../../types/Contracts/ContractItems";

export default function NotificationList() {
  // get logs
  const TransactionContextData = useContext(TransactionContext);

  const NotificationItem = ({ item }: { item: SystemLogType }) => (
    <MenuItem sx={{ minWidth: "270px" }}>
      <ListItemText
        sx={{
          color: "primary.main",
          wordWrap: "break-word",
          fontWeight: "600",
          fontSize: "1rem",
          overflow: "hidden",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {item.modelable_type}
      </ListItemText>
      <Typography variant="body2" color="text.secondary">
        {new Date(item.updated_at ?? "").toLocaleDateString() ?? ""}
        <br />
        {new Date(item.updated_at ?? "").toLocaleTimeString() ?? ""}
      </Typography>
    </MenuItem>
  );

  return (
    <>
      {TransactionContextData?.currentMainItem?.system_logs?.map((item) => {
        return <NotificationItem key={item.id} item={item} />;
      })}
    </>
  );
}
