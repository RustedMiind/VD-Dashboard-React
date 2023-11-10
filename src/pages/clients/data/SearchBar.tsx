import { Stack, TextField, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters";
import { useState } from "react";

function SearchBar(props: PropsType) {
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
        <TextField
          label="بحث"
          value={props.search}
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
          size="small"
          sx={{ flexGrow: 1 }}
        // disabled
        />
        <Button
          variant="contained"
        //  disabled
        >
          بحث
        </Button>

      </Stack>
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default SearchBar;
