import {
  Box,
  Button,
  CardActions,
  Stack,
  Card,
  CardActionArea,
  Skeleton,
  CardMedia,
} from "@mui/material";
import { generateUndefinedArray } from "../../../methods";

const buttons = generateUndefinedArray(3);

function BranchCardPlaceholder() {
  return (
    <Card>
      <CardActionArea sx={{ position: "relative" }}>
        <CardMedia component="img" height={220} />
        <Stack
          sx={{
            top: 0,
            position: "absolute",
            width: 1,
            height: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={"100%"} width={"100%"} />
        </Stack>
      </CardActionArea>
      <Box
        sx={{
          backgroundColor: "background.paper",
        }}
        py={1}
      >
        <CardActions
          sx={{
            overflowX: "auto",
            maxWidth: 1,
            width: 1,
            direction: "row",
          }}
        >
          {buttons.map(() => (
            <Button>
              <Skeleton width={100} />
            </Button>
          ))}
        </CardActions>
      </Box>
    </Card>
  );
}

export default BranchCardPlaceholder;
