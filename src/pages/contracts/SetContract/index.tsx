import { Stack, Typography } from "@mui/material";
import ContractData from "./FormSections/ContractDataSection";
import ContractTasks from "./FormSections/TasksSection/ContractTasks";
import Payments from "./FormSections/PaymentsSection";
import Attachments from "./FormSections/AttachmentsSection";
import SectionAccordion from "./Components/SectionAccordion";
import { useEffect, useState } from "react";

export default function CreateContracts(props: PropsType) {
  const [opened, setOpened] = useState<null | number>(1);

  const currentOpened = (index: number) => opened === index;
  const setCurrentOpened = (index: number) => {
    if (index === opened) {
      setOpened(null);
    } else setOpened(index);
  };
  const isCreate = props.type === "create";

  useEffect(() => {
    if (isCreate) {
      setOpened(1);
    } else {
      setOpened(null);
    }
  }, [isCreate]);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        انشاء عقد ادخال مباشر
      </Typography>
      <SectionAccordion
        opened={currentOpened(1)}
        setOpened={() => {
          setCurrentOpened(1);
        }}
        title="بيانات العقد"
      >
        <ContractData />
      </SectionAccordion>

      <SectionAccordion
        opened={currentOpened(2)}
        setOpened={() => {
          setCurrentOpened(2);
        }}
        title="بنود ومهام العقد"
        disabled={isCreate}
      >
        <ContractTasks />
      </SectionAccordion>

      <SectionAccordion
        opened={currentOpened(3)}
        setOpened={() => {
          setCurrentOpened(3);
        }}
        title="دفعات العقد"
        disabled={isCreate}
      >
        <Payments />
      </SectionAccordion>

      <SectionAccordion
        opened={currentOpened(4)}
        setOpened={() => {
          setCurrentOpened(4);
        }}
        title="مرفقات العقد"
        disabled={isCreate}
      >
        <Attachments />
      </SectionAccordion>
    </Stack>
  );
}

type PropsType = {
  type: "create" | "edit";
};
