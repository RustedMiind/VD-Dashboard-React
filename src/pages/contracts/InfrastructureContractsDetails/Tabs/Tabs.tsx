import { Chip, ChipProps, Paper, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { TabContext, TabContextValue } from ".";
import { TabEnum } from "./TabEnum";
import { ContractDetailsContext } from "../../SetContract/ContractDetailsContext";
import { useParams } from "react-router-dom";
import { ContractTyoeAndDataContext } from "../context/ContractTyoeAndData";

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
  const { ContractType } = useContext(ContractTyoeAndDataContext);

  return (
    <Stack component={Paper} gap={1} p={2} direction="row" flexWrap="wrap">
      {/*  Shared Tabs  */}
      <Chip {...createChipProps("معلومات العقد", TabEnum.DETAILS)} />
      <Chip {...createChipProps("البنود", TabEnum.ITEMS_2)} />
      {/* Infrestructre Contract Tabs */}
      {ContractType === "Infrestructure" && (
        <>
          <Chip {...createChipProps("المعاملات")} />
          <Chip {...createChipProps("الحدول الزمني")} />
          <Chip {...createChipProps("المرفقات", TabEnum.ATTACHMENTS)} />
          <Chip {...createChipProps("مساحة العمل")} />
        </>
      )}
      {/* Standard Contract Tabs */}
      {ContractType === "Standard" && (
        <>
          <Chip {...createChipProps("المرفقات")} />
          <Chip {...createChipProps("المقاولين")} />
          <Chip {...createChipProps("أوامر العمل")} />
          <Chip {...createChipProps("المالية")} />
          <Chip {...createChipProps("ادرات العقد")} />
        </>
      )}
    </Stack>
  );
}

export default Tabs;
