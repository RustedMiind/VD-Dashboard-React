import {
  Avatar,
  CardMedia,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  Stack,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { EmployeeType } from "../../../types";
import { Client } from "../../../types/Clients";

function ClientCard({ client }: PropsType) {
  return (
    <Card>
      <CardMedia>
        <Stack alignItems={"center"} justifyContent={"center"} pt={4}>
          <Avatar sx={{ width: 70, height: 70 }}>
            <Typography variant="h4" color={"inherit"}>
              <img src={client?.card_image} />
            </Typography>
          </Avatar>
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {client.name}
        </Typography>
        {/* <Typography
          sx={{ mb: 1.5, textAlign: "center", px: 3 }}
          color="text.secondary"
        >
          {client.work_at?.departmentName}
        </Typography> */}
        <Divider />
        <MenuList dense>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText>{client.phone}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{client.email}</ListItemText>
          </ListItem>
          {/* <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>{client.address}</ListItemText>
          </ListItem> */}
        </MenuList>
        <Divider />
      </CardContent>
    </Card>
  );
}

type PropsType = { client: Client };

export default ClientCard;
