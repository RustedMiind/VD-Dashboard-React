import { Stack } from "@mui/material";
import DoubleChips from "../../../components/DoubleStatusChips";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { TenderEntityStatus } from "../../../types/Tenders/Status.enum";

function Counters() {
  const { counts } = useContext(TableContext);

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      {counts && (
        <>
          <DoubleChips
            label="جاري"
            value={counts[TenderEntityStatus.ONGOING]}
            color="success"
          />
          <DoubleChips
            label="مقدمة"
            value={counts[TenderEntityStatus.SENT]}
            color="warning"
          />
          <DoubleChips
            label="غير مقدم"
            value={counts[TenderEntityStatus.NOT_SENT]}
            color="secondary"
          />
          <DoubleChips
            label="منتهي"
            value={counts[TenderEntityStatus.ENDED]}
            color="error"
          />
          <DoubleChips
            label="تم الترسية"
            value={counts[TenderEntityStatus.AWARDED]}
            color="primary"
          />
          <DoubleChips
            label="فحص فني"
            value={counts[TenderEntityStatus.TECHNICAL_REVIEW]}
            color="primary"
          />
          <DoubleChips
            label="مستعبد فني"
            value={counts[TenderEntityStatus.EXCLUDED]}
            color="primary"
          />
          <DoubleChips
            label="مستعبد مالي"
            value={counts[TenderEntityStatus.FINANCIAL_EXCLUDE]}
            color="primary"
          />
        </>
      )}
    </Stack>
  );
}

export default Counters;
