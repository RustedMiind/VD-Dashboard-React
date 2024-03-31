import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
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
  children?: React.ReactNode;
};

export default function InternalTabs({ TabsHeaders }: InternalTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {TabsHeaders.map((ele) => (
            <Tab
              key={`${Math.random()}_${ele.index}`}
              label={ele.label}
              {...a11yProps(ele.index)}
              sx={{
                backgroundColor:
                  ele.index != value ? "#fff" : "background.paper",
                fontSize: "1rem",
                fontWeight: 600,
                paddingX: 1,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {TabsHeaders.map((ele) => (
        <CustomTabPanel
          key={`${Math.random()}_${ele.index}`}
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
};