import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { ContractRequest } from "../../../types/ContractRequest";

function SearchBar(props: PropsType) {
  return (
    <>
      <Stack direction="row" gap={4} my={2}>
        <TextField
          placeholder="رقم تليفون العميل"
          type="text"
          size="small"
          sx={{ flexGrow: 1 }}
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
        />
        <Button variant="contained">بحث</Button>
      </Stack>
    </>
  );
}
type PropsType = {
  requests: ContractRequest[] | null;
};
export default SearchBar;
