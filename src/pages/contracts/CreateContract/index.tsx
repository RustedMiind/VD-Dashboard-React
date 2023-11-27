import { Stack, Typography } from "@mui/material";
import ContractData from "./ContractData";
import ContractTasks from "./ContractTasks";
import Payments from "./Payments";
import Attachments from "./Attachments";

export default function CreateContracts() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        انشاء عقد ادخال مباشر
      </Typography>
      <ContractData />
      <ContractTasks />
      <Payments />
      <Attachments />
    </Stack>
  );
}
