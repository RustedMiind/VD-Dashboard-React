import { Paper, Stack, Table, TableContainer } from "@mui/material";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function TendersTable() {
  return (
    <Stack p={2}>
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
      {/* Status Dialog */}
    </Stack>
  );
}

export default TendersTable;
