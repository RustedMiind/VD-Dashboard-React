import { Box, Fab, Grid, GridProps, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
// import ChatBox from "../components/ChatBox";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import "../../../components/TopCards.scss";
import { ContractDetailsContext } from "../../..";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} sm={6} lg={4} xl={3} {...props} />
);
const DetailsItem = ({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => (
  <GridItem>
    <AddLabelToEl label={label}>
      <Typography fontWeight={700}>{children}</Typography>
    </AddLabelToEl>
  </GridItem>
);

export default function DetailsView() {
  // * declare component state variables
  const [showChatBox, setShowChatBox] = useState<Boolean>(false);
  const contractData = useContext(ContractDetailsContext);
  let mainInfo = [
    { id: `mI0_${Math.random()}`, title: "نوع العقد", value: "البنية التحتية" },
    {
      id: `mI1_${Math.random()}`,
      title: "الادارة",
      value: contractData?.managementName,
    },
    {
      id: `mI2_${Math.random()}`,
      title: "رقم العقد",
      value: contractData?.contractNumber,
    },
    {
      id: `mI3_${Math.random()}`,
      title: "اسم المشروع",
      value: contractData?.name,
    },
    {
      id: `mI4_${Math.random()}`,
      title: "العميل",
      value: contractData?.clientName,
    },
    {
      id: `mI5_${Math.random()}`,
      title: "نوع الفرع",
      value: contractData?.branchName,
    },
    {
      id: `mI6_${Math.random()}`,
      title: "مدة العقد",
      value: contractData?.contractPeriod,
    },
    {
      id: `mI7_${Math.random()}`,
      title: "تاريخ العقد",
      value: contractData?.contractDate,
    },
    {
      id: `mI8_${Math.random()}`,
      title: "قيمة العقد",
      value: `${contractData?.contractAmount} رس`,
    },
    {
      id: `mI9_${Math.random()}`,
      title: "المهندس المسؤول",
      value: contractData?.engineerName,
    },
    {
      id: `mI10_${Math.random()}`,
      title: "صورة العقد",
      value: contractData?.card_image,
    }, //file here
    {
      id: `mI11_${Math.random()}`,
      title: "عدد القطع",
      value: contractData?.numberOfPieces,
    },
    {
      id: `mI12_${Math.random()}`,
      title: "الموقع",
      value: contractData?.location,
    },
    {
      id: `mI13_${Math.random()}`,
      title: "طريقة العرض",
      value: contractData?.wayOfShow,
    },
    {
      id: `mI14_${Math.random()}`,
      title: "المساحة",
      value: `${contractData?.area} م`,
    },
  ];

  return (
    <Stack sx={{ position: "relative" }}>
      <Grid container>
        <DetailsItem label="نوع العقد">البنية التحتية</DetailsItem>
        <DetailsItem label="الادارة">
          {contractData?.managementName}
        </DetailsItem>
        {/* Complete the values based on the mainInfo array and remove the grid items below  */}

        {/* chat part */}
        {/* btn */}
        {showChatBox && (
          <>
            {/* <ChatBox /> */}
            <Box
              sx={{
                position: "fixed",
                zIndex: 9,
                width: "100vw",
                height: "100vh",
                background: "black",
                top: 0,
                left: 0,
                opacity: 0.4,
              }}
              onClick={() => setShowChatBox(false)}
            ></Box>
          </>
        )}
        <Fab
          onClick={() => setShowChatBox((prev) => !prev)}
          color="secondary"
          sx={{ position: "absolute", bottom: 1, right: 1 }}
        >
          {showChatBox ? (
            <KeyboardArrowDownSharpIcon style={{ fontSize: "2.2rem" }} />
          ) : (
            <ForumSharpIcon style={{ fontSize: "2.2rem" }} />
          )}
        </Fab>
      </Grid>
    </Stack>
  );
}
