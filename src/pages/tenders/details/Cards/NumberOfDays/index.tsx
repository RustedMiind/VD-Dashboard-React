import React, { useContext, useMemo } from "react";
import GradientBg from "../../../../../components/GradientBg";
import {
  Box,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TenderDataContext } from "../..";
import { getDateDiffNegativeAllowed } from "../../../../../methods";
import Countdown from "react-countdown";

export default function NumberOfDays() {
  const { tender } = useContext(TenderDataContext);
  let timeLeft: Date;
  if (typeof tender === "object" && tender.tenderdata?.strat_date) {
    timeLeft = new Date(tender.tenderdata?.strat_date);
  } else {
    timeLeft = new Date();
  }

  return (
    <GradientBg>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" mb={2}>
          عدد الايام المتبقية للتقديم
        </Typography>

        <Box
          sx={{
            minWidth: "110px",
            minHeight: "110px",
            background: "background",
            borderRadius: 100,
            border: "transparent 2px solid",
            borderColor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0px 11.410014152526855px 49.78915023803711px 0px #FFE0AA",
          }}
        >
          {/* <Box sx={{ textAlign: "center" }}> */}
          <Countdown
            key={timeLeft.getTime()}
            date={timeLeft}
            renderer={({ days, hours, minutes, seconds }) => (
              <Stack>
                <Typography variant="body2" color="secondary.main">
                  {days} يوم
                </Typography>
                <Typography variant="body2" color="secondary.main">
                  {hours} ساعة
                </Typography>
                <Typography variant="body2" color="secondary.main">
                  {minutes} دقيقة
                </Typography>
                <Typography variant="body2" color="secondary.main">
                  {seconds} ثانية
                </Typography>
              </Stack>
            )}
          />
          {/* </Box> */}
        </Box>
      </Stack>
    </GradientBg>
  );
}
