import { Stack } from "@mui/material";
import SearchBar from "../SearchBar";
import CenteredPagination from "../../../../components/CenteredPagination";
import { useState } from "react";
import DesignProjectsView from "./DesignProjectsView";

function Views() {
  const [search, setSearch] = useState("");
  function handleSearch() {
    console.log(search);
  }
  return (
    <Stack spacing={4}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {/* Show Data in Table  */}
      <DesignProjectsView />
      {/* pagination */}
    </Stack>
  );
}

export default Views;
