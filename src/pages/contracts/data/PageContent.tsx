import { Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
import { IndexContextProvider } from "../Context/Store";

function PageContent() {
  return (
    <IndexContextProvider>
      <Stack>
        <SearchBar />
        <Panal />
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
