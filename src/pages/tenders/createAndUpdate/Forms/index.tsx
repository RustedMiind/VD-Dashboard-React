import Typography from "@mui/material/Typography";
import MainDataForm from "./MainDataForm";
import { SeparatedAccordion } from "../../../../components/SeparatedAccordion";
function FormsSection() {
  return (
    <>
      <SeparatedAccordion title="بيانات المنافسة">
        <MainDataForm />
      </SeparatedAccordion>
      <Typography variant="body1" color="initial">
        Form 2
      </Typography>
      <Typography variant="body1" color="initial">
        Form 3
      </Typography>
      <Typography variant="body1" color="initial">
        Form 4
      </Typography>
    </>
  );
}

export default FormsSection;
