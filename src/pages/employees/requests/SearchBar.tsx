import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters";
import { useState } from "react";

function SearchBar() {
  const [filtersOpened, setFiltersOpenen] = useState(false);

  return (
    <>
      <Stack
        direction="row"
        gap={1}
        sx={{
          button: { px: 4 },
          position: "relative",
        }}
      >
        <TextField label="بحث" size="small" sx={{ flexGrow: 1 }} />
        <Button variant="contained">بحث</Button>
        <Button startIcon={<PrintIcon />} variant="contained">
          طباعة
        </Button>
        <Button
          startIcon={<FilterAltIcon />}
          onClick={() => {
            setFiltersOpenen(!filtersOpened);
          }}
          color={filtersOpened ? "success" : "primary"}
          variant="outlined"
        >
          فلتر
        </Button>
      </Stack>
      <Filters opened={filtersOpened} />
    </>
  );
}

export default SearchBar;
