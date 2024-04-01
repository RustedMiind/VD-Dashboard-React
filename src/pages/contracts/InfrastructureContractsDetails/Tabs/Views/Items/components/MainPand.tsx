import { Accordion, Grid } from "@mui/material";
import { useState } from "react";
import MainPandHeader from "./MainPandHeader";
import "../../../../components/TopCards.scss";
import SubPandsList from "./SubPansList";
import InternalTabs, { TabType } from "../tabs";
import Transactions from "../tabs/Transactions";
import AttatchmentsSection from "../tabs/Attachments";
import CompletionRatioOfItem from "../tabs/CompletionRatio";

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
export default function MainPand() {
  // TODO::declare component variables
  const [expended, setExpended] = useState(false);
  const [activePandId, setActivePandId] = useState(1);
  const [activeBtn, setActiveBtn] = useState(MainPandBtns.LOCATION);

  return (
    <>
      {/* MainPand Header */}
      <MainPandHeader
        expended={expended}
        setExpended={setExpended}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
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
              activePandId={activePandId}
              setActivePandId={setActivePandId}
            />
          </Grid>
          <Grid item xs={9} xl={10}>
            <InternalTabs TabsHeaders={TabsHeaders} />
          </Grid>
        </Grid>
      </Accordion>
    </>
  );
}
