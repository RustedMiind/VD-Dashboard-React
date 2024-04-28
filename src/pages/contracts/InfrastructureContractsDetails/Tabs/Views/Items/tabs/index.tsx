import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Paper } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ChooseOperationTypeDialog from "../CreateTransaction/ChooseOperationTypeDialog";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Paper
      elevation={2}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: "400px", overflowY: "auto" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Paper>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export type TabType = {
  index: number;
  label: string;
  hidden?: boolean;
  children?: React.ReactNode;
  exist?: boolean;
};

export default function InternalTabs({
  TabsHeaders,
  setActiveSubItemId,
}: InternalTabsProps) {
  const [value, setValue] = React.useState(0);
  const [
    openCreateOrEditTransactionDialog,
    setOpenCreateOrEditTransactionDialog,
  ] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpenDialog = () => {
    setOpenCreateOrEditTransactionDialog(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {TabsHeaders.filter(({ exist }) => exist).map((ele) => (
            <Tab key={ele.index} label={ele.label} {...a11yProps(ele.index)} />
          ))}
        </Tabs>
        {value == 0 && (
          <Button
            onClick={() => handleOpenDialog()}
            variant="contained"
            startIcon={<AddBoxOutlinedIcon />}
          >
            انشاء معاملة
          </Button>
        )}
      </Box>
      <ChooseOperationTypeDialog
        open={openCreateOrEditTransactionDialog}
        setOpen={setOpenCreateOrEditTransactionDialog}
        setActiveSubItemId={setActiveSubItemId}
      />
      {TabsHeaders.filter(({ exist }) => exist).map((ele) => (
        <CustomTabPanel
          key={`$CT_${ele.index}`}
          value={value}
          index={ele.index}
        >
          {ele?.children}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

type InternalTabsProps = {
  TabsHeaders: TabType[];
  setActiveSubItemId: React.Dispatch<React.SetStateAction<number>>;
};
