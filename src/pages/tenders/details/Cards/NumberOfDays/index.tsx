import React, { useContext, useMemo } from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Box, Stack, Typography } from "@mui/material";
import { TenderDataContext } from "../..";
import { getDateDiff } from "../../../../../methods";

export default function NumberOfDays() {
  const { tender } = useContext(TenderDataContext);
  let daysLeft = 0;
  if (typeof tender === "object") {
    daysLeft = Math.floor(
      getDateDiff(new Date(), new Date(tender.tenderdata?.end_date || "")) /
        (1000 * 60 * 60 * 24)
    );
  }

  return (
    <GradientBg>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" mb={2}>
          عدد الايام المتبقية للتقديم
        </Typography>
        <Box
          sx={{
            width: "100px",
            height: "100px",
            background: "background",
            borderRadius: 600,
            border: "transparent 1px solid",
            borderColor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0px 11.410014152526855px 49.78915023803711px 0px #FFE0AA",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" color={"secondary.main"}>
              {daysLeft}
            </Typography>
            <Typography variant="body2">يوم</Typography>
          </Box>
        </Box>
      </Stack>
    </GradientBg>
  );
}
