import { Grid, Stack } from "@mui/material";
import React from "react";
import OngoingWork from "./OngoingWork";
import Items from "./Items";

export default function Cards() {
  return (
    <Stack>
      <Grid container mb={4} spacing={2}>
        <Grid item lg={6}>
          <OngoingWork />
        </Grid>
        <Grid item lg={6}>
          <Items />
        </Grid>
      </Grid>
    </Stack>
  );
}
