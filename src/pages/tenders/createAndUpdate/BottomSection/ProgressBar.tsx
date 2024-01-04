import { Box, LinearProgress, Stack, Typography } from "@mui/material";

function ProgressBar(props: PropsType) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
    >
      <Typography variant="h6">شريط اكتمال الحفظ</Typography>
      <Stack width={0.6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: 1, mr: 1 }}>
            <LinearProgress
              color="secondary"
              sx={{ height: 12, borderRadius: 1 }}
              variant="determinate"
              value={props.progress}
              {...props}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.progress
            )}%`}</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  progress: number;
};

export default ProgressBar;
