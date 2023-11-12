import { Box, Tab, Tabs, Button } from "@mui/material";
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
        disabled={props.disabled}
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
          <Tab label={req.name} value={req.id} disabled={props.disabled} />
        ))}
      </Tabs>
    </Box>
  );
}

type PropsType = {
  addLevel: () => void;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
};

export default TabsAndAdd;
