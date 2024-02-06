import { useContext } from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import { SoilDataContext } from "../..";
import { formatDate } from "../../../../../methods";
export default function OngoingWork() {
  const { soilData } = useContext(SoilDataContext);
  function GridItem({ children }: GridProps) {
    return (
      <Grid item md={3} justifyContent={"center"}>
        <Stack>{children}</Stack>
      </Grid>
    );
  }
  if (typeof soilData === "object") {
    return (
      <GradientBg>
        <Stack>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            الاعمال الجارية
          </Typography>
          <Grid container spacing={2}>
            <GridItem>
              <Chip
                label={"مسؤول الطلب"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                -
              </Typography>
            </GridItem>
            <GridItem>
              <Chip
                label={"الزيارة"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                -
              </Typography>
            </GridItem>
            <GridItem>
              <Chip
                label={"لاختبار"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                -
              </Typography>
            </GridItem>
            <GridItem>
              <Chip
                label={"تسليم التقرير"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                -
              </Typography>
            </GridItem>
          </Grid>
        </Stack>
      </GradientBg>
    );
  } else return <></>;
}
