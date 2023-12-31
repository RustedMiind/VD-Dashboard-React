import Typography from "@mui/material/Typography";
import MainDataForm from "./MainDataForm";
import { SeparatedAccordion } from "../../../../components/SeparatedAccordion";
import ManagersForm from "./ManagersForm";
import { Stack } from "@mui/material";
import { useContext, useState } from "react";
import { TenderContext } from "../TenderCondext";
function FormsSection() {
  const tenderContext = useContext(TenderContext);

  const [expanded, setExpanded] = useState<undefined | number>(undefined);

  function expand(toExpand: number): () => void {
    return () => {
      if (expanded === toExpand) {
        setExpanded(undefined);
      } else setExpanded(toExpand);
    };
  }

  function isCurrentExpanded(current: number): boolean {
    if (
      tenderContext.formStatus === "complete" &&
      typeof tenderContext.tender === "object"
    ) {
      return current === tenderContext.tender.step_num;
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
        title="بيانات المنافسة"
      >
        <MainDataForm />
      </SeparatedAccordion>

      <SeparatedAccordion
        expanded={isCurrentExpanded(2)}
        onChange={expand(2)}
        title="مهام المنافسة (المسؤولين عن المنافسة)"
      >
        <ManagersForm />
      </SeparatedAccordion>
      <Typography variant="body1" color="initial">
        Form 3
      </Typography>
      <Typography variant="body1" color="initial">
        Form 4
      </Typography>
    </Stack>
  );
}

export default FormsSection;