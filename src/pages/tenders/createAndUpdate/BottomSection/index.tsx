import { useContext } from "react";
import { TenderContext } from "../TenderCondext";
import ProgressBar from "./ProgressBar";
import { Button, Paper } from "@mui/material";
import { Api } from "../../../../constants";
import axios from "axios";

function BottomSection() {
  const { tender, getTenderData, tenderId } = useContext(TenderContext);
  let progress = 0;
  let showProgress = true;
  if (typeof tender === "object") {
    if (tender.is_done) {
      showProgress = false;
    } else {
      if (tender.step_num === 0) {
        progress = 100;
      } else {
        progress = (100 * (tender.step_num - 1)) / 4;
      }
    }
  }
  return (
    <Paper sx={{ p: 2 }}>
      {showProgress ? (
        <ProgressBar progress={progress} />
      ) : (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            axios.get(Api(`employee/tender/is_done/${tenderId}`)).then(() => {
              getTenderData && getTenderData();
            });
          }}
        >
          تأكيد حفظ المنافسة
        </Button>
      )}
    </Paper>
  );
}

export default BottomSection;
