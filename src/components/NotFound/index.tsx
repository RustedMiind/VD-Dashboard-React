import { Box, Stack, Typography, Paper } from "@mui/material";
import img1 from "../../assets/images/branch-empty.png";
export default function NotFound(props: PropsType) {
  return (
    <Stack>
      <Paper>
        <Box
          sx={{
            height: "49vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 7,
          }}
        >
          <Stack>
            <img src={img1} />
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "700",
                my: 4,
                textAlign: "center",
              }}
            >
              {props.title}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
}

type PropsType = {
  title: string;
};
