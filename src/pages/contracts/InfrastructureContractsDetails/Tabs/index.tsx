import { Paper, Stack } from "@mui/material";
import Tabs from "./Tabs";
import { createContext, useEffect, useState } from "react";
import { TabEnum } from "./TabEnum";
import TabViews from "./Views";
import { useQueryParam } from "use-query-params";

function TabsContainer() {
  const [tab, setTab] = useState<TabEnum>(TabEnum.DETAILS);

  // useEffect(() => {
  //   if (!tab) setTab(TabEnum.DETAILS);
  // }, [tab]);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      <Stack spacing={1}>
        <Tabs />
        <Stack component={Paper} p={2}>
          <TabViews />
        </Stack>
      </Stack>
    </TabContext.Provider>
  );
}

export const TabContext = createContext<TabContextValue>({
  tab: TabEnum.DETAILS,
  setTab() {},
});

export type TabContextValue = {
  tab: TabEnum;
  setTab: (tab: TabEnum) => void;
};

export default TabsContainer;
