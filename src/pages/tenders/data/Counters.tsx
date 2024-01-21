import { Stack } from "@mui/material";
import DoubleChips from "../../../components/DoubleStatusChips";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { TenderItemStatus } from "../../../types/Tenders/Status.enum";

function Counters() {
  const { counts } = useContext(TableContext);

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      {counts && (
        <>
          <DoubleChips
            label="جاري"
            value={counts[TenderItemStatus.ONGOING]}
            color="success"
          />
          <DoubleChips
            label="مقدمة"
            value={counts[TenderItemStatus.SENT]}
            color="warning"
          />
          <DoubleChips
            label="منتهي"
            value={counts[TenderItemStatus.ENDED]}
            color="error"
          />
          <DoubleChips
            label="تم الترسية"
            value={counts[TenderItemStatus.AWARDED]}
            color="primary"
          />
          <DoubleChips
            label="فحص فني"
            value={counts[TenderItemStatus.TECHNICAL_REVIEW]}
            color="primary"
          />
          <DoubleChips
            label="مستعبد فني"
            value={counts[TenderItemStatus.EXCLUDED]}
            color="primary"
          />
          <DoubleChips
            label="مستعبد مالي"
            value={counts[TenderItemStatus.FINANCIAL_EXCLUDE]}
            color="primary"
          />
        </>
      )}
    </Stack>
  );
}

export default Counters;
