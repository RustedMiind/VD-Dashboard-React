import { Box, Button, Grid, GridProps, Paper, Stack } from "@mui/material";

import Typography, { TypographyProps } from "@mui/material/Typography";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import RequestDetailsComponent from "./RequestDetails";
import { RequestDetails } from "../../../types/RequestDetails";
import { ClientRequestType } from "../../../types/Clients/ClientRequestType";
import ClientCard from "./ClientCard";
import StatusTable from "../clientRequest/Dialogs/StatusDialog/StatusTable";
import useOpenDialog from "../hooks/useOpenDialog";
import { PanelData, StepStatusData } from "../clientRequest/types";

const GridItem = (props: GridProps) => <Grid item p={2} {...props} />;
const SectionTitle = (props: TypographyProps) => (
  <Typography variant="h5" fontWeight={700} gutterBottom {...props} />
);

function EmployeeRequest() {
  const { requestId } = useParams();
  console.log(requestId);
  const [request, setRequest] = useState<ClientRequestType | undefined>(
    undefined
  );

  const { handleOpenModel, DialogComponent } = useOpenDialog();

  function handleDialog(id: number, request: PanelData | StepStatusData) {
    return () => {
      switch (id) {
        case 1:
          handleOpenModel(request)();
          break;
        case 2:
          handleOpenModel(request)();
          break;

        default:
          break;
      }
    };
  }

  function getRequest() {
    if (requestId) {
      axios
        .get<{ data: ClientRequestType }>(
          Api(`employee/client/order/${requestId}`)
        )
        .then(({ data }) => {
          setRequest(data.data);
        })
        .catch(console.log);
    }
  }
  console.log(request);
  useEffect(getRequest, [requestId]);

  if (request)
    return (
      <Stack>
        {DialogComponent}
        <Grid container>
          <GridItem xs={12} md={6} lg={8} xl={9}>
            <Stack spacing={4}>
              <Box>
                <SectionTitle>بيانات الطلب</SectionTitle>
                <RequestDetailsComponent request={request} />
              </Box>
              <Box>
                <SectionTitle>حالة الاجرائات</SectionTitle>
                <Paper elevation={3}>
                  <StatusTable details={request} />
                </Paper>
              </Box>
              {
                <Button
                  fullWidth
                  variant="contained"
                  disabled={
                    request.step_status_id !== 0 ||
                    !(request.form_id === 1 || request.form_id === 2)
                  }
                  onClick={handleDialog(request.form_id, request)}
                  size="large"
                >
                  اتخاذ اجراء
                </Button>
              }
            </Stack>
          </GridItem>
          <GridItem xs={12} md={6} lg={4} xl={3}>
            {request && (
              <>
                <SectionTitle>طالب الخدمة</SectionTitle>
                <ClientCard client={request?.order?.client} />
              </>
            )}
          </GridItem>
        </Grid>
      </Stack>
    );
  else return <></>;
}

export default EmployeeRequest;
