import { Stack } from "@mui/material";
import DoubleChips from "../../../components/DoubleStatusChips";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { TenderEntityStatus } from "../../../types/Tenders/Status.enum";

function Counters() {
  const { counts, setSelectedType } = useContext(TableContext);

  function handleUpdateSelectedType(type: TenderEntityStatus) {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setSelectedType && setSelectedType(type);
    };
  }

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      {counts && (
        <>
          <DoubleChips
            label="جاري"
            value={counts[TenderEntityStatus.ONGOING]}
            color="success"
            chipProps={{
              onClick: handleUpdateSelectedType(TenderEntityStatus.ONGOING),
            }}
          />
          <DoubleChips
            label="مقدمة"
            value={counts[TenderEntityStatus.SENT]}
            color="warning"
            chipProps={{
              onClick: handleUpdateSelectedType(TenderEntityStatus.SENT),
            }}
          />
          <DoubleChips
            label="غير مقدم"
            value={counts[TenderEntityStatus.NOT_SENT]}
            color="secondary"
            chipProps={{
              onClick: handleUpdateSelectedType(TenderEntityStatus.NOT_SENT),
            }}
          />
          <DoubleChips
            label="منتهي"
            value={counts[TenderEntityStatus.ENDED]}
            color="error"
            chipProps={{
              onClick: handleUpdateSelectedType(TenderEntityStatus.ENDED),
            }}
          />
          <DoubleChips
            label="تم الترسية"
            value={counts[TenderEntityStatus.AWARDED]}
            color="primary"
            chipProps={{
              onClick: handleUpdateSelectedType(TenderEntityStatus.AWARDED),
            }}
          />
          <DoubleChips
            label="فحص فني"
            value={counts[TenderEntityStatus.TECHNICAL_REVIEW]}
            color="primary"
            chipProps={{
              onClick: handleUpdateSelectedType(
                TenderEntityStatus.TECHNICAL_REVIEW
              ),
            }}
          />
          <DoubleChips
            label="مستعبد فني"
            value={counts[TenderEntityStatus.EXCLUDED]}
            color="primary"
            chipProps={{
              onClick: handleUpdateSelectedType(TenderEntityStatus.EXCLUDED),
            }}
          />
          <DoubleChips
            label="مستعبد مالي"
            value={counts[TenderEntityStatus.FINANCIAL_EXCLUDE]}
            color="primary"
            chipProps={{
              onClick: handleUpdateSelectedType(
                TenderEntityStatus.FINANCIAL_EXCLUDE
              ),
            }}
          />
        </>
      )}
    </Stack>
  );
}

export default Counters;
