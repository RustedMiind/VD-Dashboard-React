import { useContext } from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import { SoilDataContext } from "../..";
import { formatDate } from "../../../../../methods";
export default function OngoingWork() {
  const { soilData, items } = useContext(SoilDataContext);
  console.log(items);
  function GridItem({ children }: GridProps) {
    return (
      <Grid item md={3} justifyContent={"center"}>
        <Stack>{children}</Stack>
      </Grid>
    );
  }
  if (Array.isArray(items)) {
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
              {items.map(
                (eng) =>
                  eng.form_id === 4 && (
                    <Typography
                      key={eng.id}
                      variant="body2"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {eng.employees.name}
                    </Typography>
                  )
              )}
            </GridItem>
            <GridItem>
              <Chip
                label={"الزيارة"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              {items.map(
                (eng) =>
                  eng.form_id === 5 && (
                    <Typography
                      key={eng.id}
                      variant="body2"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {eng.employees.name}
                    </Typography>
                  )
              )}
            </GridItem>
            <GridItem>
              <Chip
                label={"الاختبار"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              {items.map(
                (eng) =>
                  eng.form_id === 6 && (
                    <Typography
                      key={eng.id}
                      variant="body2"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {eng.employees.name}
                    </Typography>
                  )
              )}
            </GridItem>
            <GridItem>
              <Chip
                label={"تسليم التقرير"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              {items.map(
                (eng) =>
                  eng?.form_id === 7 && (
                    <Typography
                      key={eng.id}
                      variant="body2"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {eng?.employees?.name}
                    </Typography>
                  )
              )}
            </GridItem>
          </Grid>
        </Stack>
      </GradientBg>
    );
  } else return <></>;
}
