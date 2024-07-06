import { Stack, TextField, Button } from "@mui/material";

function SearchBar(props: PropsType) {
  // TODO::declare and define component state and variables
  // TODO::declare and define component helper methods
  // * return component ui.
  return (
    <>
      <Stack
        direction="row"
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        gap={1}
        sx={{
          button: { px: 4 },
          position: "relative",
          marginY: "1rem",
        }}
      >
        <TextField
          label="بحث"
          value={props.search}
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(e) => props.setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          type={props.search ? "submit" : "button"}
          onClick={() => {}}
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
