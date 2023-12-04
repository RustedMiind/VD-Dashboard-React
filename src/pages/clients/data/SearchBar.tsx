import { Stack, TextField, Button } from "@mui/material";

function SearchBar(props: PropsType) {
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
          onClick={props.getRequests}
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
  getRequests: () => void;
};

export default SearchBar;
