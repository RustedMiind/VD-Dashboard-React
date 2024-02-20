import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

function searchByWhat(search: string): string {
  if (search.length) {
    if (search.length) {
      if (search.match(/^\d/)) return "البحث باستخدام الرقم الجوال";
      else if (search.includes("@")) return "البحث باستخدام البريد الالكتروني";
      else return "البحث باستخدام اسم المقاول";
    } else {
      return "";
    }
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
          type={props.search ? "submit" : "button"}
          onClick={() => props.getContractorsData()}
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
      </Stack>
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getContractorsData: () => void;
};

export default SearchBar;
