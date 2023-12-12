import { Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableData from "./components/Table";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import PopupVacations from "./components/PopupVacations";

const VacationsTable = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1, width: "fit-content", alignSelf: "flex-end" }}
          onClick={() => setOpen(!open)}
        >
          اضافة اجازة
        </Button>
        <TableData />
        <Stack direction={"row"} gap={1} sx={{ justifyContent: "flex-end" }}>
          <Button
            startIcon={<PrintIcon />}
            color="primary"
            variant="outlined"
            sx={{
              mt: 1,
              width: "fit-content",
              alignSelf: "flex-end",
              px: 5,
              py: 1,
            }}
          >
            طباعة
          </Button>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              width: "fit-content",
              alignSelf: "flex-end",
              px: 5,
              py: 1,
            }}
          >
            حفظ
          </Button>
        </Stack>
      </Stack>
      <PopupVacations
        open={open}
        handleClose={() => setOpen(!open)}
        title="اضافة اجازة"
      />
    </>
  );
};

export default VacationsTable;
