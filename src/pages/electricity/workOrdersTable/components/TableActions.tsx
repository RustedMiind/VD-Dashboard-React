import { Box, Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import SetDialog from "./setDialog";

function TableActions() {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(!open);
  }
  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "end", m: 2 }}>
      <Button variant="outlined" disabled>
        فلتر
      </Button>
      <Button variant="contained" onClick={handleClose}>
        انشاء جدول مهام
      </Button>
      <Button variant="outlined" disabled>
        حذف
      </Button>
      <Button variant="outlined" disabled>
        تعديل
      </Button>
      <SetDialog open={open} handleClose={handleClose} />
    </Box>
  );
}

export default TableActions;
