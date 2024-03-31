import { Accordion, Grid } from "@mui/material";
import { useState } from "react";
import MainPandHeader from "./MainPandHeader";
import "../../../../components/TopCards.scss";
import SubPandsList from "./SubPansList";
import InternalTabs, { TabType } from "../tabs";
import Transactions from "../tabs/Transactions";

export enum MainPandBtns {
  LOCATION,
  PRINTER,
  ENGINEER,
  EDIT,
  NOTIFICATIONS,
}
const TabsHeaders: TabType[] = [
  { index: 0, label: "المعاملات", children: <Transactions /> },
  { index: 1, label: "المرفقات", children: <h2>المرفقات</h2> },
  { index: 2, label: "نسب الانجاز", children: <h2>نسب الانجاز</h2> },
  { index: 3, label: "المهام", children: <h2>المهام</h2> },
  { index: 4, label: "الخطابات", children: <h2>الخطابات</h2> },
];
export default function MainPand() {
  // TODO::declare component variables
  const [expended, setExpended] = useState(false);
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
        <Grid container xs={12}>
          <SubPandsList />
          <Grid item xs={9}>
            <InternalTabs TabsHeaders={TabsHeaders} />
          </Grid>
        </Grid>
      </Accordion>
    </>
  );
}