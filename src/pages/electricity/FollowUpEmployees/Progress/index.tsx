import { Box, LinearProgress, Stack, Typography } from "@mui/material";

function ProgressSection({ incoming, ongoing }: PropsType) {
  const incomingPercentage = (incoming / (incoming + ongoing)) * 100;

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
    >
      <Typography variant="h6">عدد المهام خلال الشهر</Typography>
      <Stack width={0.6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ minWidth: 35, textAlign: "center", px: 1 }}>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                التقارير
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                color="text.secondary"
              >
                {incoming}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1, mx: 1 }}>
            <LinearProgress
              color="secondary"
              sx={{ height: 12, borderRadius: 1 }}
              variant="determinate"
              value={incomingPercentage}
            />
          </Box>
          <Box sx={{ minWidth: 35, textAlign: "center", px: 1 }}>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                المرفقات
              </Typography>
              <Typography
                fontWeight={700}
                variant="body2"
                color="text.secondary"
              >
                {ongoing}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ minWidth: 35, textAlign: "center", px: 1 }}>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                الخريطة
              </Typography>
              <Typography
                fontWeight={700}
                variant="body2"
                color="text.secondary"
              >
                {ongoing}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  incoming: number;
  ongoing: number;
};

export default ProgressSection;
