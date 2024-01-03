import { useContext, useState } from "react";
import { TenderContext } from "../TenderCondext";
import ProgressBar from "./ProgressBar";
import { Button, Paper } from "@mui/material";
import { Api } from "../../../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FormStatus } from "../../../../types/FormStatus";
import { LoadingButton } from "@mui/lab";

function BottomSection() {
  const { tender, getTenderData, tenderId } = useContext(TenderContext);
  let progress = 0;
  let tenderDone = false;
  let showProgress = true;
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const inputProps = {
    loading: formStatus === "loading",
    disabled: formStatus === "loading" || formStatus === "disabled",
  };
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  function handleSave() {
    setFormStatus("loading");
    axios
      .get(Api(`employee/tender/is_done/${tenderId}`))
      .then(() => {
        navigate("../");
        snackbar.enqueueSnackbar("تم تأكيد حفظ المنافسة بنجاح");
      })
      .catch(() => {
        snackbar.enqueueSnackbar("تعذر في تأكيد حفظ المنافسة", {
          variant: "error",
        });
      })
      .finally(() => {
        setFormStatus("none");
      });
  }
  if (typeof tender === "object") {
    if (tender.is_done) {
      tenderDone = true;
    }
    if (tender.step_num === 0) {
      showProgress = false;
    } else {
      progress = (100 * (tender.step_num - 1)) / 4;
    }
  }
  return (
    <>
      {!tenderDone && (
        <Paper sx={{ p: 2 }}>
          {showProgress ? (
            <ProgressBar progress={progress} />
          ) : (
            <LoadingButton
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSave}
              {...inputProps}
            >
              تأكيد حفظ المنافسة
            </LoadingButton>
          )}
        </Paper>
      )}
    </>
  );
}

export default BottomSection;
