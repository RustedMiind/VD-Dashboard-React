import { Box, Button, Grid, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import ChatBox from "../components/ChatBox";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import "../components/TopCards.scss";
import { ContractIncomeDataType } from "..";

export default function BandInformation({
  contractData,
}: BandInformationProps) {
  // * declare component state variables
  const [showChatBox, setShowChatBox] = useState<Boolean>(false);
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
    <Grid
      container
      xs={12}
      sx={{
        bgcolor: "background.paper",
        borderRadius: "13px",
        padding: "2rem",
      }}
      className="fadeInUp"
    >
      <Grid item xs={3}>
        {mainInfo.slice(0, 5).map((ele) => (
          <Box marginBottom={2} key={ele.id}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              {ele.title}
            </Typography>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={15}
              fontWeight={600}
            >
              {ele.value}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid item xs={3}>
        {mainInfo.slice(5, 10).map((ele) => (
          <Box marginBottom={2} key={ele.id}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              {ele.title}
            </Typography>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={15}
              fontWeight={600}
            >
              {ele.value}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid item xs={3}>
        {mainInfo.slice(10, 13).map((ele) => (
          <Box marginBottom={2} key={ele.id}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              {ele.title}
            </Typography>
            {ele.id.startsWith("mI10") ? (
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open(`https://visiondimensions.com/${ele.value}`)
                }
              >
                <DescriptionIcon sx={{ marginRight: "0.5rem" }} />
                <Typography variant="body1" fontSize={13}>
                  الملف المالي
                </Typography>
              </Box>
            ) : (
              <Typography
                color={"primary.main"}
                variant="body2"
                fontSize={15}
                fontWeight={600}
              >
                {ele.value}
              </Typography>
            )}
          </Box>
        ))}
      </Grid>
      <Grid item xs={3}>
        {mainInfo.slice(13).map((ele) => (
          <Box marginBottom={2} key={ele.id}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              {ele.title}
            </Typography>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={15}
              fontWeight={600}
            >
              {ele.value}
            </Typography>
          </Box>
        ))}
      </Grid>

      {/* chat part */}
      {/* btn */}
      <Grid
        item
        xs={12}
        textAlign={"right"}
        marginY={"2rem"}
        position={"relative"}
      >
        {/* chat part */}
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
        <Button
          variant="contained"
          onClick={() => setShowChatBox((prev) => !prev)}
          sx={{
            backgroundColor: "#f19b02",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            position: "relative",
            zIndex: 10,
            transition: "all 0.5s ease-in-out",
            ":hover": {
              bgcolor: "primary.main",
              color: "#fff",
              transform: "scale(1.056)",
              boxShadow: "1px 1px 3px 3px lightgray",
            },
          }}
        >
          {showChatBox ? (
            <KeyboardArrowDownSharpIcon style={{ fontSize: "2.2rem" }} />
          ) : (
            <ForumSharpIcon style={{ fontSize: "2.2rem" }} />
          )}
        </Button>
      </Grid>
    </Grid>
  );
}

type BandInformationProps = {
  contractData: ContractIncomeDataType | undefined;
};
