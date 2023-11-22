import { Box, Stack, Typography } from "@mui/material";
import img1 from "../../../../assets/images/branch-empty.png";
export default function NotFoundClients() {
  return (
    <Stack>
      <Box
        sx={{
          height: "49vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack>
          <img src={img1} />
          <Typography sx={{ fontSize: "28px", fontWeight: "700", my: 4 }}>
            لا يوجد يوجد عملاء
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
