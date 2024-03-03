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
  Backdrop,
  CircularProgress,
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
import axios, { AxiosError } from "axios";
import { Api } from "../../../constants";
import RequestDetailsComponent from "./RequestDetails";
import { RequestDetails } from "../../../types/RequestDetails";
import RequestStatus from "./RequestStatus";
import ModelDialog from "../requests/ModelDialog/ModelDialog";
import { useSnackbar } from "notistack";
import { LaravelValidationError } from "../../../types/LaravelValidationError";

const GridItem = (props: GridProps) => <Grid item p={2} {...props} />;
const SectionTitle = (props: TypographyProps) => (
  <Typography variant="h5" fontWeight={700} gutterBottom {...props} />
);

function EmployeeRequest() {
  const { requestId } = useParams();
  const [request, setRequest] = useState<RequestDetails | undefined>(undefined);
  const [status, setStatus] = useState<"loading" | "none" | "error">("loading");
  const [dialogOpen, SetDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleCloseDialog = () => SetDialogOpen(false);
  const handleOpenDialog = () => SetDialogOpen(true);

  function getRequest() {
    if (requestId) {
      setStatus("loading");
      axios
        .get<{ request: RequestDetails }>(
          Api(`employee/general-requests/requests/${requestId}`)
        )
        .then(({ data }) => {
          setRequest(data.request);
          setStatus("none");
        })
        .catch((err: AxiosError<LaravelValidationError<unknown>>) => {
          setStatus("error");
          console.log(err);
          enqueueSnackbar(
            err.response?.data.msg ||
              err.response?.data.message ||
              "تعذر في تحميل بيانات الطلب"
          );
        });
    }
  }
  console.log(request);
  useEffect(getRequest, [requestId]);

  const HAS_ACCESS = !!(request?.nextStep && request.nextStep.hasAccess);
  const CAN_TAKE_ACTION = request?.status === -1;
  return (
    <>
      <Backdrop open={status === "loading"}>
        <CircularProgress />
      </Backdrop>
      {request && (
        <>
          <ModelDialog
            modelType={request.nextStep?.model}
            resetTable={getRequest}
            open={dialogOpen}
            onClose={handleCloseDialog}
            request={request}
            onSubmit={() => {}}
          />
          <Stack>
            <Grid container>
              <GridItem xs={12} md={6} lg={8} xl={9}>
                <Stack spacing={4}>
                  <Box>
                    <SectionTitle>بيانات الطلب</SectionTitle>
                    <RequestDetailsComponent request={request} />
                  </Box>
                  <Box>
                    <SectionTitle>حالة الاجرائات</SectionTitle>
                    <RequestStatus request={request} />
                  </Box>
                  {HAS_ACCESS && CAN_TAKE_ACTION && (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleOpenDialog}
                      size="large"
                    >
                      اتخاذ اجراء
                    </Button>
                  )}
                </Stack>
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
        </>
      )}
    </>
  );
}

export default EmployeeRequest;
