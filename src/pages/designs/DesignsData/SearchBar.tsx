import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";

function SearchBar(props: PropsType) {
  return (
    <>
      <Stack
        direction="row"
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSearch();
        }}
        gap={1}
        sx={{
          button: { px: 4 },
          position: "relative",
        }}
      >
        <TextField
          label="بحث"
          value={props.search}
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            props.setSearch(e.target.value);
          }}
          // disabled
        />
        <Button
          variant="contained"
          //  disabled
          type={"submit"}
        >
          بحث
        </Button>
        <Button startIcon={<FilterAltIcon />} variant="outlined">
          فلتر
        </Button>
      </Stack>
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
};

export default SearchBar;
