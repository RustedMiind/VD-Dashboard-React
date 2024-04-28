import { Accordion, AccordionDetails, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MainPandHeader from "./MainPandHeader";
import "../../../../components/TopCards.scss";
import SubPandsList from "./SubPansList";
import InternalTabs, { TabType } from "../tabs";
import Transactions from "../tabs/Transactions";
import AttatchmentsSection from "../tabs/Attachments";
import CompletionRatioOfItem from "../tabs/CompletionRatio";
import {
  ContractItem,
  ContractSubItem,
} from "../../../../../../../types/Contracts/ContractItems";
import { CreateTransactionContext } from "../context/CreateTransactionContext";
import { TransactionContext } from "../context/TransactionContext";

export enum MainPandBtns {
  LOCATION,
  PRINTER,
  ENGINEER,
  EDIT,
  NOTIFICATIONS,
}

export default function MainPand({ contractItem }: MainPandProps) {
  // TODO::declare component variables
  const [expended, setExpended] = useState(false);
  const [activeBtn, setActiveBtn] = useState(MainPandBtns.LOCATION);
  const [activeSubItemId, setActiveSubItemId] = useState<number>(-1);

  // const { subItem } = useContext(TransactionContext);

  const subItem = contractItem.contract_sub_items?.find(
    ({ id }) => activeSubItemId === id
  );

  const TabsHeaders: TabType[] = [
    {
      index: 0,
      label: "المعاملات",
      children: <Transactions activeSubItemId={activeSubItemId} />,
      exist: !!subItem?.["is_processing"],
    },
    {
      index: 1,
      label: "المرفقات",
      children: <AttatchmentsSection />,
      exist: !!subItem?.["is_attachment"],
    },
    {
      index: 2,
      label: "نسب الانجاز",
      children: <CompletionRatioOfItem />,
      exist: !!subItem?.["is_progress_bar"],
    },
    {
      index: 3,
      label: "المهام",
      children: <h2>المهام</h2>,
      exist: !!subItem?.["is_mission"],
    },
    {
      index: 4,
      label: "الخطابات",
      children: <h2>الخطابات</h2>,
      exist: !!subItem?.["is_letter"],
    },
  ];
  console.log(activeSubItemId);
  console.log("Tabs ", TabsHeaders);
  console.log("contractItem ", contractItem);
  console.log("subItem ", subItem);

  //update activeSubItemId with first contract_sub_items if found
  useEffect(() => {
    if (activeSubItemId == -1) {
      if (contractItem?.contract_sub_items?.length > 0) {
        setActiveSubItemId(contractItem?.contract_sub_items[0].id);
      }
    }
  }, []);

  return (
    <>
      {/* MainPand Header */}
      <Accordion expanded={expended} disableGutters>
        <MainPandHeader
          name={contractItem.name}
          numberOfSubItems={contractItem.contract_sub_items.length}
          managerName={contractItem?.manager?.name ?? ""}
          endDate={contractItem.end_date}
          startDate={contractItem.start_date}
          contract_sub_items={contractItem.contract_sub_items}
          expended={expended}
          setExpended={setExpended}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          setActiveSubItemId={setActiveSubItemId}
        />
        {/* Main Header Body */}
        {/* !dont work<Accordion expanded={false}> */}
        {/* Now Working */}
        <AccordionDetails>
          <Grid container xs={12} spacing={1}>
            <Grid item xl={2} xs={3}>
              <SubPandsList
                contractSubItems={contractItem.contract_sub_items}
                setActiveSubItemId={setActiveSubItemId}
              />
            </Grid>
            <Grid item xs={9} xl={10}>
              <InternalTabs
                TabsHeaders={TabsHeaders}
                setActiveSubItemId={setActiveSubItemId}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

type MainPandProps = {
  contractItem: ContractItem;
};
