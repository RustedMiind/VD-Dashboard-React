import { Paper } from "@mui/material";
import TableActions from "./components/TableActions";
import TableHeader from "./components/TableHeader";
import TableData from "./components/TableData";
import FooterPagenation from "./components/FooterPagenation";

export default function WorkOrderDataTable() {
  return (
    <Paper sx={{ mt: 5 }}>
      <TableActions />
      <TableHeader />
      <TableData />
      <FooterPagenation />
    </Paper>
  );
}
