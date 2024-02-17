import { useContext, useMemo, useRef, useState } from "react";
import { Grid, GridProps, Typography, Box, Button } from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { SoilDataContext } from "../../..";
import { formatDate } from "../../../../../../methods";
import RequiredSymbol from "../../../../../../components/RequiredSymbol";
import DialogShowLocation from "./Dialog";
import { styled } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

function GridItem(props: GridProps) {
  return <Grid item lg={6} xs={12} {...props} />;
}
export const NotPrintableTableCell = styled(Grid)({
  "@media print": {
    display: "none",
  },
});
export type IdListType = {
  id: number[];
};

function InfoItem(props: { label: string; value?: React.ReactNode }) {
  return (
    <GridItem>
      <AddLabelToEl
        labelTypographyProps={{ gutterBottom: false }}
        label={props.label}
      >
        <Typography fontWeight={700} variant="body1">
          {props.value}
        </Typography>
      </AddLabelToEl>
    </GridItem>
  );
}

function DetailsView(): JSX.Element {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { soilData } = useContext(SoilDataContext);
  const reportPrint: React.RefObject<HTMLTableElement> =
    useRef<HTMLTableElement>(null);
  const handlePrint = () => {
    if (reportPrint.current) {
      window.print();
    }
  };
  return (
    <>
      {typeof soilData === "object" ? (
        <>
          <Typography variant={"h5"} sx={{ mb: 4, fontWeight: 600 }}>
            معلومات الطلب
          </Typography>
          <Grid container rowSpacing={4} columnSpacing={2} ref={reportPrint}>
            <InfoItem label="رقم الطلب" value={soilData?.id} />
            <InfoItem
              label="تاريخ الطلب"
              value={formatDate(soilData?.created_at)}
            />
            <InfoItem label="اسم العميل" value={soilData?.client?.name} />
            <InfoItem
              label="اسم الخدمة"
              value={soilData?.soil_order?.type_order.name}
            />
            <InfoItem
              label="نوع التقرير"
              value={soilData?.soil_order?.license.name}
            />
            <InfoItem
              label="الحالة"
              value={soilData?.soil_order?.status_name}
            />
            <InfoItem
              label="عدد الادوار"
              value={soilData?.soil_order?.soil_floor?.number_floors}
            />
            <InfoItem
              label="عدد الجسات"
              value={soilData?.soil_order?.number_bodies}
            />
            <InfoItem
              label="طريقة السداد"
              value={soilData?.soil_order?.payment}
            />
            <Grid item md={6}>
              <Typography>
                عرض الموقع
                <RequiredSymbol />
              </Typography>
              <Button
                sx={{ width: 0.3 }}
                variant="contained"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                عرض
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                >
                  طباعه
                </Button>
              )}
              content={() => reportPrint.current}
            />
          </Box>
          <DialogShowLocation
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
  // } else return <></>;
}

export default DetailsView;
