import Typography from "@mui/material/Typography";
import MainDataForm from "./MainDataForm";
import { SeparatedAccordion } from "../../../../components/SeparatedAccordion";
import ManagersForm from "./ManagersForm";
import { Stack } from "@mui/material";
function FormsSection() {
  return (
    <Stack spacing={2}>
      <SeparatedAccordion title="بيانات المنافسة">
        <MainDataForm />
      </SeparatedAccordion>

      <SeparatedAccordion title="مهام المنافسة (المسؤولين عن المنافسة)">
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
