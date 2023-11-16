import { Stack, TextField, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters/Filters";
import { useState } from "react";

function SearchBar(props: PropsType) {
  const [filtersOpened, setFiltersOpenen] = useState(false);

  return (
    <>
      <Stack
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          props.applySearch();
        }}
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
          onClick={props.applySearch}
        >
          بحث
        </Button>
        <Button
          startIcon={<PrintIcon />}
          // disabled
          type="submit"
          variant="contained"
        >
          طباعة
        </Button>
        <Button
          startIcon={<FilterAltIcon />}
          onClick={() => {
            setFiltersOpenen(!filtersOpened);
          }}
          color={filtersOpened ? "success" : "primary"}
          variant="outlined"
          // disabled
        >
          فلتر
        </Button>
      </Stack>
      <Filters opened={filtersOpened} />
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  applySearch: () => void;
};

export default SearchBar;
