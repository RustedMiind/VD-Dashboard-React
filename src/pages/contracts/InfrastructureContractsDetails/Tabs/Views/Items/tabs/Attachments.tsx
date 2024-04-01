import { Box, Grid, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function AttatchmentsSection() {
  // define single btn
  const SiingleFile = () => {
    return (
      <Grid
        item
        xs={4}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={2}
        marginTop={2}
      >
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <FilePresentOutlinedIcon />
          <Typography variant="body2" paddingX={1} fontWeight={400}>
            الملف المالي
          </Typography>
        </Box>
        <CloudDownloadIcon color="secondary" />
      </Grid>
    );
  };
  return (
    <Grid
      container
      xs={12}
      bgcolor={"#fff"}
      borderRadius={"12px"}
      marginY={1}
      padding={2}
    >
      <SiingleFile />
      <SiingleFile />
      <SiingleFile />
      <SiingleFile />
      <SiingleFile />
    </Grid>
  );
}
