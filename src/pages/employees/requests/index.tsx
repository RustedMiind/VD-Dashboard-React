import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import SearchBar from "./SearchBar";

function EmplyeesRequests() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        طلبات الموظفين
      </Typography>
      <SearchBar />
      hello
    </Stack>
  );
}

export default EmplyeesRequests;
