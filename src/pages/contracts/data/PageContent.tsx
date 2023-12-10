import { Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import TableContainer from "./TableContainer";
import { IndexContextProvider } from "../Context/Store";

function PageContent() {
  return (
    <IndexContextProvider>
      <Stack>
        <SearchBar />
        <TableContainer />
      </Stack>
    </IndexContextProvider>
  );
}
export type TypeDataToSearch = {
  client_id: number;
  client_phone: string;
  employee_name: string;
};
export default PageContent;
