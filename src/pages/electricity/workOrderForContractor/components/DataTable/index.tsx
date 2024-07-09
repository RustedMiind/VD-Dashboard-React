import { Paper } from "@mui/material";
import TableData from "./components/TableData";
import TableHeader from "./components/TableHeader";

export default function DataTableOfWorkOrderForContractor() {
  return (
    <Paper>
      <TableHeader />
      <TableData />
    </Paper>
  );
}
