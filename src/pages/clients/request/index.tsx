import { Grid, GridProps, Stack } from "@mui/material";

import Typography, { TypographyProps } from "@mui/material/Typography";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import RequestDetailsComponent from "./RequestDetails";
import { RequestDetails } from "../../../types/RequestDetails";
import { ClientRequestType } from "../../../types/Clients/ClientRequestType";
import ClientCard from "./ClientCard";

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
        <Grid container>
          <GridItem xs={12} md={6} lg={8} xl={9}>
            <SectionTitle>بيانات الطلب</SectionTitle>
            <RequestDetailsComponent request={request} />
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
