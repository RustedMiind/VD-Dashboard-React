import { Stack } from "@mui/material";
import { useState } from "react";
import { SeparatedAccordion } from "../../../components/SeparatedAccordion";
import CoveredSites from "./Covered sites";
import AreaSites from "./Area sites";
import AddRoles from "./Add Floors";
import { SoilContextProvider } from "../SoilContext";

function FormsSection() {
  const [dialogState, setDialogState] = useState<DialogState>("none");
  const [expanded, setExpanded] = useState<undefined | number>(undefined);

  const closeDialog = () => {
    setDialogState("none");
  };
  const openCoveredDialog = () => {
    setDialogState("covered");
  };
  const openAreaDialog = () => {
    setDialogState("area");
  };
  const openFloorDialog = () => {
    setDialogState("floor");
  };

  function expand(toExpand: number): () => void {
    return () => {
      if (expanded === toExpand) {
        setExpanded(undefined);
      } else setExpanded(toExpand);
    };
  }

  return (
    <SoilContextProvider>
      <Stack spacing={2}>
        <SeparatedAccordion
          expanded={expanded === 1}
          onChange={expand(1)}
          title="المواقع المغطاه"
          bgReverse
        >
          <CoveredSites
            dialogState={dialogState}
            closeDialog={closeDialog}
            openCoveredDialog={openCoveredDialog}
          />
        </SeparatedAccordion>

        <SeparatedAccordion
          expanded={expanded === 2}
          onChange={expand(2)}
          title="المساحة"
          bgReverse
        >
          <AreaSites
            dialogState={dialogState}
            closeDialog={closeDialog}
            openAreaDialog={openAreaDialog}
          />
        </SeparatedAccordion>
        <SeparatedAccordion
          expanded={expanded === 3}
          onChange={expand(3)}
          title="الأدوار"
          bgReverse
        >
          <AddRoles
            dialogState={dialogState}
            closeDialog={closeDialog}
            openFloorDialog={openFloorDialog}
          />
        </SeparatedAccordion>
      </Stack>
    </SoilContextProvider>
  );
}

export default FormsSection;
export type DialogState = "none" | "covered" | "area" | "floor";
