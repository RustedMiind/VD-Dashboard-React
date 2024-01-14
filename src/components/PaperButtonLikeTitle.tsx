import {
  Avatar,
  Box,
  Chip,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";

export default function PaperButtonLikeTitle({
  title,
  count,
  fixedHeight,
  ...paperProps
}: PropsType) {
  return (
    <Stack>
      <Stack
        bgcolor={"primary.main"}
        sx={{
          py: 2,
          borderRadius: 1,
          textAlign: "center",
          color: "white",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography>{title}</Typography>
        {count && (
          <Chip
            color="default"
            sx={{ bgcolor: "background.paper" }}
            size="small"
            label={123}
          />
        )}
      </Stack>
      <Paper
        {...paperProps}
        sx={{
          ...(fixedHeight
            ? {
                maxHeight: fixedHeight,
                overflowY: "scroll",
                height: fixedHeight,
              }
            : undefined),
          ...paperProps.sx,
        }}
      />
    </Stack>
  );
}
type PropsType = {
  title: string;
  count?: number;
  fixedHeight?: string | number;
} & PaperProps;
