import { Button, Grid, GridProps, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { IconButton } from "@mui/material";
import { Map } from "./Leaflet/Map";
const GridItem = ({
  children,
  label,
  ...props
}: GridProps & { label: string }) => {
  return (
    <Grid item xs={6} {...props}>
      <Typography variant="body1">
        {label} <RequiredSymbol />
      </Typography>
      {children}
    </Grid>
  );
};
export default function AddRequest() {
  return (
    <Stack>
      <Typography>الخدمه</Typography>
      <Typography sx={{ mb: 4, fontSize: "30px", fontWeight: 600 }}>
        خدمة الرخص
      </Typography>
      <Grid container spacing={2}>
        <GridItem label="نوع التقرير">
          <TextField fullWidth size="small" placeholder="نوع التقرير" />
        </GridItem>
        <GridItem label="مساحة الموقع">
          <TextField fullWidth size="small" placeholder="مساحة الموقع" />
        </GridItem>
        <GridItem label="عدد الادوار">
          <TextField fullWidth size="small" placeholder="عدد الادوار" />
        </GridItem>
        <GridItem label="الموقع">
          <TextField
            InputProps={{
              endAdornment: (
                <IconButton aria-label="delete">
                  <AddLocationIcon />
                </IconButton>
              ),
            }}
            fullWidth
            size="small"
            placeholder="الموقع"
          />
        </GridItem>
        <Grid item xs={6} my={2}>
          <Button fullWidth variant="contained" color="warning">
            حساب عدد الجسات
          </Button>
        </Grid>
        <Grid item xs={6} my={2}></Grid>
        <GridItem label="عدد الجسات">
          <TextField fullWidth size="small" placeholder="عدد الجسات" />
        </GridItem>
        <GridItem label="عمق الجسات">
          <TextField fullWidth size="small" placeholder="عمق الجسات" />
        </GridItem>
        <GridItem label="الاجمالي المطلوب">
          <TextField fullWidth size="small" placeholder="الاجمالي المطلوب" />
        </GridItem>
        <GridItem label="طريقة الدفع">
          <TextField fullWidth size="small" placeholder="طريقة الدفع" />
        </GridItem>
        <Typography>تعديل</Typography>
        {/* <Grid item xs={6} my={2}>
          <Button fullWidth variant="contained" endIcon={<AddCircleIcon />}>
            ادخال يدوي
          </Button>
        </Grid>
        <GridItem label="عدد الجسات">
          <TextField fullWidth size="small" placeholder="عدد الجسات" />
        </GridItem>
        <GridItem label="عمق الجسات">
          <TextField fullWidth size="small" placeholder="عمق الجسات" />
        </GridItem>{" "}
        <Grid item xs={12} my={2}>
          <Button fullWidth variant="contained" color="warning">
            حساب التكلفة
          </Button>
        </Grid> */}
      </Grid>
      <Map />
    </Stack>
  );
}
