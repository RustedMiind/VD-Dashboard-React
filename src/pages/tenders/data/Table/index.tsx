import { Paper, Stack, Table, TableContainer } from "@mui/material";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useContext } from "react";
import { TableContext } from "../TableContext";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";

function TendersTable() {
  const { tenderTableData } = useContext(TableContext);

  return (
    <Stack>
      {tenderTableData === "loading" && <LoadingTable rows={5} cols={9} />}
      {tenderTableData === "empty" && <NotFound title="لا يوجد منافسات" />}
      {tenderTableData === "error" && (
        <NotFound title="حدث خطأ حاول مرة أخرى" />
      )}
      {typeof tenderTableData === "object" && (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1,
            overflowX: "scroll",
            maxHeight: 600,
            bgcolor: "Background",
          }}
        >
          <Table padding="normal" sx={{ minWidth: 2200 }} stickyHeader>
            <TableHead />
            <TableBody />
          </Table>
        </TableContainer>
      )}
      {/* Status Dialog */}
    </Stack>
  );
}

export default TendersTable;
