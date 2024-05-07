import { Stack, AppBar, Tabs, Tab, Paper } from "@mui/material";
import { ContractSubItem } from "../../../../../../../../../types/Contracts/ContractItems";
import { useEffect, useMemo, useState } from "react";
import ProcessingView from "./Views/Processing";
import PercentageView from "./Views/Percentage";
import Attachments from "./Views/Attachments";

export enum TabEnum {
  ATTACHMENTS = "المرفقات",
  PROCCESSING = "المعاملات",
  PERCENTAGE = "النسبة المئوية",
  MISSIONS = "المهام",
  LETTERS = "الخطابات",
}

type TabType = { name: TabEnum; render: React.ReactNode };

function TabsSection({ subItem }: PropsType) {
  const [currentTab, setCurrentTab] = useState<TabEnum | undefined>(undefined);

  const tabs: TabType[] = useMemo(() => {
    const tabs: TabType[] = [];

    if (subItem.is_processing) {
      tabs.push({
        name: TabEnum.PROCCESSING,
        render: <ProcessingView subItem={subItem} />,
      });
    }
    if (subItem.is_attachment) {
      tabs.push({
        name: TabEnum.ATTACHMENTS,
        render: <Attachments subItem={subItem} />,
      });
    }
    if (subItem.is_progress_bar) {
      tabs.push({
        name: TabEnum.PERCENTAGE,
        render: <PercentageView subItem={subItem} />,
      });
    }
    if (subItem.is_mission) {
      tabs.push({ name: TabEnum.MISSIONS, render: <></> });
    }
    if (subItem.is_letter) {
      tabs.push({ name: TabEnum.LETTERS, render: <></> });
    }

    return tabs;
  }, [Math.random()]);

  useEffect(() => {
    setCurrentTab(tabs[0]?.name || undefined);
  }, [subItem.id]);

  console.log(currentTab);

  return (
    <Stack>
      <Tabs
        value={currentTab}
        onChange={(e, tab: TabEnum) => setCurrentTab(tab)}
      >
        {tabs.map((tab) => (
          <Tab value={tab.name} label={tab.name} key={tab.name} />
        ))}
      </Tabs>
      <Stack component={Paper} bgcolor={"background.default"} p={2}>
        {tabs.find((tab) => tab.name === currentTab)?.render}
      </Stack>
    </Stack>
  );
}

type PropsType = {
  subItem: ContractSubItem;
};

export default TabsSection;
