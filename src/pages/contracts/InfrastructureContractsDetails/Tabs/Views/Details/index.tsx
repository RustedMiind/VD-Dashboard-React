import {
  Box,
  Button,
  Fab,
  Grid,
  GridProps,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
// import ChatBox from "../components/ChatBox";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import "../../../components/TopCards.scss";
import { ContractDetailsContext } from "../../..";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import ChatBox from "../../../components/ChatBox";

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
    <AddLabelToEl label={label} labelTypographyProps={{ gutterBottom: false }}>
      <Typography fontWeight={700}>{children}</Typography>
    </AddLabelToEl>
  </GridItem>
);

export default function DetailsView() {
  // * declare component state variables
  const [showChatBox, setShowChatBox] = useState<Boolean>(false);
  const contractData = useContext(ContractDetailsContext);

  return (
    <Stack sx={{ position: "relative" }}>
      <Grid container columnSpacing={1} rowSpacing={4}>
        <DetailsItem label="نوع العقد">البنية التحتية</DetailsItem>
        <DetailsItem label="نوع الفرع">{contractData?.branchName}</DetailsItem>
        <DetailsItem label="صورة العقد">
          <Button
            component={"a"}
            target="_blank"
            href={contractData?.card_image}
          >
            عرض الصورة
          </Button>
        </DetailsItem>
        <DetailsItem label="طريقة العرض">{contractData?.wayOfShow}</DetailsItem>
        <DetailsItem label="الادارة">
          {contractData?.managementName}
        </DetailsItem>
        <DetailsItem label="مدة العقد">
          {contractData?.contractPeriod}
        </DetailsItem>
        <DetailsItem label="المساحة">{contractData?.area} م</DetailsItem>
        <DetailsItem label="رقم العقد">
          {contractData?.managementName}
        </DetailsItem>
        <DetailsItem label="الادارة">
          {contractData?.managementName}
        </DetailsItem>
        <DetailsItem label="تاريخ العقد">
          {contractData?.contractDate}
        </DetailsItem>
        <DetailsItem label="الموقع">{contractData?.location}</DetailsItem>

        <DetailsItem label="" />
        <DetailsItem label="اسم المشروع">{contractData?.name}</DetailsItem>
        <DetailsItem label="قيمة العقد">
          {contractData?.contractAmount} ر.س.
        </DetailsItem>

        <DetailsItem label="" />
        <DetailsItem label="" />
        <DetailsItem label="العميل">{contractData?.clientName}</DetailsItem>
        <DetailsItem label="المهندس المسؤول">
          {contractData?.engineerName}
        </DetailsItem>
        {/* Complete the values based on the mainInfo array and remove the grid items below  */}

        {/* chat part */}
        {/* btn */}
        {showChatBox && (
          <>
            <ChatBox />
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