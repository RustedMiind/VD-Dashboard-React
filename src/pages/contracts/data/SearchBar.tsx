import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { Contract } from "../../../types";
import { TypeDataToSearch } from "./PageContent";

function SearchBar(props: PropsType) {
  return (
    <>
      <Stack direction="row" gap={4} my={2}>
        <TextField
          placeholder="رقم تليفون العميل"
          type="number"
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(e) => {
            props.DataToSearch.client_phone = e.target.value;
          }}
        />
        <TextField
          label="اسم العميل"
          select
          InputLabelProps={{ sx: { color: "#abc2db" } }}
          id="outlined-select-currency"
          size="small"
          sx={{ flexGrow: 2 }}
          onChange={(e) => {
            props.DataToSearch.client_id = parseInt(e.target.value);
          }}
        >
          {props.requests?.map((request) => (
            <MenuItem key={request.code} value={request.client_id}>
              {request.client?.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          placeholder="المهندس المسؤول"
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(e) => {
            props.DataToSearch.employee_name = e.target.value;
          }}
        />
        <Button variant="contained" onClick={props.search}>
          بحث
        </Button>
      </Stack>
    </>
  );
}
type PropsType = {
  requests: Contract[] | null;
  DataToSearch: TypeDataToSearch;
  search: () => void;
};
export default SearchBar;
