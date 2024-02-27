import {
  Avatar,
  CardHeader,
  CardMedia,
  Grid,
  GridProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  Paper,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import EmployeeCard from "./EmployeeCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmployeeRequest as EmployeeRequestType } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import RequestDetailsComponent from "./RequestDetails";
import { RequestDetails } from "../../../types/RequestDetails";

const GridItem = (props: GridProps) => <Grid item p={2} {...props} />;
const SectionTitle = (props: TypographyProps) => (
  <Typography variant="h5" fontWeight={700} gutterBottom {...props} />
);

function EmployeeRequest() {
  const { requestId } = useParams();
  const [request, setRequest] = useState<RequestDetails | undefined>(undefined);
  function getRequest() {
    if (requestId) {
      axios
        .get<{ request: RequestDetails }>(
          Api(`employee/general-requests/requests/${requestId}`)
        )
        .then(({ data }) => {
          setRequest(data.request);
        })
        .catch(console.log);
    }
  }
  console.log(request);
  useEffect(getRequest, [requestId]);

  if (request)
    return (
      <Stack>
        <Grid container>
          <GridItem xs={12} md={6} lg={8} xl={9}>
            <SectionTitle>بيانات الطلب</SectionTitle>
            <RequestDetailsComponent request={request} />
          </GridItem>
          <GridItem xs={12} md={6} lg={4} xl={3}>
            {request.employee && (
              <>
                <SectionTitle>طالب الخدمة</SectionTitle>
                <EmployeeCard employee={request.employee} />
              </>
            )}
          </GridItem>
        </Grid>
      </Stack>
    );
  else return <></>;
}

export default EmployeeRequest;
