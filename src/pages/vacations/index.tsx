import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { generateUndefinedArray } from "./../../methods/generateUndefinedArray";
import { Box, Button, CardActions, Grid, Stack } from "@mui/material";
import AddDialog from "./AddDialog";
import ErrorDialog from "./ErrorDialog";
import ShowVactionDialog from "./ShowVactionDialog";

const array = generateUndefinedArray(5);
const btnarray = generateUndefinedArray(3);

function Vacations() {
  return (
    <Stack>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        إعدادات الأجازات
      </Typography>
      <Grid container spacing={3} mt={1}>
        {array.map(() => (
          <Grid item xs={4}>
            <Card>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height={220}
                  image="https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="green iguana"
                />
                <Stack
                  sx={{
                    top: 0,
                    position: "absolute",
                    width: 1,
                    height: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      " linear-gradient(180deg, rgba(243, 245, 247, 0.7) 0%, #F3F5F7 72.18%)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    اسم الفرع
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  backgroundColor: "primary.main",
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
                  {btnarray.map(() => (
                    <Box
                      sx={{
                        borderRadius: 1,
                        bgcolor: "Background",
                        maxWidth: 0.318,
                        minWidth: 0.318,
                      }}
                    >
                      <Button size="large" color="primary" fullWidth>
                        2023
                      </Button>
                    </Box>
                  ))}
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddDialog />
      <ErrorDialog />
      <ShowVactionDialog />
    </Stack>
  );
}

export default Vacations;
