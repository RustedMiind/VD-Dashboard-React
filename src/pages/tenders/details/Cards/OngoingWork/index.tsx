import { useContext } from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import { TenderDataContext } from "../..";
export default function OngoingWork() {
  const { tender } = useContext(TenderDataContext);
  function GridItem({ children }: GridProps) {
    const { tender } = useContext(TenderDataContext);
    return (
      <Grid item md={3} justifyContent={"center"}>
        <Stack>{children}</Stack>
      </Grid>
    );
  }
  if (typeof tender === "object") {
    return (
      <GradientBg>
        <Stack>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            الاعمال الجارية
          </Typography>
          <Grid container spacing={2}>
            <GridItem>
              <Chip
                label={"مسؤول منافسة"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                {tender.tender_tasks?.eng_employee.name}
              </Typography>
            </GridItem>
            <GridItem>
              <Chip
                label={"فني"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                {tender.tender_tasks?.eng_employee_technical.name}
              </Typography>
            </GridItem>
            <GridItem>
              <Chip
                label={"مالي"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                {tender.tender_tasks?.eng_employee_file_finacial.name}
              </Typography>
            </GridItem>
            <GridItem>
              <Chip
                label={"تقديم"}
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                {tender.tender_tasks?.eng_employee_apply_tender.name}
              </Typography>
            </GridItem>
          </Grid>
        </Stack>
      </GradientBg>
    );
  } else return <></>;
}
