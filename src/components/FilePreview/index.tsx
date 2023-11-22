import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";

// Icon
import PrintIcon from "@mui/icons-material/Print";

function FilePreview(props: PropsType) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        width: 1,
        height: 60,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "primary.main",
        borderRadius: 1,
        direction: "rtl",
      }}
    >
      <IconButton
        color="primary"
        component="a"
        href={props.fileLink}
        target="_blank"
      >
        <PrintIcon />
      </IconButton>

      <Stack alignItems="center">
        <Typography
          variant="body1"
          sx={{
            maxWidth: 190,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {props.fileName}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            maxWidth: 190,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          color="GrayText"
        >
          {props.fileSize}
        </Typography>
      </Stack>
      <Avatar sx={{ bgcolor: "primary.light" }}>
        <Typography variant="body2" fontWeight={700}>
          {props.fileExtension?.toUpperCase()}
        </Typography>
      </Avatar>
    </Box>
  );
}

type PropsType = {
  fileName: string;
  fileSize?: string;
  fileExtension?: string;
  fileLink: string;
};

export default FilePreview;
