import { Box, Grid, Paper, Typography, Stack } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import StatusChip from "../../../../components/StatusChip";
export default function ChatComponent() {
  return (
    <Stack>
      <Box>
        <Grid container component={Paper} width={"30%"} sx={{}}>
          <Grid
            item
            component={Paper}
            md={10}
            sx={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 3%, rgba(249,203,187,1) 97%);",
              paddingY: 1,
              paddingX: 2,
            }}
          >
            <Box display={"flex"}>
              <Grid item md={9} display={"flex"}>
                <Person2Icon />
                <Typography sx={{ ml: 1 }}>محمود عبدالعزيز</Typography>
              </Grid>
              <Grid item md={3}>
                <StatusChip label={"علني"} color="success" />
              </Grid>
            </Box>
            <Grid item md={12}>
              <Typography mt={1} ml={3}>
                مساء الخير ، يرجى ارسال الملف
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
