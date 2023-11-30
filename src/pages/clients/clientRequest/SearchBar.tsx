import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterComponent from "./Filter/Filter";
import { ActionTypes } from "./Filter/reducer";
import { Filter } from "./types";

const SearchBar = ({
  applySearch,
  search,
  setSearch,
  dispatch,
  filters,
  setSelectedType,
}: PropsType) => {
  const [filtersOpened, setFiltersOpened] = useState(false);

  return (
    <>
      <Stack
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          applySearch();
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
          sx={{ flexGrow: 1 }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          size="small"
        />
        <Button variant="contained" type="submit" onClick={applySearch}>
          بحث
        </Button>
        <Button
          startIcon={<PrintIcon />}
          type="button"
          variant="contained"
          onClick={window.print}
        >
          طباعة
        </Button>
        <Button
          startIcon={<FilterAltIcon />}
          onClick={() => {
            setFiltersOpened(!filtersOpened);
          }}
          color={filtersOpened ? "success" : "primary"}
          variant="outlined"
        >
          فلتر
        </Button>
      </Stack>
      <FilterComponent
        opened={filtersOpened}
        dispatch={dispatch}
        filters={filters}
        // selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </>
  );
};

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  applySearch: () => void;
  dispatch: React.Dispatch<ActionTypes>;
  filters: Filter;
  // selectedType: number | undefined;
  setSelectedType: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default SearchBar;
