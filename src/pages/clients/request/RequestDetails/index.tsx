import { Paper, Stack, Grid, GridProps, Typography } from "@mui/material";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { RequestDetails } from "../../../../types/RequestDetails";
import VacationDetails from "../../../employees/requests/DetailsDialog/VacationDetails";
import { ClientRequestType } from "../../../../types/Clients/ClientRequestType";
import { formatDate } from "../../../../methods";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} md={6} xl={6} p={1} {...props} />
);

export const DataItem = ({ label, value }: TDataItem) => (
  <GridItem>
    <AddLabelToEl
      labelTypographyProps={{ variant: "body2", fontWeight: 700 }}
      label={label}
    >
      {typeof value === "string" || typeof value == "number" ? (
        <Typography variant="body1">{value}</Typography>
      ) : (
        value
      )}
    </AddLabelToEl>
  </GridItem>
);
type TDataItem = {
  label: string;
  value?: React.ReactNode;
};
function RequestDetailsComponent({ request }: PropsType) {
  return (
    <Stack component={Paper} p={2}>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <DataItem label="اسم العميل" value={request?.order?.client?.name} />
        <DataItem label="نوع الطلب" value={request?.order?.order_type?.name} />
        <DataItem
          label="تاريخ الورود"
          value={formatDate(request?.order?.updated_at)}
        />
        <DataItem label="رقم الطلب" value={request?.order_id} />

        <DataItem label="الملاحظات" value={request?.note || "----"} />

        {/* {((): React.ReactElement | "" | undefined => {
          if (request) {
            switch (request?.type) {
              case 1:
                return <VacationDetails details={request} />;
              case 2:
                return <MissionDetails details={request} />;
              case 3:
                return <AdvanceDetails details={request} />;
              case 4:
                return <CustodyDetails details={request} />;
              case 5:
                return <WorkNeeds details={request} />;
              case 6:
                return <CarFixDetails details={request} />;
              default:
                return <></>;
            }
          } else return <></>;
        })()} */}
      </Grid>
    </Stack>
  );
}

type PropsType = {
  request: ClientRequestType;
};

export default RequestDetailsComponent;
