import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneAndReminder from "./DoneAndReminder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditRaioDialog from "./EditDialog";
import { useState } from "react";
import "./TopCards.scss";
import { ContractIncomeDataType } from "..";

export default function TopCards({ contractData }: TopCardsProps) {
  // declare our component variables/state
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="fadeInUp"
    >
      {/* First Card */}
      <Box
        sx={{
          width: "30%",
          background: "linear-gradient(-45deg, #cddae8, transparent)",
          minHeight: "200px",
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "35%" }}>
          {/* قيمة العقد */}
          <Typography
            variant="body1"
            fontSize={15}
            fontWeight={700}
            marginBottom={1}
          >
            قيمة العقد
          </Typography>
          <Box
            sx={{
              width: "97%",
              display: "flex",
              justifyContent: "ccenter",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "6px",
              padding: "5px",
              bgcolor: "background.default",
            }}
          >
            <Typography
              color={"secondary.main"}
              variant="body2"
              fontWeight={600}
            >
              100000
            </Typography>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={11}
              fontWeight={400}
            >
              ريال
            </Typography>
          </Box>

          {/* القيمة المالية */}
          <Typography
            variant="body1"
            fontSize={15}
            fontWeight={700}
            marginTop={1}
          >
            القيمة المالية
          </Typography>
          <Typography
            color={"primary.main"}
            variant="body2"
            fontSize={11}
            fontWeight={400}
            marginBottom={1}
            textAlign={"center"}
          >
            المطلوب فوترة
          </Typography>
          <Box
            sx={{
              width: "97%",
              display: "flex",
              justifyContent: "ccenter",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "6px",
              padding: "5px",
              bgcolor: "background.default",
            }}
          >
            <Typography
              color={"secondary.main"}
              variant="body2"
              fontWeight={600}
            >
              150000
            </Typography>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={11}
              fontWeight={400}
            >
              ريال
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Typography
            color={"text.secondary"}
            textAlign={"right"}
            fontSize={12}
          >
            <ReplayIcon sx={{ color: "secondary.main", fontSize: "12px" }} />{" "}
            اخر تحديث {"15/09/2023"}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                width: "30%",
                minHeight: "3.75rem",
              }}
            >
              <Typography
                variant="body1"
                fontSize={13}
                fontWeight={550}
                marginBottom={1}
                textAlign={"center"}
              >
                المفوتر
              </Typography>
              <Box
                sx={{
                  width: "99%",
                  height: "3.75rem",
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  color={"secondary.main"}
                  variant="body2"
                  fontWeight={600}
                >
                  8000
                </Typography>
                <Typography
                  color={"primary.main"}
                  variant="body2"
                  fontSize={11}
                  fontWeight={400}
                >
                  ريال
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "30%",
                minHeight: "3.75rem",
              }}
            >
              <Typography
                variant="body1"
                fontSize={13}
                fontWeight={550}
                marginBottom={1}
                textAlign={"center"}
              >
                المسدد
              </Typography>
              <Box
                sx={{
                  width: "99%",
                  height: "3.75rem",
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  color={"success.main"}
                  variant="body2"
                  fontWeight={600}
                >
                  1000
                </Typography>
                <Typography
                  color={"primary.main"}
                  variant="body2"
                  fontSize={11}
                  fontWeight={400}
                >
                  ريال
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "30%",
                minHeight: "3.75rem",
              }}
            >
              <Typography
                variant="body1"
                fontSize={13}
                fontWeight={550}
                marginBottom={1}
                textAlign={"center"}
              >
                المتبقي
              </Typography>
              <Box
                sx={{
                  width: "99%",
                  height: "3.75rem",
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  color={"secondary.main"}
                  variant="body2"
                  fontWeight={600}
                >
                  500
                </Typography>
                <Typography
                  color={"primary.main"}
                  variant="body2"
                  fontSize={11}
                  fontWeight={400}
                >
                  ريال
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Second Card */}
      <Box
        sx={{
          width: "20%",
          background: "linear-gradient(45deg, #cddae8, transparent)",
          height: "200px",
          padding: "8px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body1"
          fontSize={15}
          fontWeight={700}
          marginBottom={1}
        >
          الكادر
        </Typography>
        <Box
          sx={{
            height: "180px",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
          }}
        >
          {contractData?.users.map((user, idx) => {
            return (
              <Box
                key={`user_${idx}_${user.id}_${Math.random()}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginY: "0.2rem",
                }}
              >
                <Avatar sx={{ width: 30, height: 30 }}>H</Avatar>
                <Typography
                  color={"primary.main"}
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                >
                  {user.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* Third Card */}
      <Box
        sx={{
          width: "15%",
          background: "linear-gradient(-45deg, #cddae8, transparent)",
          minHeight: "200px",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body1"
          fontSize={15}
          fontWeight={700}
          marginBottom={1}
        >
          ارقام المعاملات
        </Typography>
        <Box
          sx={{
            height: "150px",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
              marginX={1}
            >
              الكهرباء
            </Typography>
            <Typography
              color={"secondary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              100,000
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
              marginX={1}
            >
              الكهرباء
            </Typography>
            <Typography
              color={"secondary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              100,000
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              color={"primary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
              marginX={1}
            >
              الكهرباء
            </Typography>
            <Typography
              color={"secondary.main"}
              variant="body2"
              fontSize={14}
              fontWeight={500}
            >
              100,000
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Forth Card */}
      <Box
        sx={{
          width: "30%",
          background: "linear-gradient(45deg, #cddae8, transparent)",
          minHeight: "200px",
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography
          variant="body1"
          fontSize={15}
          fontWeight={700}
          marginBottom={1}
        >
          نسب الانجاز الكلية
        </Typography>
        <Button
          sx={{
            bgcolor: "#fff",
            position: "absolute",
            right: "5%",
            boxShadow: "1px 1px 2px 2px lightgray",
            transition: "all 0.5 ease-in-out",
            ":hover": {
              color: "#fff",
              bgcolor: "primary.main",
              transform: "scale(1.056)",
            },
          }}
          startIcon={<SettingsOutlinedIcon />}
          onClick={() => setOpenDialog(true)}
        >
          تعديل
        </Button>
        <Grid container sx={{ paddingBottom: "1rem" }}>
          <Grid item xs={4}>
            <DoneAndReminder column={true} />
          </Grid>
          <Grid item xs={8} sx={{ marginTop: "3.4rem" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                position: "relative",
                paddingX: "1rem",
              }}
              className="RatioCircularProgress"
            >
              <CircularProgress
                style={{ width: "90px", }}
                variant="determinate"
                color={"warning"}
                value={85.5}
              />
              <Typography
                sx={{
                  position: "absolute",
                  fontSize: "18px",
                  fontWeight: 900,
                  top: "8px",
                }}
                color={"warning"}
                variant="body2"
              >
                85.5%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <EditRaioDialog open={openDialog} setOpen={setOpenDialog} />
    </Grid>
  );
}

type TopCardsProps = {
  contractData: ContractIncomeDataType | undefined;
};
