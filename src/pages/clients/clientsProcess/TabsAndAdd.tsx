import { Box, Button, Tab, Tabs } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { OrderType } from "./types/OrderType";

const TabsAndAdd = ({
  currentTab,
  setCurrentTab,
  addLevel,
  orderType,
  setOrderTypeId,
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
          setOrderTypeId(v);
        }}
      >
        {orderType.map(({ id, name }) => (
          <Tab key={id} label={name} value={id} />
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
  orderType: OrderType[];
  setOrderTypeId: React.Dispatch<React.SetStateAction<number>>;
};

export default TabsAndAdd;
