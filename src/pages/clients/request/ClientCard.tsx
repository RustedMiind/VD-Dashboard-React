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
import BadgeIcon from "@mui/icons-material/Badge";
import { Client } from "../../../types/Clients";

function ClientCard({ client }: PropsType) {
  return (
    <Card>
      <CardMedia>
        <Stack alignItems={"center"} justifyContent={"center"} pt={4}>
          <Avatar
            src={client?.card_image}
            sx={{ width: 70, height: 70 }}
          ></Avatar>
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {client.name}
        </Typography>
        <Typography
          sx={{ mb: 1.5, textAlign: "center", px: 3 }}
          color="text.secondary"
        >
          {client?.type === "individual" ? "فرد" : "شركة"}
        </Typography>
        <Divider />
        <MenuList dense>
          <ListItem>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText>
              {client?.type === "individual"
                ? client?.card_id
                : client?.register_number}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText>{client.phone}</ListItemText>
          </ListItem>
          {client?.email && (
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>{client?.email}</ListItemText>
            </ListItem>
          )}
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
