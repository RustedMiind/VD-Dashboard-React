import { Grid } from "@mui/material";
import BranchCardPlaceholder from "./BranchCardPlaceholder";
import { generateUndefinedArray } from "../../../methods";

const cards = generateUndefinedArray(4);

function BranchLoadingPlaceholder() {
  return (
    <Grid container spacing={4} mt={1}>
      {cards.map(() => (
        <Grid item xs={4}>
          <BranchCardPlaceholder />
        </Grid>
      ))}
    </Grid>
  );
}

export default BranchLoadingPlaceholder;
