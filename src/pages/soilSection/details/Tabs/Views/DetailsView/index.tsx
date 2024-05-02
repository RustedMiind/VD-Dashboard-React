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
export const NotPrintableTableCell = styled(Box)({
  "@media print": {
    display: "none",
  },
});

function GridItem(props: GridProps) {
  return <Grid item lg={6} xs={12} {...props} />;
}

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

  return (
    <>
      {typeof soilData === "object" ? (
        <Box>
          <NotPrintableTableCell>
            <Box>
              <Typography variant={"h5"} sx={{ mb: 4, fontWeight: 600 }}>
                معلومات الطلب
              </Typography>
            </Box>
          </NotPrintableTableCell>

          <Grid container rowSpacing={4} columnSpacing={2}>
            <InfoItem label="رقم الطلب" value={soilData?.serial_number} />
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
            <InfoItem label="الاجمالي" value={soilData?.soil_order?.price} />
            <InfoItem
              label="الاجمالي المطلوب"
              value={soilData?.soil_order?.total_price}
            />

            <InfoItem
              label="طريقة السداد"
              value={soilData?.soil_order?.payment}
            />
            <Grid item md={6}>
              <NotPrintableTableCell>
                <Box>
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
                </Box>
              </NotPrintableTableCell>
            </Grid>
          </Grid>

          <DialogShowLocation
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
  // } else return <></>;
}

export default DetailsView;
