import { Stack } from "@mui/material";
import FormsSection from "./Forms";
import { TenderContextProfider } from "./TenderCondext";
import PageTitle from "./PageTitle";

function CreateAndUpdateTender() {
  return (
    <TenderContextProfider>
      <Stack>
        <PageTitle />
        <FormsSection />
      </Stack>
    </TenderContextProfider>
  );
}

export default CreateAndUpdateTender;
