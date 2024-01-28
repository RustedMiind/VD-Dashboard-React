import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TenderContext } from "../../tenders/createAndUpdate/TenderCondext";
import { SeparatedAccordion } from "../../../components/SeparatedAccordion";

import CoveredSites from "./Covered sites";
import AreaSites from "./Area sites";
import AddRoles from "./Add Floors";
function FormsSection() {
  const [dialogState, setDialogState] = useState<DialogState>("none");
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
  const tenderContext = useContext(TenderContext);

  const [expanded, setExpanded] = useState<undefined | number>(undefined);

  function expand(toExpand: number): () => void {
    return () => {
      if (expanded === toExpand) {
        setExpanded(undefined);
      } else setExpanded(toExpand);
    };
  }

  useEffect(() => {
    setExpanded(undefined);
  }, [
    typeof tenderContext.tender === "object" && tenderContext.tender.step_num,
  ]);

  function isCurrentExpanded(current: number): boolean {
    if (
      tenderContext.formStatus === "complete" &&
      typeof tenderContext.tender === "object"
    ) {
      return (
        (current === tenderContext.tender.step_num && !expanded) ||
        (current <= tenderContext.tender.step_num && current === expanded)
      );
    } else if (tenderContext.formStatus === "create") {
      return current === 1;
    }
    return current === expanded;
  }

  return (
    <Stack spacing={2}>
      <SeparatedAccordion
        expanded={isCurrentExpanded(1)}
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
        expanded={isCurrentExpanded(2)}
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
        expanded={isCurrentExpanded(3)}
        onChange={expand(3)}
        title="الادوار"
        bgReverse
      >
        <AddRoles
          dialogState={dialogState}
          closeDialog={closeDialog}
          openFloorDialog={openFloorDialog}
        />
      </SeparatedAccordion>
    </Stack>
  );
}

export default FormsSection;
export type DialogState = "none" | "covered" | "area" | "floor";
