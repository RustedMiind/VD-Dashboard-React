import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { ContractRequest } from "../../../types/ContractRequest";
import { TypeDataToSearch } from ".";

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
            props.DataToSearch.phone = e.target.value;
          }}
        />
        <TextField
          label="اسم العميل"
          select
          InputLabelProps={{ sx: { color: "#abc2db" } }}
          id="outlined-select-currency"
          size="small"
          sx={{ flexGrow: 2 }}
        >
          {props.requests?.map((request) => (
            <MenuItem key={request.code} value={request.code}>
              {request.client.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          placeholder="المهندس المسؤول"
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(e) => {
            props.DataToSearch.employee = e.target.value;
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
  requests: ContractRequest[] | null;
  DataToSearch: TypeDataToSearch;
  search: () => void;
};
export default SearchBar;
