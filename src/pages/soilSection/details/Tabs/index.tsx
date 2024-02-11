import { Paper, Stack } from "@mui/material";
import Tabs from "./Tabs";
import { createContext, useState } from "react";
import { TabEnum } from "./TabEnum";
import TabViews from "./Views";
import { useQueryParam, StringParam } from "use-query-params";

function TabsContainer() {
  const [tab, setTab] = useState<TabEnum>(TabEnum.DETAILS);

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
