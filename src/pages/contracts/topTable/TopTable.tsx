import { Box, Stack } from "@mui/system";
import DoubleChips from "../../../components/DoubleStatusChips";
import BtnCus from "./BtnCus";
import { Button, Typography } from "@mui/material";
import { PropType } from "./TableHeader";

export default function TopTable({ value }: PropType) {
  return (
    <Stack>
      {value === 0 ? (
        <Typography sx={{ mt: 2 }}>حالات العقود</Typography>
      ) : (
        <Stack direction={"row"} spacing={2}>
          <Button variant="contained" sx={{ width: "50%" }}>
            العقود المنشأه
          </Button>
          <Button variant="outlined" sx={{ width: "50%" }}>
            العقود المحوله
          </Button>
        </Stack>
      )}
      <Stack
        direction={"row"}
        justifyContent={value === 0 ? "space-between" : "end"}
      >
        {value === 0 && (
          <Stack direction={"row"} spacing={2} mb={1}>
            <DoubleChips color="success" label="عنوان البوكس" value="123" />
            <DoubleChips color="warning" label="عنوان البوكس" value="123" />
            <DoubleChips color="error" label="عنوان البوكس" value="123" />
            <DoubleChips color="primary" label="عنوان البوكس" value="123" />
          </Stack>
        )}
        <Box>
          <BtnCus />
        </Box>
      </Stack>
    </Stack>
  );
}
