import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function AddationInformation() {
  return (
    <Box>
      {/* length of path */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography variant="body2" fontWeight={500} fontSize={14}>
          طول المسار
        </Typography>
        <TextField
          id="length-of-path"
          size="small"
          sx={{ flexGrow: 1, mx: 1 }}
          value={"8995 م2"}
        />
      </Stack>
      <Stack direction={"row"}>
        <FormControlLabel control={<Checkbox />} label="نوع الحفرية" />
        <FormControlLabel control={<Checkbox />} label="نوع الحفرية" />
        <FormControlLabel control={<Checkbox />} label="نوع الحفرية" />
        <FormControlLabel control={<Checkbox />} label="نوع الحفرية" />
      </Stack>
    </Box>
  );
}
