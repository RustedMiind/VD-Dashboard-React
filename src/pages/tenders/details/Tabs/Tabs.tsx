import { Chip, ChipProps, Paper, Stack } from "@mui/material";
import { useContext } from "react";
import { TabContext, TabContextValue } from ".";
import { TabEnum } from "./TabEnum";

function useCreateChipProps({ setTab, tab }: TabContextValue) {
  return function (label: React.ReactNode, thisTab?: TabEnum): ChipProps {
    return {
      label,
      disabled: !thisTab,
      color: thisTab === tab ? "primary" : undefined,
      onClick() {
        thisTab && setTab(thisTab);
      },
    };
  };
}

function Tabs() {
  const { tab, setTab } = useContext(TabContext);
  const createChipProps = useCreateChipProps({ tab, setTab });

  return (
    <Stack component={Paper} gap={1} p={2} direction="row" flexWrap="wrap">
      <Chip {...createChipProps("معلومات المنافسة", TabEnum.DETAILS)} />
      <Chip {...createChipProps("البنود", TabEnum.ITEMS)} />
      <Chip {...createChipProps("المرفقات", TabEnum.ATTACHMENTS)} />
      <Chip {...createChipProps("المواعيد")} />
      <Chip {...createChipProps("التقارير")} />
      <Chip {...createChipProps("المالية")} />
      <Chip {...createChipProps("سجل الحركة")} />
      <Chip {...createChipProps("الطلبات")} />
      <Chip {...createChipProps("مساحة العمل", TabEnum.WORK_SPACE)} />
    </Stack>
  );
}

export default Tabs;
