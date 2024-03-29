import { Stack, TextField, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters/Filters";
import { useState } from "react";
import { ActionTypes } from "./Filters/reducer";
import { FilterType } from "./Filters/FilterType";

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
          type="submit"
          onClick={props.applySearch}
        >
          بحث
        </Button>
        <Button
          startIcon={<PrintIcon />}
          // disabled
          type="button"
          variant="contained"
          onClick={window.print}
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

      <Filters
        selectedType={props.selectedType}
        setSelectedType={props.setSelectedType}
        dispatch={props.dispatch}
        filters={props.filters}
        opened={filtersOpened}
      />
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  applySearch: () => void;
  dispatch: React.Dispatch<ActionTypes>;
  filters: FilterType;
  selectedType?: number | null;
  setSelectedType: (type: number | undefined | null) => void;
};

export default SearchBar;
