import { Grid, Stack } from "@mui/material";

export function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack height={1} justifyContent={"end"}>
        {children}
      </Stack>{" "}
    </Grid>
  );
}
