import { Grid, Stack } from "@mui/material";

export function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack>{children}</Stack>{" "}
    </Grid>
  );
}
