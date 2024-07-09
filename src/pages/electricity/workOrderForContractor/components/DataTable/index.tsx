import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableData from "./components/TableData";
import TableHeader from "./components/TableHeader";

export default function DataTableOfWorkOrderForContractor() {
  return (
    <Paper>
      <TableHeader />
      <TableData />
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{ my: 4, width: 0.9, marginLeft: "5%" }}
      ></Button>
    </Paper>
  );
}
