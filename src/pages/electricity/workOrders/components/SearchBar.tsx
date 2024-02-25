import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

function searchByWhat(search: string): string {
  if (search.length) {
    if (search.match(/^\d/)) return "البحث باستخدام الرقم المرجعي";
    // else return "البحث باستخدام نوع أمر العمل";
    return "";
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
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            props.setSearch(e.target.value);
          }}
          // disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchByWhat(props.search)}
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          type={props.search ? "submit" : "button"}
          onClick={() => props.getData()}
        >
          بحث
        </Button>
        <Button
          variant="contained"
          //  disabled
          startIcon={<PrintIcon />}
          type={"button"}
        >
          طباعة
        </Button>
        <Button
          variant="contained"
          //  disabled
          startIcon={<PrintIcon />}
          type={"button"}
        >
          Excel
        </Button>
      </Stack>
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: () => void;
};

export default SearchBar;
