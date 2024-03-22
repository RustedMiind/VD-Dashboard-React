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
import { Employee } from "../../../types/User/user";
import { EmployeeType } from "../../../types";

function EmployeeCard({ employee }: PropsType) {
  return (
    <Card>
      <CardMedia>
        <Stack alignItems={"center"} justifyContent={"center"} pt={4}>
          <Avatar sx={{ width: 70, height: 70 }}>
            <Typography variant="h4" color={"inherit"}>
              {employee.name?.[0]}
            </Typography>
          </Avatar>
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {employee.name}
        </Typography>
        <Typography
          sx={{ mb: 1.5, textAlign: "center", px: 3 }}
          color="text.secondary"
        >
          {employee.work_at?.departmentName}
        </Typography>
        <Divider />
        <MenuList dense>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText>{employee.phone}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{employee.email}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>{employee.address}</ListItemText>
          </ListItem>
        </MenuList>
        <Divider />
      </CardContent>
    </Card>
  );
}

type PropsType = { employee: EmployeeType };

export default EmployeeCard;
