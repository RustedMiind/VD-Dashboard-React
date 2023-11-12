import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { requestsIds } from "./RequestsIds";

function TabsAndAdd(props: PropsType) {
  return (
    <Box
      mt={2}
      display="flex"
      justifyContent="space-between"
      flexDirection="row-reverse"
      flexWrap="wrap"
      alignItems="end"
    >
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 1 }}
        onClick={props.addLevel}
      >
        اضافة مرحلة جديدة
      </Button>

      <Tabs
        aria-label="basic tabs example"
        value={props.currentTab}
        onChange={(e, v) => {
          props.setCurrentTab(v);
        }}
      >
        {requestsIds.map((req) => (
          <Tab label={req.name} value={req.id} />
        ))}
      </Tabs>
    </Box>
  );
}

type PropsType = {
  addLevel: () => void;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
};

export default TabsAndAdd;
