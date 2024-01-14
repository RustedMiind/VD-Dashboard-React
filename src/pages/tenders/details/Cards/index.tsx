import { Grid, Stack } from "@mui/material";
import React from "react";
import OngoingWork from "./OngoingWork";
import Items from "./Items";
import NumberOfDays from "./NumberOfDays";

export default function Cards() {
  return (
    <Stack>
      <Grid container mb={4} spacing={2}>
        <Grid item md={4}>
          <OngoingWork />
        </Grid>
        <Grid item md={4}>
          <Items />
        </Grid>
        <Grid item md={4}>
          <NumberOfDays />
        </Grid>
      </Grid>
    </Stack>
  );
}
