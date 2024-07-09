import { Box, Button } from "@mui/material";
import { useState } from "react";
import SetDialog from "../../setDialog";

function TableActions() {
  // TODO::declare and define component state and variables
  const [open, setOpen] = useState(false);

  // TODO::declare and define component state and variables
  function handleClose() {
    setOpen(!open);
  }

  // * return component UI.
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
