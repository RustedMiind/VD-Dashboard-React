import { Stack, Tab, Tabs as MuiTabs } from "@mui/material";
import Views from "./Views";
import { useState } from "react";

export enum TabsEnum {
  INCOMING = "incoming",
  ONGOING = "ongoing",
}

function Tabs() {
  const [tab, setTab] = useState<TabsEnum>(TabsEnum.INCOMING);
  const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
    setTab(newValue);
  };
  return (
    <Stack>
      {/* Tabs Navigation */}
      <MuiTabs value={tab} onChange={handleChange}>
        <Tab value={TabsEnum.INCOMING} label="المهام الواردة" />
        <Tab value={TabsEnum.ONGOING} label="المهام الجارية" />
      </MuiTabs>
      {/* View */}
      <Views tab={tab} />
    </Stack>
  );
}

export default Tabs;
