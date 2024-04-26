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
import { useContext, useMemo, useState } from "react";
import "./TopCards.scss";
import { ContractDetailsContext } from "..";
import { useUser } from "../../../../contexts/user/user";
import { EmployeeType } from "../../../../types";
import { TransactionType } from "../../../../types/Contracts/ContractTransactionAttachment";

interface Item {
  id: number;
}
function removeDuplicates<T extends Item>(items: T[]): T[] {
  const seenIds = new Set<number>();
  const uniqueItems: T[] = [];

  items.forEach((item) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
}

export default function TopCards() {
  // declare our component variables/state
  const [openDialog, setOpenDialog] = useState(false);
  const { contract, refreshToggler } = useContext(ContractDetailsContext);
  const { user } = useUser();

  const allProcessing: TransactionType[] = [];
  contract?.contract_items?.forEach((item) => {
    item.contract_sub_items?.forEach((subitem) => {
      if (subitem.processing) allProcessing.push(...subitem.processing);
    });
  });

  const workStaff = useMemo(() => {
    const staff: EmployeeType[] = [];
    contract?.contract_items?.forEach((item) => {
      item.contract_item_employees?.forEach((contractItemEmployee) => {
        if (contractItemEmployee.employee)
          staff.push(contractItemEmployee.employee);
      });
    });
    return removeDuplicates<EmployeeType>(staff);
  }, [refreshToggler, contract?.id]);

  // Fetch transactionNumbers Array - contract_items
  const transactionNumbers = useMemo(() => {
    const transactions: { id: number; type: string }[] = [];
    contract?.contract_items?.forEach((item) => {
      item.contract_sub_items?.forEach((sub_item) => {
        sub_item?.processing?.forEach((transaction) => {
          if (
            transaction.attachment_type &&
            transaction.attachment_type.length > 0
          ) {
            transactions.push({
              id: transaction.id,
              type: transaction.attachment_type[0].name || "",
            });
          }
        });
      });
    });
    return transactions;
  }, [refreshToggler, contract?.id]);

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
      // className="fadeInUp"
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
              {contract?.amount ?? 0}
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
              {contract?.amount ?? 0}
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
            اخر تحديث{" "}
            {new Date(contract?.updated_at ?? "").toLocaleDateString()}
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
                  0
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
                  {contract?.payed ?? 0}
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
                  {contract?.remaining ?? 0}
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
          {workStaff.map((user, idx) => {
            return (
              <Box
                key={`user_${idx}_${user.id}`}
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
            justifyContent: "start",
            flexDirection: "column",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
          }}
        >
          {allProcessing?.map((processing) => {
            return (
              <Box key={processing.id} display={"flex"} marginY={2}>
                <Typography
                  color={"primary.main"}
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  marginX={1}
                >
                  {processing.receiver}
                </Typography>
                <Typography
                  color={"secondary.main"}
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                >
                  {processing.id}
                </Typography>
              </Box>
            );
          })}
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
        {user?.employee_id === contract?.employee_id && (
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
        )}
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
                style={{ width: "90px" }}
                variant="determinate"
                color={"warning"}
                value={contract?.achievement_percentage}
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
                {contract?.achievement_percentage}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <EditRaioDialog open={openDialog} setOpen={setOpenDialog} />
    </Grid>
  );
}
