import { Button, Paper } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import TableData from "./components/TableData";
import TableHeader from "./components/TableHeader";
import AddIcon from "@mui/icons-material/Add";

function WorkOrderContractor() {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Typography variant="body1">التاريخ</Typography>
        <DatePicker
          slotProps={{
            textField: { size: "small" },
          }}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Box>
      <Paper>
        <TableHeader />
        <TableData />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ my: 4, width: 0.9, marginLeft: "5%" }}
        ></Button>
      </Paper>
      <Button variant="contained" sx={{ my: 4, width: 0.9, marginLeft: "5%" }}>
        حفظ
      </Button>
    </>
  );
}

export default WorkOrderContractor;
