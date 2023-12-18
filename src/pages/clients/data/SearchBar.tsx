import { Stack, TextField, Button, InputAdornment } from "@mui/material";

function searchByWhat(search: string): string {
  if (search.length) {
    if (search.startsWith("0")) return "البحث باستخدام رقم الجوال";
    else if (
      search.startsWith("1") ||
      search.startsWith("2") ||
      search.startsWith("4")
    )
      return "البحث باستخدام رقم الهوية";
    else return "البحث باستخدام اسم العميل";
  } else {
    return "";
  }
}

function SearchBar(props: PropsType) {
  return (
    <>
      <Stack
        direction="row"
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          props.getRequests();
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchByWhat(props.search)}
              </InputAdornment>
            ),
          }}
          // disabled
        />
        <Button
          variant="contained"
          //  disabled
          onClick={!props.search ? props.openAdvancedSearchDialog : undefined}
          type={props.search ? "submit" : "button"}
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
  openAdvancedSearchDialog: () => void;
};

export default SearchBar;
