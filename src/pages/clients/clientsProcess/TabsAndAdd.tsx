import { Box, Button, Tab, Tabs } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { requestsIds } from "./RequestIds";

const TabsAndAdd = ({
  currentTab,
  setCurrentTab,
  addLevel,
  disabled,
}: PropsType) => {
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
        onClick={addLevel}
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 1 }}
      >
        اضافة مرحلة جديدة
      </Button>

      <Tabs
        aria-label="basic tabs example"
        value={currentTab}
        onChange={(e, v) => {
          setCurrentTab(v);
        }}
      >
        {requestsIds.map(({ id, name }) => (
          <Tab key={id} label={name} value={id} disabled={disabled} />
        ))}
      </Tabs>
    </Box>
  );
};

type PropsType = {
  addLevel: () => void;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
};

export default TabsAndAdd;
