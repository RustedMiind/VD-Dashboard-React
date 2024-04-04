import { Accordion, Grid } from "@mui/material";
import { useState } from "react";
import MainPandHeader from "./MainPandHeader";
import "../../../../components/TopCards.scss";
import SubPandsList from "./SubPansList";
import InternalTabs, { TabType } from "../tabs";
import Transactions from "../tabs/Transactions";
import AttatchmentsSection from "../tabs/Attachments";
import CompletionRatioOfItem from "../tabs/CompletionRatio";
import { ContractItem } from "../../../../../../../types/Contracts/ContractItems";

export enum MainPandBtns {
  LOCATION,
  PRINTER,
  ENGINEER,
  EDIT,
  NOTIFICATIONS,
}
const TabsHeaders: TabType[] = [
  { index: 0, label: "المعاملات", children: <Transactions /> },
  { index: 1, label: "المرفقات", children: <AttatchmentsSection /> },
  { index: 2, label: "نسب الانجاز", children: <CompletionRatioOfItem /> },
  { index: 3, label: "المهام", children: <h2>المهام</h2> },
  { index: 4, label: "الخطابات", children: <h2>الخطابات</h2> },
];
export default function MainPand({ contractData }: MainPandProps) {
  // TODO::declare component variables
  const [expended, setExpended] = useState(false);
  const [activePandId, setActivePandId] = useState(1);
  const [activeBtn, setActiveBtn] = useState(MainPandBtns.LOCATION);

  return (
    <>
      {/* MainPand Header */}
      <MainPandHeader
        name={contractData.name}
        numberOfSubItems={contractData.contract_sub_items.length}
        managerName={contractData?.manager?.name??''}
        endDate={contractData.end_date}
        startDate={contractData.start_date}
        contract_sub_items={contractData.contract_sub_items}
        expended={expended}
        setExpended={setExpended}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        setActivePandId={setActivePandId}
      />
      {/* Main Header Body */}
      {/* !dont work<Accordion expanded={false}> */}
      <Accordion
        className="fadeInDown"
        sx={{ display: expended ? "block" : "none" }}
      >
        <Grid container xs={12} spacing={1}>
          <Grid item xl={2} xs={3}>
            <SubPandsList
              contractSubItems={contractData.contract_sub_items}
              activePandId={activePandId}
              setActivePandId={setActivePandId}
            />
          </Grid>
          <Grid item xs={9} xl={10}>
            <InternalTabs
              activePandId={activePandId}
              TabsHeaders={TabsHeaders}
            />
          </Grid>
        </Grid>
      </Accordion>
    </>
  );
}

type MainPandProps = {
  contractData: ContractItem;
};
