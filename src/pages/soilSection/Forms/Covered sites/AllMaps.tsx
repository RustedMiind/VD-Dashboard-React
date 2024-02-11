import { Box, Grid, GridProps, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import StatusChip from "../../../../components/StatusChip";
import { SoilContext } from "../../SoilContext";
import { Button } from "@mui/material";
import { Map } from "./Leaflet/Map";
const GridItem = (props: GridProps) => (
  <Grid sx={{ padding: "0.5rem" }} item md={6} {...props} />
);
const marginTyp = 2;
export default function AllMaps({ setOpenAllMaps, openAllMaps }: PropsType) {
  const { soilData, setSoilData } = useContext(SoilContext);

  return (
    <Stack>
      <Button
        sx={{ width: 0.02, fontWeight: 600, fontSize: "20px" }}
        variant="text"
        onClick={() => {
          setOpenAllMaps(!openAllMaps);
        }}
      >
        رجوع
      </Button>
      <Grid container>
        <Grid item xs={4} padding={2}>
          <Typography sx={{ mb: 2, fontSize: "30px", fontWeight: 600 }}>
            الخريطة الكلية
          </Typography>
          {typeof soilData === "object" &&
            soilData?.soil_location?.map((item) => (
              <Box
                component={Paper}
                bgcolor={"Background"}
                padding={2}
                display={"flex"}
                flexDirection={"row"}
                marginBottom={2}
              >
                <Grid item xs={5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    حالة العرض
                  </Typography>
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      اسم الموقع
                    </Typography>
                    <Typography variant="body1">
                      {item?.location_name && item?.location_name}
                    </Typography>
                  </Box>
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      نظام البناء
                    </Typography>
                    <Typography variant="body1">
                      {item?.building_system && item?.building_system}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <StatusChip label="نشط" color="success" />
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      المدينة
                    </Typography>
                    <Typography variant="body1">
                      {" "}
                      {item?.city?.name && item?.city?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      الموقع
                    </Typography>
                    <Typography variant="body1">--- </Typography>
                  </Box>
                </Grid>
              </Box>
            ))}
        </Grid>
        <Grid item xs={8}>
          <Map all />
        </Grid>
      </Grid>
    </Stack>
  );
}

type PropsType = {
  setOpenAllMaps: React.Dispatch<React.SetStateAction<boolean>>;
  openAllMaps: boolean;
};
